const mongoose = require('mongoose');

const ATMSchema = new mongoose.Schema(
{
    type: { type: String, required: true, enum: [ 'PersonaS', 'SelfServ' ] },
    model: { type: Number, required: true, enum: [ 5870, 5875, 5885, 5886, 5877, 6622, 6626, 6627, 6632, 6634, 6682, 6684 ] },
    ubication: { type: String, required: true, enum: [ 'Front Access', 'Rear Access'] },
    image: { type: String, default: '/assets/Atms.jpeg'},
    cassettes: [{ type: mongoose.Types.ObjectId, ref: 'cassettes' }]
});

const ATM = mongoose.model('atms', ATMSchema, 'atms');

module.exports = ATM;