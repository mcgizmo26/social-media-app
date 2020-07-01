// *********************************** App Variables *******************************
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
// const ExtractJWT = require('passport-jwt').ExtractJwt;


// *********************************** Local Variables *****************************
const User = require('../helpers/user/user_helpers');


const cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];

    return token;
};


// *********************************** App Strategies ******************************
passport.use('signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        let firstname = req.body.firstname,
                lastname = req.body.lastname;
        try {
            const user = await User.createUser({
                firstname,
                lastname,
                email,
                password
            });

            if(user) return done(null, user, { message: 'Success'});

            return done(null, false, { message: 'A User with this email already exists.'})


        } catch (error) {
            return done(error);
        }
    }
));


passport.use('local', new LocalStrategy(
    {
        usernameField: 'email'
    },
    async (email, password, done) => {
        try {
            const user = await User.checkIfUserExist({ email, password });
            if (!user) {
                return done(null, false, { message: 'User doesn\'t exist' });
            } else {
                const matches = await User.verifyPassword(password, user.password);
                if (matches) {
                    return done(null, user, { message: 'Success' });
                } else {
                    return done(null, false, { message: 'Incorrect password' });
                }
            }
        } catch (error) {
            return done(error);
        }
    }
));


passport.use(new JWTstrategy(
    {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.ACCESS_TOKEN_SECRET
    },
    async (user, done) => {
        try {
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }
));