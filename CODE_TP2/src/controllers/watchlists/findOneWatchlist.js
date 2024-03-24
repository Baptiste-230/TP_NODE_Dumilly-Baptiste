const { crud } = require('./head');

/** 
 * Récupère une watchlist en fonction de son id
 * @param {Object} req
 * @param {Object} res 
 * @param {Function} next
 * @returns {Object} watchlist
 */
async function findOneWatchlist(req, res, next) {
    const id = parseInt(req.params.id);
    try {
        const watchlist = await crud.findOne('watchlists', { id: id });
        if (!watchlist) {
            res.status(404).send('Watchlist non trouvée');
            return;
        }

        res.status(200).json(watchlist);
    
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    findOneWatchlist
}