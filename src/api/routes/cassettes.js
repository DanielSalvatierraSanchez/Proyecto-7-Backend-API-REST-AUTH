const cassettesRoutes = require('express').Router();
const { isAdmin } = require('../../middlewares/isAdmin');
const { isAuth } = require('../../middlewares/isAuth');
const { postCassette, getCassettes, updateCassette, deleteCassette } = require('../controllers/cassettes');

cassettesRoutes.post('/register', [isAdmin], postCassette)
cassettesRoutes.get('/', [isAuth], getCassettes)
cassettesRoutes.put('/update/:id', [isAdmin], updateCassette)
cassettesRoutes.delete('/delete/:id', [isAuth], deleteCassette)

module.exports = cassettesRoutes;