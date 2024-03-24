const express = require('express');
const router = express.Router();
const { findItem } = require('../controllers/items/findItem');
const { addItem } = require('../controllers/items/addItem');

// Get all items
router.get('/find', findItem);

// Add an item
router.post('/add', addItem);

module.exports = router;