const path = require('path');
const User = require('../models/User');
const config = require('../config');

const jwt = require('jsonwebtoken');

const authController = {

    processRegister: async (req, res, next) => {

        const { name, lastName, email, password } = req.body;
        const user = new User ({
            name: name,
            lastName: lastName,
            email: email,
            password: password
        });

        user.password = await user.encryptPassword(user.password);
        await user.save();

        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 60 * 60 * 24
        });

        console.log(user);
        res.json({auth: true, token});
    },

    profile: async (req, res, next) => {

        const token = req.headers['x-access-token'];

        if(!token){
            return res.status(401).json({
                auth: false,
                message: 'No token provided'
            });
        };

        const decoded = jwt.verify(token, config.secret);

        const user = await User.findById(decoded.id, { password: 0 });
        if(!user){
            return res.status(404).send('No user found');
        };

        res.json(user);
    },

    login: (req, res, next) => {
        rres.json('login');
    },

    processLogin: (req, res, next) => {
        res.json('login');
    }

};

module.exports = authController;