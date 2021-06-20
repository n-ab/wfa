import * as express from 'express';
import * as userController from '../controllers/userController';
import * as soundController from '../controllers/soundController';
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
    userController.emailExistsCheck(req.query.email)
        .then(user => {
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

// -- account page functions ---

app.get('/getUserData', async (req: any, res) => {
    if (!req.user) {
        return res.status(500).json('REEE 012');
    }
    const user = await userController.getUserData(req.user._id);
    console.log('user found: ', user['firstName']);
    return res.status(200).json(user);
})

app.get('/getPaymentData', (req: any, res) => {
    const data = userController.getPaymentData(req.user._id);
    if (!data) { return res.status(500).json('u r a b')}
    // if (approved && data)
    return res.status(200).json(data);
})

app.get('/getMessages', async (req: any, res) => {
    if (!req.user) return;
    const data = await userController.getMessages(req.user._id);
})

app.get('/getStarred', async (req: any, res) => {
    const reee = await soundController.fetchTheseSounds(req.user.starred);
    console.log('sounds populated from req.user: ', reee);
    return res.status(200).json(reee);
})