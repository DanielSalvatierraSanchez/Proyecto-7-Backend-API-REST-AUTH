const { postATM, getATMs, getATMByUbication, updateATM, deleteATM } = require('../controllers/atm');

const ATMsRoutes = require('express').Router()

ATMsRoutes.post('/register', postATM)
ATMsRoutes.get('/getBy/:ubication', getATMByUbication)
ATMsRoutes.get('/', getATMs)
ATMsRoutes.put('/update/:id', updateATM)
ATMsRoutes.delete('/delete/:id', deleteATM)

module.exports = ATMsRoutes;