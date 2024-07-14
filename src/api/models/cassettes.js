const mongoose = require('mongoose');

const cassetteSchema = new mongoose.Schema({
    denomination: { type: Number, required: true, enum: [ 5, 10, 20, 50, 100, 200, 500 ] },
    count: { type: Number, required: true },
    image: { type: String, default: '/assets/Cassette.jpg'}
});

const Cassette = mongoose.model('cassettes', cassetteSchema, 'cassettes');

module.exports = Cassette;