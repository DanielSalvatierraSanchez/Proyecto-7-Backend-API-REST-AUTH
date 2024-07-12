const { postCassette, getCassettes, updateCassette, deleteCassette } = require('../controllers/cassettes');

const cassettesRoutes = require('express').Router();

cassettesRoutes.post('/register', postCassette)
cassettesRoutes.get('/', getCassettes)
cassettesRoutes.put('/update/:denomination', updateCassette)
cassettesRoutes.delete('/delete/:denomination', deleteCassette)

module.exports = cassettesRoutes;