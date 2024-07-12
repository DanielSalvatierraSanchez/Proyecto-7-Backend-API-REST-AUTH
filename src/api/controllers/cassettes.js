const Cassette = require("../models/cassettes");

const postCassette = async (req, res, next) => {
    try {
        const { denomination } = req.body;
        const cassetteDuplicated = await Cassette.findOne({ denomination });
        if (cassetteDuplicated) {
            return res.status(404).json('Ya existe un cajetín como ese, pon otro diferente.')
        }
        const newCassette = new Cassette(req.body);
        const CassetteSaved = await newCassette.save();
        return res.status(201).json(CassetteSaved);
    } catch (error) {
        return res.status(400).json('Fallo de postCassette');
    }
};

const getCassettes = async (req, res, next) => {
    try {
        const allCassettes = await Cassette.find();
        if (!allCassettes.length) {
            return res.status(404).json('No hay ningun cajetín.');
        }
        return res.status(200).json(allCassettes);
    } catch (error) {
        return res.status(400).json('Fallo de getCassettes');
    }
}

const updateCassette = async (req, res, next) => {
    try {
        const { denomination } = req.params;
        const { count } = req.body;
        if (count) {
            count.$addToSet = { cassettes: cassettes };
        }
        const cassetteUpdated = await Cassette.findOneAndUpdate(denomination, count, { new: true});
        if (!cassetteUpdated) {
            return res.status(404).json('No hay ningun cajetín con esa denominación');
        }
        return res.status(200).json(cassetteUpdated);
    } catch (error) {
        return res.status(400).json('Fallo de updateCassette');
    }
}

const deleteCassette = async (req, res, next) => {
    try {
        const { denomination } = req.params;
        const cassetteDeleted = await ATM.findByIdAndDelete(denomination);
        return res.status(200).json(cassetteDeleted);
    } catch (error) {
        return res.status(400).json('Fallo de deleteCassette');
    }
}

module.exports = { postCassette, getCassettes, updateCassette, deleteCassette }