require('dotenv').config()
const mongoose = require('mongoose')
const ATM = require('../../api/models/atms')
const Cassette = require('../../api/models/cassettes')
const User = require('../../api/models/users')
const ATMNCR = require('../../data/atmsSeed')
const cassetesNCR = require('../../data/cassettesSeed')
const usersNCR = require('../../data/usersSeed')

const seeds = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('SEED CONECTADA A LA BBDD ✅')
        await ATM.collection.drop()
        await Cassette.collection.drop()
        await User.collection.drop()
        console.log('SEED ELIMINANDO COLECCIONES ✅')
        await ATM.insertMany(ATMNCR)
        await Cassette.insertMany(cassetesNCR)
        await User.insertMany(usersNCR)
        console.log('SEED INSERTANDO COLECCIONES ✅')
        await mongoose.disconnect()
        console.log('SEED DESCONECTADA DE LA BBDD ❌')
    } catch (error) {
        console.log(error)
    }
}

seeds()
