const ATM = require("../models/atm")

const postATM = async (req, res, next) => {
    try {
        const { model } = req.body;
        const ATMDuplicated = await ATM.findOne({ model });
        if (ATMDuplicated) {
            return res.status(404).json('El ATM ya existe, crea otro diferente.')
        }
        const newATM = new ATM(req.body);
        const ATMSaved = await newATM.save();
        return res.status(201).json(ATMSaved);
    } catch (error) {
        return res.status(400).json('Fallo de postATM');
    }
};

const getATMs = async (req, res, next) => {
    try {
        const allATMs = await ATM.find();
        if (!allATMs.length) {
            return res.status(404).json('No hay ningun ATM.');
        }
        return res.status(200).json(allATMs);
    } catch (error) {
        return res.status(400).json('Fallo de getATMs');
    }
}

const updateATM = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { cassettes, ...rest } = req.body;
        const allParams = { ...rest };
        if (cassettes) {
            allParams.$addToSet = { cassettes: cassettes };
        }
        const ATMUpdated = await ATM.findByIdAndUpdate(id, allParams, { new: true});
        if (!ATMUpdated) {
            return res.status(404).json('No hay ningun ATM con ese ID');
        }
        return res.status(200).json(ATMUpdated);
    } catch (error) {
        return res.status(400).json('Fallo de updateATM');
    }
}

const deleteATM = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ATMDeleted = await ATM.findByIdAndDelete(id);
        return res.status(200).json(ATMDeleted);
    } catch (error) {
        return res.status(400).json('Fallo de deleteATM');
    }
}

module.exports = { postATM, getATMs, updateATM, deleteATM };