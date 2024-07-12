const { postCassette, getCassettes, updateCassette, deleteCassette } = require('../controllers/cassettes');

const ATMsRoutes = require('express').Router()

ATMsRoutes.post('/register', postCassette)
ATMsRoutes.get('/', getCassettes)
ATMsRoutes.put('/update/:id', updateCassette)
ATMsRoutes.delete('/delete/:id', deleteCassette)

module.exports = ATMsRoutes;