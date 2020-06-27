// *********************************** App Variables *******************************
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// *********************************** Use Middleware ******************************
const router = express.Router();


// *********************************** Routes **************************************
/*When the user sends a post request to this route, passport authenticates the user based on the
middleware created previously */
router.post('/signup', (req, res, next) => {
	passport.authenticate('signup', { session: false }, async (err, user, info) => {
		try {
		if (!user) return res.status(403).json(info);

		const body = { _id: user.user_id, email: user.email };
		const token = await jwt.sign({ user: body }, process.env.ACCESS_TOKEN_SECRET);

		return res.cookie(process.env.APP_COOKIE, token, { expires: new Date(Date.now() + process.env.COOKIE_EXP), httpOnly: true })
			.json({ url: '/home'})
		} catch(error){
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

				//We don't want to store the sensitive information such as the
				//user password in the token so we pick only the email and id
				const body = { _id: user.user_id, email: user.email };

				//Sign the JWT token and populate the payload with the user email and id
				const token = await jwt.sign({ user: body }, process.env.ACCESS_TOKEN_SECRET);

				//Send back the token to the user
				return res.cookie(process.env.APP_COOKIE, token, { expires: new Date(Date.now() + process.env.COOKIE_EXP), httpOnly: true })
					.json({ url: '/home'})
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});



module.exports = router;