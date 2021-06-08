import * as express from 'express';
import * as userController from '../controllers/userController';
import { login } from '../auth/auth';

export const app = express.Router();

app.get('/check', (req: any, res) => {
    console.log('--- $$$ --- 1');
    console.log(req.user);
    if (req.user === undefined) { return res.json(false)}
    return res.status(200).json(req.user);
})

app.post('/register', (req: any, res) => {
    console.log('attempting user REGISTRATION: ', req.body);
    userController.registerUser(req.body)
        .then(user => { res.status(200).json(user) })
        .catch(err => err);
})

app.post('/login', login, (req: any, res) => {
    console.log('attempting user LOGIN: ', req.body);
    userController.login(req.body)
        .then(user => { res.status(200).json(user) })
        .catch(err => err);
})

app.get('/emailExistsCheck', (req: any, res) => {
    console.log('-- - -- - -- - -- - -- - -- ');
    userController.emailExistsCheck(req.query.email)
        .then(user => {
            console.log('here\'s some bullshit.', user[0]);
            if (user.length) { return res.status(200).json(true); }
            return res.status(500).json(false);
        })
        .catch(err => { res.status(500).json(false)});
})

app.get('/usernameExistsCheck', (req: any, res) => {
    console.log('checking to see if username exists...', req.query);
    userController.usernameExistsCheck(req.query);
})

app.post('/starSound', (req: any, res) => {
    userController.starSound(req.body['params'], req.user._id);
})
