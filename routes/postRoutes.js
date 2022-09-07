const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const commentRouter = require('./commentRoutes');

const router = express.Router();

router.use('/:postId/comments', commentRouter);

router
  .route('/')
  .get(authController.protect, postController.getAllPosts)
  .post(
    authController.protect,
    postController.setUserData,
    postController.createPost
  );

router
  .route('/:id')
  .get(authController.protect, postController.getPost)
  .patch(authController.protect, postController.updatePost)
  .delete(authController.protect, postController.deletePost);

module.exports = router;
