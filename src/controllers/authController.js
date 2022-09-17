const path = require('path');

const authController = {

    register: (req, res, next) => {
        res.send('x');
    },

    processRegister: (req, res, next) => {
        res.send('x');
    },

    login: (req, res, next) => {
        res.sendFile(path.join(__dirname, '../views/login.html'));
    },

    processLogin: (req, res, next) => {
        res.send('x');
    }

};

module.exports = authController;