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
    console.log('file upload successful. saving metadata/path to db.');
    soundController.derrr(req.body);
    
})