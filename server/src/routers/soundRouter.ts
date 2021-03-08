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
    console.log('fetching sounds with data = ', req.query);
    return soundController.fetch()
      .then(sounds => {
        console.log(`returning ${sounds.length} sounds`);
        console.log(sounds);
        return res.status(200).json(sounds);
      })
      .catch(err => err);
})

// these routes should only be used when a user searches from the landing page.
// otherwise, when soundlist.component.ts makes its call, it should only do so once.

app.get('/findByName', (req:any, res) => {
    return soundController.fetchByName(req.query);
})

app.get('/findByKeyword', (req:any, res) => {
    return soundController.fetchByKeyword(req.query);
})

app.get('/findByLibrary', (req:any, res) => {
    return soundController.fetchByLibrary(req.query);
})

app.get('/findByAny', (req:any, res) => {
    return soundController.fetchByAny(req.query);
})
