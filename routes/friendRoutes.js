const express = require('express');
const authController = require('../controllers/authController');
const friendController = require('../controllers/friendController');

const router = express.Router();

router.use(authController.protect);

// TODO: implement accept & delete frienReq and friend list

router
  .route('/')
  .get(friendController.getAllFriendRequest)
  .post(friendController.setUserData, friendController.createFriendRequest);

router
  .route('/:id')
  .get(friendController.getFriendRequest)
  .delete(friendController.deleteFriendRequest);

module.exports = router;
