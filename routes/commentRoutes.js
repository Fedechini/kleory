const express = require('express');
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');

const router = express.Router({ mergeParams: true });

// protect all routes after this middleware
router.use(authController.protect);

router
  .route('/')
  .get(commentController.getAllComments)
  .post(commentController.setUserData, commentController.createComment);

router
  .route('/:id')
  .get(commentController.getComment)
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
