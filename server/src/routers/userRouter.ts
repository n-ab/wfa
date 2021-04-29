import * as express from 'express';
import * as userController from '../controllers/userController';
import * as moment from 'moment';

export const app = express.Router();

app.post('/register', (req: any, res) => {
    console.log('attempting user REGISTRATION: ', req.body);
    userController.registerUser(req.body)
        .then(user => { res.status(200).json(user) })
        .catch(err => err);
})

app.post('/login', (req: any, res) => {
    console.log('attempting user LOGIN: ', req.body);
    userController.login(req.body)
        .then(user => { res.status(200).json(user) })
        .catch(err => err);
})

app.get('/emailExistsCheck', (req: any, res) => {
    console.log('checking to see if email exists...', req.query);
    userController.emailExistsCheck(req.query);
})

app.get('/usernameExistsCheck', (req: any, res) => {
    console.log('checking to see if username exists...', req.query);
    userController.usernameExistsCheck(req.query)
})
