const express = require('express');
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, commentController.getAllComments)
  .post(authController.protect, commentController.createComment);

module.exports = router;
