const express = require('express');
const router = express.Router();
const { findWatchlist } = require('../controllers/watchlists/findWatchlist');
const { addWatchlist } = require('../controllers/watchlists/addWatchlist');
const { addItemToWatchlist } = require('../controllers/watchlists/addItemToWatchlist');
const { findOneWatchlist } = require('../controllers/watchlists/findOneWatchlist');
const { findWatchlistUser } = require('../controllers/watchlists/findWatchlistUser');
const { updateState } = require('../controllers/watchlists/updateState');

// Get all watchlists
router.get('/find', findWatchlist);

// Add a watchlist
router.post('/add', addWatchlist);

// Add an item to a watchlist
router.patch('/addItem', addItemToWatchlist);

// Find one watchlist
router.get('/find/:id', findOneWatchlist);

// Find all watchlists per user
router.get('/findListUser/:utilisateurId', findWatchlistUser);

// Update the state of an item in a watchlist
router.patch('/updateState', updateState);


module.exports = router;