const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', authController.protect, viewsController.getHome);
router.get('/post/:id', authController.protect, viewsController.getPost);
router.get('/login', viewsController.getLoginForm);

module.exports = router;
