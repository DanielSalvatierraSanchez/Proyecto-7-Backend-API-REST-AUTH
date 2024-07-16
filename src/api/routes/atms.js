const { isAdmin } = require('../../middlewares/isAdmin');
const { isAuth } = require('../../middlewares/isAuth');
const { postATM, getATMs, getATMByUbication, updateATM, deleteATM } = require('../controllers/atms');

const ATMsRoutes = require('express').Router()

ATMsRoutes.post('/register', postATM)
ATMsRoutes.get('/getBy/:ubication', getATMByUbication)
ATMsRoutes.get('/', getATMs)
ATMsRoutes.put('/update/:id', updateATM)
ATMsRoutes.delete('/delete/:id', deleteATM)

module.exports = ATMsRoutes;