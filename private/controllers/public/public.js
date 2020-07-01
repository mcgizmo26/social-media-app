// *********************************** App Variables *******************************
const express = require('express');
const passport = require('passport');
// const jwt = require('jsonwebtoken');
require('dotenv').config();


const User = require('../../helpers/user/user_helpers');

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
				return res.cookie(process.env.APP_COOKIE, token, { expires: new Date(Date.now() + process.env.COOKIE_EXP), httpOnly: true })
					.json({ url: '/home' })
			} else {
				return res.status(500).json({ message: 'Something went wrong' });
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

			delete user.password;

			req.login(user, { session: false }, async (error) => {
				if (error) return next(error)

				const success = User.createRefreshToken(user);

				if (success) {
					const token = await User.createJWT(user);

					return res.cookie(process.env.APP_COOKIE, token, { expires: new Date(Date.now() + process.env.COOKIE_EXP), httpOnly: true })
						.json({ url: '/home' });
				} else {
					return res.status(500).json({ message: 'Something went wrong' });
				}

			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});



module.exports = router;