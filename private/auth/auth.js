// *********************************** App Variables *******************************
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


// *********************************** Local Variables *****************************
const { createUser, checkIfUserExist, verifyPassword } = require('../helpers/appEntry_helper');


// *********************************** App Strategies ******************************
passport.use('signup', new LocalStrategy(
    {
        firstnameField: 'firstname',
        lastnameField: 'lastname',
        emailField: 'email',
        passwordField: 'password'
    },
    (firstname, lastname, email, password, done) => {
        console.log(firstname, lastname, email, password);
        try {
            const user = createUser({
                firstname,
                lastname,
                email,
                password
            });

            return done(null, user);
        } catch (error) {
            done(error);
        }
    }
));


passport.use('local', new LocalStrategy(
    {
        usernameField: 'email'
    },
    async (email, password, done) => {
        try {
            const user = await checkIfUserExist({ email, password });
            if (!user.length) {
                return done(null, false, { message : 'User doesn\'t exist'});
            } else {
                const matches = await verifyPassword(password, user[0].password);
                if (matches) {
                    return done(null, user[0], {message: 'Success'});
                } else {
                    return done(null, false, { message : 'Incorrect password'});
                }
            }
        } catch (error) {
            console.log("there is an error")
            return done(error);
        }
    }
));


passport.use(new JWTstrategy(
    {
        secretOrKey: process.env.APP_COOKIE,
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter(process.env.APP_COOKIE)
    },
    async (token, done) => {
        console.log('token:');
        console.log(token);
        try {
            return done(null, token.user);
        } catch (error) {
            done(error);
        }
    }
));