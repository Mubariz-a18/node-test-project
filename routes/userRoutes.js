const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js'); 
const { authenticateToken } = require('../utils/authMiddleware.js');

router.get('/details/:user_id', userController.getUserDetails);

router.put('/update/:user_id',authenticateToken,userController.updateUser);

router.get('/image/:user_id', userController.getUserImage);

router.post('/insert',authenticateToken, userController.insertUser);

router.delete('/delete/:user_id', userController.deleteUser);

router.post('/login',userController.login);

router.post('/register',userController.registertUser);

module.exports = router;
