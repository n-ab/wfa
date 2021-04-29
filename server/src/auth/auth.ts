import { Passport } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel, UserObject } from '../models/user';

const passport = new Passport();

passport.use(new LocalStrategy(
    function(username, password, done) {
        UserModel.findOne({username: username}, function(err, user) {
            if (err)                        { return done(err) }
            if (!user)                      { return done(null, false, { message: 'Incorrect username/email' }); }
            if (user.password !== password) { return done(null, false, { message: 'Incorrect password SON.'}); }
            return done(null, user);
        })
    }
));

export function login(req, res, next) {
    console.log('auth.login() - creds: ', req.body);
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err) && console.log('auth.login() failed - error = ', err);
        if (!user) return res.status(401).json(info);
        req.login(user, (err) => {
            res.json(user);
        })
    })(req, res, next);
}

export function logout(req, res) {
    // console.log('Logging out email:', req.user.email);
    if(!req.user) return res.json({success: false});
    req.logout();
    req.session.destroy();
    console.log('LOGOUT SUCCESS');
    return res.json({success: true});
}