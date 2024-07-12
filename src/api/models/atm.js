const mongoose = require('mongoose');

const ATMSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: [ 'PersonaS', 'SelfServ' ] },
    model: { type: Number, required: true },
    ubication: { type: String, required: true, enum: [ 'Front Access', 'Rear Access'] },
    image: { type: String, default: '/assets/atms.jpeg'},
    cassettes: [{ type: mongoose.Types.ObjectId, ref: 'cassettes' }]
});

const ATM = mongoose.model('atms', ATMSchema, 'atms');

module.exports = ATM;