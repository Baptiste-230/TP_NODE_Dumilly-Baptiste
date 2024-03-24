const { crud } = require('./head');

/**
 * Récupère une watchlist en fonction de ses paramètres
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object} watchlist
 */
async function findWatchlist(req, res, next) {
    try {
        const result = await crud.find('watchlists', req.query);

        res.json(result);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    findWatchlist
};
