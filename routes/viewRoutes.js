const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getHome);
router.get('/post', viewsController.getPost);

module.exports = router;
