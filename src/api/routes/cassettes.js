const { isAdmin } = require('../../middlewares/isAdmin');
const { isAuth } = require('../../middlewares/isAuth');
const { postCassette, getCassettes, getCassetteByDenomination, updateCassette, deleteCassette } = require('../controllers/cassettes');

const cassettesRoutes = require('express').Router();

cassettesRoutes.post('/register', isAdmin, postCassette)
cassettesRoutes.get('/getBy/:denomination', isAuth, getCassetteByDenomination)
cassettesRoutes.get('/', isAuth, getCassettes)
cassettesRoutes.put('/update/:id', isAuth, updateCassette)
cassettesRoutes.delete('/delete/:id', isAdmin, deleteCassette)

module.exports = cassettesRoutes;