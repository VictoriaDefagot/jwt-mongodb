const { Router } = require('express');
const router = Router();

const authController = require('../controllers/authController');


router.get('/register', authController.register);

router.post('/register', authController.processRegister);

router.get('/login', authController.login);

router.post('/login', authController.processLogin);


module.exports = router;