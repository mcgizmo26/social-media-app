// *********************************** App Variables *******************************
const express = require('express');
const passport = require('passport');
require('dotenv').config();


// *********************************** Custom Variables ****************************
const User = require('../../helpers/user/user_helpers');
const { getTokenFromDB } = require('../../helpers/auth_helper');
const authenticate = require('./authenticate');


// *********************************** Use Middleware ******************************
const router = express.Router();


// *********************************** Routes **************************************
/*When the user sends a post request to this route, passport authenticates the user based on the
middleware created previously */
router.post('/signup', (req, res, next) => {
	passport.authenticate('signup', { session: false }, async (err, user, info) => {
		try {
			if (!user) return res.status(403).json(info);

			const success = User.createRefreshToken(user);

			if (success) {
				const token = User.createJWT(user);
				delete user.password;
				delete user.security_token;

				return res.cookie(process.env.APP_COOKIE, token, { expires: new Date(Date.now() + process.env.COOKIE_EXP), httpOnly: true })
					.json({ url: '/home', loggedIn: true })
			} else {
				return res.status(500).json({ message: 'Something went wrong', loggedIn: false });
			};

		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', { session: false }, (err, user, info) => {
		try {
			if (err || !user) return res.status(401).json(info);

			req.login(user, { session: false }, async (error) => {
				if (error) return next(error)

				const success = User.createRefreshToken(user);

				if (success) {
					const token = await User.createJWT(user);
					delete user.password;
					delete user.security_token;

					return res.cookie(process.env.APP_COOKIE, token, { expires: new Date(Date.now() + process.env.COOKIE_EXP), httpOnly: true })
						.json({ url: '/home', user: user, loggedIn: true });
				} else {
					return res.status(500).json({ message: 'Something went wrong', loggedIn: false });
				}

			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

router.post('/logout', (req, res, next) => {
	getTokenFromDB(req.body.user);
});

router.use('/authenticate', authenticate);



module.exports = router;