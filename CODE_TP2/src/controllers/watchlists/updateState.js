const { crud } = require('./head')

/**
 * Modifie l'état d'un item dans une watchlist
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<void>}
 * 
 */
async function updateState(req, res, next) {
    const info = req.body;

    const user = await crud.findOne('users', { id: info.utilisateurId });
    if (!user) {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
        return;
    }

    const watchlist = await crud.findOne('watchlists', { id: info.watchlistId, utilisateurId: info.utilisateurId});
    if (!watchlist) {
        res.status(404).json({ error: 'Watchlist non trouvée ou n\'appartient au bon utilisateur' });
        return;
    }

    const item = await crud.findOne('watchlists', { id: info.watchlistId, 'items.film': info.itemId });
        if (!item) {
            res.status(404).json({ error: 'Item non trouvé dans la watchlist' });
            return;
        }
    
    info.etat = info.etat.toLowerCase();
    if (info.etat !== 'à voir' && info.etat !== 'terminé' && info.etat !== 'en cours' && info.etat !== 'abandonné') {
        res.status(400).json({ error: 'Etat invalide' });
        return;
    }

    const result = await crud.updateOne('watchlists', { id: info.watchlistId, 'items.film': info.itemId }, { $set: { 'items.$.etat': info.etat } });
    res.json(result);
}

module.exports = {
    updateState
}