const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

/* GET home page. */
router.route('/', postController.getAllPosts);

module.exports = router;
