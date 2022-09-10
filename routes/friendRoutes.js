const express = require('express');
const authController = require('../controllers/authController');
const friendController = require('../controllers/friendController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(friendController.getAllFriendRequest)
  .post(friendController.setUserData, friendController.createFriendRequest);

router
  .route('/:id')
  .get(friendController.getFriendRequest)
  .delete(friendController.deleteFriendRequest);

router.get('/acceptFriend/:id', friendController.acceptFriend);
router.delete('/rejectFriend/:id', friendController.rejectFriend);

module.exports = router;
