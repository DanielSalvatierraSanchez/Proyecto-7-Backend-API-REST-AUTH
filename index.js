require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/config/db');
const ATMsRoutes = require('./src/api/routes/atms');
const cassettesRoutes = require('./src/api/routes/cassettes');
const usersRoutes = require('./src/api/routes/users');

const app = express();
connectDB();

app.use(express.json());

app.use('/api/v1/atms', ATMsRoutes)
app.use('/api/v1/cassettes', cassettesRoutes)
app.use('/api/v1/users', usersRoutes)

app.use('*', (req, res, next) => {
    return res.status(404).json('✅ Route Not Found');
})

app.listen(3003, () => {
    console.log('✅ Servidor levantado en http://localhost:3003');
});