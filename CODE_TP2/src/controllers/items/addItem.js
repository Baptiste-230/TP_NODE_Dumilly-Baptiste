const { crud } = require('./head')
const axios = require('axios')
const { omdbApiKey } = require('./head')

/**
 * Ajoute un item dans la base
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<void>}
 * 
*/
async function addItem(req, res, next) {
    const item = req.body
    item.titre = item.titre.toLowerCase()
    const result = await crud.find('items', item)
    if (result.length > 0) {
        res.status(400).json({ error: 'Item déjà existant' });
        return
    }
    const url = `http://www.omdbapi.com/?apikey=${omdbApiKey}&t=${item.titre}`
    const response = await axios.get(url)
    if (response.data.Response === 'False') {
        res.status(400).json({ error: 'Item non trouvée!' });
        return
    }
    const lastId = await crud.find('items', {}, { id: -1 })
    if (lastId.length === 0) {
        item.id = 1
    } else {
        item.id = lastId.length + 1
    }
    
    item.id = lastId.length + 1
    item.annee = response.data.Year
    item.realisateur = response.data.Director
    item.Description = response.data.Plot
    item.Langue = response.data.Language
    item.Type = response.data.Type

    // on ajoute le film dans la base
    try {
        res.json(await crud.insertOne('items', item));

    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    addItem
}