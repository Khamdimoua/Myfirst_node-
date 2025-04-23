const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controllers');

// Register a new user
router.post('/register', userController.create);

// User login
router.post('/login', userController.login);

// Get all users
router.get('/', userController.getAll);

// Get a specific user by ID
router.get('/:id', userController.getOne);

module.exports = router;