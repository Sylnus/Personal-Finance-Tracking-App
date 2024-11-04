const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/user/update', userController.updateUser);
router.get('/user', userController.getUserByEmail);


module.exports = router;