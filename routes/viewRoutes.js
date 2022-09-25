const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', viewsController.getLoginForm);

router.get('/', authController.isLoggedIn, viewsController.getHome);
router.get('/post/:id', authController.isLoggedIn, viewsController.getPost);
router.get(
  '/user/:userId',
  authController.isLoggedIn,
  viewsController.getProfile
);
router.get('/me', authController.protect, viewsController.getMe);
router.get('/my-posts', authController.protect, viewsController.getMyPosts);
router.get('/my-friends', authController.protect, viewsController.getMyFriends);

module.exports = router;
