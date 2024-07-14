const Cassette = require("../models/cassettes");

const postCassette = async (req, res, next) => {
    try {
        const { denomination } = req.body;
        const cassetteDuplicated = await Cassette.findOne({ denomination });
        if (cassetteDuplicated) {
            return res.status(400).json({ message: 'Ya existe un cajetín como ese, pon otro diferente.' })
        }
        const newCassette = new Cassette(req.body);
        const cassetteSaved = await newCassette.save();
        return res.status(201).json(cassetteSaved);
    } catch (error) {
        return res.status(400).json('Fallo de postCassette');
    }
};

const getCassettes = async (req, res, next) => {
    try {
        const allCassettes = await Cassette.find();
        if (!allCassettes.length) {
            return res.status(400).json({ message: 'No hay ningún cajetín instalado.' });
        }
        return res.status(200).json({ message: 'Listado completo de cajetines.', allCassettes });
    } catch (error) {
        return res.status(400).json('Fallo de getCassettes');
    }
}

const updateCassette = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cassetteModify = new Cassette(req.body);
        cassetteModify._id = id;
        const cassetteUpdated = await Cassette.findByIdAndUpdate(id, cassetteModify, { new: true });
        if (!cassetteUpdated) {
            return res.status(400).json({ message: 'No hay ningun cajetín con esa denominación.' });
        }
        return res.status(200).json({ message: 'Cajetín actualizado correctamente.', cassetteUpdated });
    } catch (error) {
        return res.status(400).json('Fallo de updateCassette');
    }
}

const deleteCassette = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cassetteDeleted = await Cassette.findByIdAndDelete(id)
        return res.status(200).json({ message: 'Cajetín eliminado correctamente.', cassetteDeleted });
    } catch (error) {
        return res.status(400).json('Fallo de deleteCassette');
    }
}

module.exports = { postCassette, getCassettes, updateCassette, deleteCassette }