const { crud } = require('./head')

/**
 * Trouve un item dans la base
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
async function findItem(req, res, next) {
    try {
        const result = await crud.find('items', req.query)
        res.json(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    findItem
}