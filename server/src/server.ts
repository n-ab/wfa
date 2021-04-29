import * as express from 'express';
import * as session from 'express-session';
import { config } from './config';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import { UserModel } from './models/user';

console.log(`Welcome to the Waveform Arts server, running on port ${config.PORT}`);

const app = express();

app.use(express.json({limit:'32MB'}));
app.use(express.urlencoded({limit:'32MB', extended:false}));
app.use("/audiofiles", express.static(`./audiofiles`)); // for audio file upload

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
    next();
});
app.listen(config.PORT);

// MAY NOT NEED FOLLOWING CODE WHILE USING PASSPORT. TESTTESTTEST
// app.use(session({
//     name:'waveformArtsSession',
//     secret: 'pleaseActuallyMakeThisAGoodSecretPassword',
//     saveUninitialized: false,
//     resave: false
// }));

//--- p a s s p o r t ------------------------------------------

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done) => {
    if(!user._id) done({error: 'No user id.'}, null);
    done(null,user._id);
  });
  
passport.deserializeUser((id, done) => {
    UserModel.findById(id).select('firstName email active role cart')
        .lean()
        .exec()
        .then(user => {
        if(!user) return done('No user found.', null);
            done(null, user);
        });
});

// --- m o n g o o s e ----------------------------------------

mongoose.connect(config.database, {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => {
        console.log(`and using database: ${config.database}`);
        console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - ');
    }).catch(err => {
        console.log('Database not active. Run: sudo mongod');
        return err;
})

// --- r o u t i n g ------------------------------------------

import { router } from './routers/routers';
app.use('/api', router);
