const { crud } = require('./head')

async function findWatchlistUser(req, res, next) {
    const utilisateurId = parseInt(req.params.utilisateurId);
    try {
        // verifier que l'utilisateur existe
        const user = await crud.findOne('users', { id: utilisateurId });
        if (!user) {
            res.status(404).send('User non trouvée');
            return;
        }

        const watchlists = await crud.find('watchlists', { utilisateurId: utilisateurId });
        if (!watchlists) {
            res.status(404).send('Watchlist non trouvée');
            return;
        }

        res.status(200).json(watchlists);

    
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    findWatchlistUser
}