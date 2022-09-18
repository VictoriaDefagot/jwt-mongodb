const path = require('path');
const User = require('../models/User');
const config = require('../config');

const jwt = require('jsonwebtoken');

const authController = {

    register: (req, res, next) => {
        res.json('register');
    },

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

    login: (req, res, next) => {
        rres.json('login');
    },

    processLogin: (req, res, next) => {
        res.json('login');
    }

};

module.exports = authController;