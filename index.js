require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/config/db');

const app = express();
connectDB();

app.use('*', (req, res, next) => {
    return res.status(404).json('✅ Route Not Found');
})

app.listen(3003, () => {
    console.log('✅ Servidor levantado en http://localhost:3003');
});