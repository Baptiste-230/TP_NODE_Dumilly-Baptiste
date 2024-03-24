const { crud, validateUser } = require('./head');

/**
 * Ajoute un utilisateur dans la base
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<void>}
 * 
 */
async function addUser(req, res, next) {
    const { username } = req.body; 
    const user = { username }; 
    const validation = validateUser(user);
    if (validation.errors.length > 0) {
        res.status(400).json(validation.errors);
    } else {
        try {
            const lastId = await crud.find('users', {}, { id: -1 });
            if (lastId.length === 0) {
                user.id = 1;
            } else {
                user.id = lastId.length + 1;
            }            
            const newUser = {
                id: user.id,
                username: user.username
            };
            res.json(await crud.insertOne('users', newUser));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = {
    addUser
};
