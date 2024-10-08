const { isAdmin } = require('../../middlewares/isAdmin');
const { isAuth } = require('../../middlewares/isAuth');
const { postATM, getATMs, getATMByUbication, updateATM, deleteATM } = require('../controllers/atms');

const ATMsRoutes = require('express').Router()

ATMsRoutes.post('/register', isAdmin, postATM)
ATMsRoutes.get('/getBy/:ubication', isAuth, getATMByUbication)
ATMsRoutes.get('/', isAuth, getATMs)
ATMsRoutes.put('/update/:id', isAdmin, updateATM)
ATMsRoutes.delete('/delete/:id', isAdmin, deleteATM)

module.exports = ATMsRoutes;