
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.route('/getAllUsers')
    .get(userController.getAllUsers);

router.route('/updatePassword')
    .patch(authController.protect, userController.updatePassword);

router.route('/updateMe')
    .patch(authController.protect, userController.updateMe);


module.exports=router;