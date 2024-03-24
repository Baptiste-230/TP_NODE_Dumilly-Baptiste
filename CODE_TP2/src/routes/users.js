const express = require('express');
const router = express.Router();
const { findUser } = require('../controllers/users/findUser');
const { addUser } = require('../controllers/users/addUser');
const { updateUser } = require('../controllers/users/updateUser');


// Get all users
router.get('/find', findUser)

// Add a user
router.post('/add', addUser)

// Put an updated user
router.patch('/update/:userId', updateUser)

// Get all watchlists from a user
// router.get('/watchlists', users.getWatchlists)

module.exports = router