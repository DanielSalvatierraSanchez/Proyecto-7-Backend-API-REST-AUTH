const bcrypt = require('bcrypt')
const User = require('../models/users')
const { generateToken } = require('../../utils/jwt')

const registerUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body)
        const { userName, email, password } = req.body
        const userDuplicated = await User.findOne({
            $or: [{ userName }, { email }]
        })

        if (userDuplicated) {
            return res.status(400).json('User o Email duplicados.')
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json('La password debe de tener al menos 8 caracteres.')
        }

        const userSaved = await newUser.save()
        return res.status(201).json(userSaved)
    } catch (error) {
        return res.status(400).json('Fallo en registerUser')
    }
}

const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ userName: req.body.userName })

        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = generateToken(user._id)
                return res.status(200).json({ user, token })
            } else {
                return res
                    .status(400)
                    .json('El usuario o la contraseña son incorrectos')
            }
        } else {
            return res
                .status(400)
                .json('El usuario o la contraseña son incorrectos')
        }
    } catch (error) {
        return res.status(400).json('Fallo en loginUser')
    }
}

const allUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find()
        return res.status(200).json(allUsers)
    } catch (error) {
        return res.status(400).json('Fallo en getUsers')
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const deleteUser = await User.findOneAndDelete(id)
        if (!deleteUser) {
            return res
                .status(400)
                .json('No se que encontrado ningun User con ese Email')
        }
        return res
            .status(200)
            .json({ message: 'Usuario eliminado: ', deleteUser })
    } catch (error) {
        return res.status(400).json('Fallo en deleteUser')
    }
}

module.exports = { registerUser, loginUser, allUsers, deleteUser }
