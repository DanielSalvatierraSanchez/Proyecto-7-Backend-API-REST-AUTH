const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('✅ BBDD conectada');
    } catch (error) {
        console.log('❌ BBDD desconectada');
    }
}

module.exports = { connectDB };