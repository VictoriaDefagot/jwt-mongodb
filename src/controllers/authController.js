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

        const user = await User.findById(req.userId, { password: 0 });
        if(!user){
            return res.status(404).send('No user found');
        };

        res.json(user);
    },

    processLogin: async (req, res, next) => {
        
        const { email, password } = req.body;

        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).send("The email provided doesn't exist");
        };
        
        const validPassword = await user.validatePassword(password);
        if(!validPassword){
            return res.status(401).json({auth: false, token: null});
        };

        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 60 * 60 * 24
        });

        res.json({auth: true, token});
    }

};

module.exports = authController;