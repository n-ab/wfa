import * as express from 'express';
import * as soundController from '../controllers/soundController';
import * as multer from 'multer';
import * as moment from 'moment';

export const app = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if(file.mimetype !== 'audio/wav') return new Error("Invalid File Type");
        callback(null, "src/audiofiles");
    },
    filename: (req, file, callback) => {
        const name = 'wfa-'+ req.body.title.split(' ').join('-') + '-' + moment().format().toString();
        callback(null, name + '.wav');
    }
});

app.post('/upload', multer({storage:storage}).single('audioFile'), (req: any, res) => {
    console.log('file uploaded. saving metadata/path to db using: ', req.body);
    return soundController.saveSoundData(req.body);
})

app.get('/fetch', (req: any, res) => {
    const queryFromClient = Object.values(req.query);
    if (queryFromClient[0] === 'undefined' && queryFromClient[1] === '') {
        return soundController.fetch()
      .then(sounds => res.status(200).json(sounds))
      .catch(err => err);
    }
    if (queryFromClient[0] !== 'undefined' && queryFromClient[1] !== '') {
        switch (queryFromClient[1]) {
            case 'name':
                return soundController.fetchByName(req.query);
            case 'keyword':
                return soundController.fetchByKeyword(req.query);
            case 'library':
                return soundController.fetchByLibrary(req.query);
            case 'any':
                return soundController.fetchByAny(req.query); 
            default:
                break;
        }
    }
})
