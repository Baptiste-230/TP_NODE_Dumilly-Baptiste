const { crud } = require('./head')

/**
 * Trouve un utilisateur dans la base
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
async function findUser(req, res, next) {
    try {
        const result = await crud.find('users', req.query)
        res.json(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    findUser
}   