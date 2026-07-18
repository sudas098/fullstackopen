const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginsRouter = require('express').Router();
const User = require('../modules/user');

loginsRouter.post('/', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        const correctPassword = user === null
              ? false
              : await bcrypt.compare(password, user.passwordHash)
        
              if ( !(user && correctPassword)) {
                return res.status(401).json({error: 'invalid username or password'})
              }

        const userToken = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(userToken, process.env.SECRET, {expiresIn: 60 * 60});

        res.status(200).send({token, username: user.username, name: user.name});
    } catch (err) {
        next (err)
    }
});

module.exports = loginsRouter;