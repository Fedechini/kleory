const express = require('express');
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authController.protect, commentController.getAllComments)
  .post(
    authController.protect,
    commentController.setUserData,
    commentController.createComment
  );

router
  .route('/:id')
  .get(authController.protect, commentController.getComment)
  .patch(authController.protect, commentController.updateComment)
  .delete(authController.protect, commentController.deleteComment);

module.exports = router;
