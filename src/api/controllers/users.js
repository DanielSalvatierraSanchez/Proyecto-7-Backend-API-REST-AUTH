const bcrypt = require('bcrypt')
const User = require('../models/users')
const { generateToken } = require('../../utils/jwt')
const ATM = require('../models/atms')

const registerUser = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body
        const newUser = new User(req.body)
        const userDuplicated = await User.findOne({
            $or: [{ userName }, { email }]
        })

        if (userDuplicated) {
            return res.status(400).json('Nombre de usuario o Email duplicados.')
        }
        if (password.length < 8 || password.length > 25) {
            return res
                .status(400)
                .json('La password debe de tener entre 8 y 25 caracteres.')
        }

        const userSaved = await newUser.save()
        return res
            .status(201)
            .json({ message: 'Usuario creado correctamente.', userSaved })
    } catch (error) {
        return res.status(400).json('Fallo en registerUser')
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const userLogin = await User.findOne({ email })

        if (userLogin) {
            if (bcrypt.compareSync(password, userLogin.password)) {
                const token = generateToken(userLogin._id)
                return res.status(200).json({
                    message: 'LOGIN realizado correctamente.',
                    userLogin,
                    token
                })
            } else {
                return res
                    .status(400)
                    .json('El usuario o la contraseña son incorrectos.')
            }
        } else {
            return res.status(400).json('El usuario no existe.')
        }
    } catch (error) {
        return res.status(400).json('Fallo en loginUser.')
    }
}

const allUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find()
            .populate('atms', 'cassettes')
            .select('-password')
        return res
            .status(200)
            .json({ message: 'Listado completo de usuarios.', allUsers })
    } catch (error) {
        return res.status(400).json('Fallo en allUsers')
    }
}

const updateUsers = async (req, res, next) => {
    try {
        const { id } = req.params
        const { atms, ...rest } = req.body
        const allParams = { ...rest }
        if (ATM) {
            allParams.$addtoSet = { atms: atms }
        }
        const userUpdated = await User.findByIdAndUpdate(id, allParams, {
            new: true
        }).select('-password')
        return res.status(200).json({
            message: 'Datos de usuario actualizados correctamente.',
            userUpdated
        })
    } catch (error) {
        return res.status(400).json('Fallo de updateUsers')
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const deleteUser = await User.findByIdAndDelete(id)
        if (!deleteUser) {
            return res.status(400).json('No se que encontrado ningún usuario.')
        }
        return res
            .status(200)
            .json({ message: 'Usuario eliminado.', deleteUser })
    } catch (error) {
        return res.status(400).json('Fallo en deleteUser.')
    }
}

module.exports = { registerUser, loginUser, allUsers, updateUsers, deleteUser }
