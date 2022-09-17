const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getHome);
router.get('/post/:id', viewsController.getPost);
router.get('/login', viewsController.getLoginForm);

module.exports = router;
