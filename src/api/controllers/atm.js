const ATM = require("../models/atm")

const postATM = async (req, res, next) => {
    try {
        const { model } = req.body;
        const ATMDuplicated = await ATM.findOne({ model });
        if (ATMDuplicated) {
            return res.status(400).json({ message: 'El ATM ya existe, crea otro diferente.' })
        }
        const newATM = new ATM(req.body);
        const ATMSaved = await newATM.save();
        return res.status(201).json({ message: 'ATM instalado correctamente.', ATMSaved });
    } catch (error) {
        return res.status(400).json('Fallo de postATM');
    }
};

const getATMs = async (req, res, next) => {
    try {
        const allATMs = await ATM.find();
        if (!allATMs.length) {
            return res.status(400).json('No hay ningún ATM instalado.');
        }
        return res.status(200).json({ message: 'Listado completo de ATMs.', allATMs });
    } catch (error) {
        return res.status(400).json('Fallo de getATMs');
    }
}

const getATMByUbication = async (req, res, next) => {
    try {
        const { ubication } = req.params;
        if (ubication !== 'Front Access' && ubication !== 'Rear Access') {
            return res.status(400).json({ message: 'Ubicación mal introducida. Introduce Front Access o Rear Access' });
        }
        const searchATMByUbication = await ATM.find({ ubication })
        if (!searchATMByUbication.length) {
            return res.status(400).json({ message: 'No hay ningun ATM con esa característica.' });
        }
        return res.status(200).json({ message: 'Estos son los ATMs encontrados segun su ubicación.', searchATMByUbication });
    } catch (error) {
        return res.status(400).json('Fallo de getATMByModel');
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
            return res.status(400).json({ message: 'No hay ningun ATM con ese ID.' });
        }
        return res.status(200).json({ message: 'ATM actualizado correctamente.', ATMUpdated });
    } catch (error) {
        return res.status(400).json('Fallo de updateATM');
    }
}

const deleteATM = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ATMDeleted = await ATM.findByIdAndDelete(id);
        return res.status(200).json({ message: 'ATM eliminado correctamente.', ATMDeleted });
    } catch (error) {
        return res.status(400).json('Fallo de deleteATM');
    }
}

module.exports = { postATM, getATMs, getATMByUbication, updateATM, deleteATM };