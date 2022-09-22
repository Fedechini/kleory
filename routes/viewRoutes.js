const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', viewsController.getLoginForm);

router.get('/', authController.isLoggedIn, viewsController.getHome);
router.get('/post/:id', authController.isLoggedIn, viewsController.getPost);
router.get('/me', authController.protect, viewsController.getProfile);

module.exports = router;
