const { crud } = require('./head');

/**
 * Ajourter un item à une watchlist
 * @param {Object} req 
 * @param {Object} res
 * @param {Function} next 
 * @returns {Object}
 * @async
 */
async function addItemToWatchlist(req, res, next) {
    const { utilisateurId, watchlistId, itemId, etat } = req.body;

    try {
        const item = await crud.findOne('items', { id: itemId });
        if (!item) {
            res.status(404).json({ error: 'Item non trouvé' });
            return;
        }

        const watchlistExist = await crud.findOne('watchlists', { id: watchlistId });
        if (!watchlistExist) {
            res.status(404).json({ error: 'Watchlist non trouvée' });   
            return;
        }

        const user = await crud.findOne('watchlists', { id: watchlistId, utilisateurId : utilisateurId });
        if (!user) {
            res.status(404).json({ error: 'Non autorisé' });
            return;
        }

        const watchlist = await crud.findOne('watchlists', { id: watchlistId, 'items.film': itemId });
        if (watchlist) {
            res.status(400).json({ error: 'Item déjà dans la watchlist' });
            return;
        }

        const film = await crud.findOne('items', { id: itemId });

        const itemState = {
            film: itemId,
            titre: film.titre,
            etat: etat
        };

        const updatedWatchlist = await crud.updateOne(
            'watchlists',
            { id: watchlistId },
            { $push: { items: itemState } }
        );

        res.status(200).json(updatedWatchlist);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    addItemToWatchlist
}
