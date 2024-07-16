const cassettesRoutes = require('express').Router();
const { isAdmin } = require('../../middlewares/isAdmin');
const { isAuth } = require('../../middlewares/isAuth');
const { postCassette, getCassettes, getCassetteById, updateCassette, deleteCassette } = require('../controllers/cassettes');

cassettesRoutes.post('/register', postCassette)
cassettesRoutes.get('/', getCassettes)
cassettesRoutes.get('/getBy/:id', getCassetteById)
cassettesRoutes.put('/update/:id', updateCassette)
cassettesRoutes.delete('/delete/:id', deleteCassette)

module.exports = cassettesRoutes;