const { crud } = require('./head')

/**
 * Ajouter une watchlist
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object}
 * @async
 */

async function addWatchlist(req, res, next) {
    const watchlist = req.body
    watchlist.nom = watchlist.nom.toLowerCase()
    const user = await crud.findOne('users', { id : watchlist.utilisateurId })
    if (!user) {
        res.status(400).json({ error: 'User non trouvée' })
        return
    }
    const existingWatchlist = await crud.findOne('watchlists', { utilisateurId: watchlist.utilisateurId, nom: watchlist.nom })
    if (existingWatchlist) {
        res.status(400).json({ error: 'Watchlist déjà existante'})
        return
    }
    watchlist.items = []
    const lastId = await crud.find('watchlists', {}, { id: -1 })
    if (lastId.length === 0) {
        watchlist.id = 1
    } else {
        watchlist.id = lastId.length + 1
    }

    const userFinal = await crud.findOne('users', { id: watchlist.utilisateurId })

    watchlistFinal = {
        id: watchlist.id,
        utilisateur: userFinal.username,
        utilisateurId: watchlist.utilisateurId,
        nom: watchlist.nom,
        items: watchlist.items
    }

    try {
        res.json(await crud.insertOne('watchlists', watchlistFinal));
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    addWatchlist
}