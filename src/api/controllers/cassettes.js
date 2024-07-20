const Cassette = require("../models/cassettes");

const postCassette = async (req, res, next) => {
    try {
        const { denomination, count } = req.body;
        const cassetteDuplicated = await Cassette.findOne({ denomination });
        if (cassetteDuplicated) {
            return res.status(400).json({ message: `Ya existe un cajetín ${denomination}€, pon otro diferente.` })
        }
        const newCassette = new Cassette(req.body);
        const cassetteSaved = await newCassette.save();
        return res.status(201).json({ message: `Cajetín de ${denomination} cargado con ${count}€.`, cassetteSaved });
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

const getCassetteByDenomination = async (req, res, next) => {
    try {
        const { denomination } = req.params;
        const searchCassetteByDenomination = await Cassette.findOne({denomination});
        if (!searchCassetteByDenomination) {
            return res.status(400).json({ message: `No hay ningún cajetín instalado de esa denominación.` });
        }
        return res.status(200).json({ message: 'Aquí está el cajetín solicitado:', searchCassetteByDenomination });
    } catch (error) {
        return res.status(400).json('Fallo de getCassetteByDenomination');
    }
}

const updateCassette = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { count } = req.body;

        if (count === 0 || count > 2500 ) {
            return res.status(400).json('Se debe de introducir un mínimo de 1 billete y un máximo de 2500 billetes.')
        }
        
        const cassetteModify = new Cassette(req.body);
        cassetteModify._id = id;
        
        const cassetteUpdated = await Cassette.findByIdAndUpdate(id, cassetteModify, { new: true });
        
        if (!cassetteUpdated) {
            return res.status(400).json({ message: `No existe ese cajetín.` });
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

/*const deleteCassetteOfATM = async (req, res, next) => {
    try {
        const { id } = req.params;
        // const { denomination } = req.body;
        //const carFound = await Car.findOne({ $or: [{_id: id}, {model}] });
        const atm = await ATM.findById(id);
        if (!atm) {
            return res.status(400).json('No hay ningún ATM que coincida con el indicado');
        }
        //const carDeleted = await Car.findByIdAndDelete({$or: [{_id:id}, {model}]}, {new: true});
        const cassette = await atm.find(denomination, {new: true});
        console.log(cassette);
        return res.status(200).json(cassette);
    } catch (error) {
        return res.status(400).json('⛔⛔⛔ ERROR en deleteCarOfPlayer');
    }
};*/

module.exports = { postCassette, getCassettes, getCassetteByDenomination, updateCassette, deleteCassette }