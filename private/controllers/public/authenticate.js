// *********************************** App Variables *******************************
const express = require('express');
const passport = require('passport');
require('dotenv').config();


// *********************************** Local Variables *****************************
const { createRefreshToken } = require('../../helpers/auth_helper');


// *********************************** Use Middleware ******************************
const router = express.Router();

// *********************************** Routes **************************************
/*When the user sends a post request to this route, passport authenticates the user based on the
middleware created previously */
router.post('/check', function (req, res, next) {
    passport.authenticate('secure', { session: false }, async (err, user, info) => {
        try {
            if (!user) return res.status(403).json(info);

            const result = await createRefreshToken(user.user);

            if (result.token) {

                return res.cookie(process.env.APP_COOKIE, result.token, { expires: new Date(Date.now() + process.env.COOKIE_EXP), httpOnly: true })
                    .json({ user: result.userInfo });
            } else {
                return res.status(500).json({ message: 'error', url: '/' });
            }
        } catch (error) {
            next(error);
        };
    })(req, res, next);
});


module.exports = router;