const { Router } = require('express');
const router = Router();

const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');


router.post('/register', authController.processRegister);

router.get('/profile', verifyToken, authController.profile);

router.post('/login', authController.processLogin);


module.exports = router;