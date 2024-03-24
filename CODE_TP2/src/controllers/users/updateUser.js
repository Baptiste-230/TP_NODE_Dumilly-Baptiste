const { crud } = require('./head');

/**
 * Met à jour un utilisateur dans la base de données
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<void>}
 * @async
 */

async function updateUser(req, res, next) {
    try {
        const userFound = await crud.findOne('users', { id: parseInt(req.params.userId) });
        if (!userFound) {
            res.status(404).send({ error: 'Utilisateur non trouvé' });
            return;
        }

        const updatedUser = await crud.updateOne('users', { id: parseInt(req.params.userId) }, { $set: req.body });
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    updateUser
};
