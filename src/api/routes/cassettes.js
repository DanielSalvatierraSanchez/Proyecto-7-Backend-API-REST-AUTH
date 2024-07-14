const cassettesRoutes = require('express').Router();
const { postCassette, getCassettes, updateCassette, deleteCassette } = require('../controllers/cassettes');

cassettesRoutes.post('/register', postCassette)
cassettesRoutes.get('/', getCassettes)
cassettesRoutes.put('/update/:id', updateCassette)
cassettesRoutes.delete('/delete/:id', deleteCassette)

module.exports = cassettesRoutes;