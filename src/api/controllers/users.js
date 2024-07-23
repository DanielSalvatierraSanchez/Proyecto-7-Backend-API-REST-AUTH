const bcrypt = require('bcrypt')
const { generateToken } = require('../../utils/jwt')
const User = require('../models/users')

const registerUser = async (req, res, next) => {
    try {
        const { userName, email } = req.body

        const newUser = new User(req.body)
        const userDuplicated = await User.findOne({ $or: [{ userName }, { email }] })

        if (userDuplicated) {
            return res.status(400).json({ message: 'Nombre de usuario o Email duplicados.' })
        }
        if (newUser.password.length < 8 || newUser.password.length > 16) {
            return res.status(400).json({ message: 'La contraseña debe de tener entre 8 y 16 caracteres.' })
        }
        if (newUser.role === 'admin') {
            return res.status(400).json({ message: 'No tienes permisos para ser Admin.' })
        }

        const userSaved = await newUser.save()
        return res.status(201).json({ message: 'Usuario creado correctamente.', userSaved })
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
                return res.status(200).json({ message: 'LOGIN realizado correctamente.', userLogin, token })
            } else {
                return res.status(400).json({ message: 'El usuario o la contraseña son incorrectos.' })
            }
        } else {
            return res.status(400).json({ message: 'El usuario no existe.' })
        }
    } catch (error) {
        return res.status(400).json('Fallo en loginUser.')
    }
}

const allUsers = async (req, res, next) => {
    try {
        const user = req.user
        if (user.role === 'admin') {
            const allUsers = await User.find().populate('atms', 'cassettes')
            return res.status(200).json({ message: 'Listado completo de usuarios.', allUsers })
        } else {
            const allUsers = await User.find().select('-password')
            if (!allUsers.length) {
                return res.status(404).json({ message: 'No existen usuarios.' })
            }
        return res.status(200).json({ message: 'Listado de usuarios.', allUsers })
    }
} catch (error) {
    return res.status(400).json('Fallo en allUsers')
}
}

const updateUser = async (req, res, next) => {
    try {
        const user = req.user
        const { id } = req.params
        const { atms, userName, email, password, role, ...rest } = req.body
        const allParams = { ...rest }
        if (userName) { allParams.userName = userName }
        if (email) { allParams.email = email }

        if (user._id.toString() !== id && user.role !== 'admin') {
            return res.status(406).json({ message: 'No tienes permisos para actualizar este usuario.' })
        }

        const userDuplicated = await User.findOne({ $or: [{userName}, {email}] })
        if (userDuplicated) {
            return res.status(400).json({ message: 'El usuario o el email ya están en uso.' })
        }

        if (password) {
            if (password.length < 8 || password.length > 16) {
                return res.status(400).json({ message: 'La contraseña debe de tener entre 8 y 16 caracteres.' })
            }
            const newPassword = bcrypt.hashSync(password, 10)
            allParams.password = newPassword
        }

        if (role) {
            if (user.role === 'admin') {
            allParams.role = role
            }
        }

        if (atms) {
            allParams.$addToSet = { atms: atms }
        }

        const userUpdated = await User.findByIdAndUpdate(id, allParams, { new: true })
        return res.status(200).json({ message: 'Datos de usuario actualizados correctamente.', userUpdated })
    } catch (error) {
        return res.status(400).json('Fallo de updateUsers')
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const user = req.user
        const { id } = req.params

        if (user._id.toString() !== id && user.role !== 'admin') {
            return res.status(400).json({ message: 'No tienes permisos para eliminar el usuario.' })
        }

        const userDeleted = await User.findByIdAndDelete(id)
        if (!userDeleted) {
            return res.status(400).json({ message: 'No se ha encontrado ningún usuario.' })
        }
        return res.status(200).json({ message: 'Usuario eliminado.', userDeleted })
    } catch (error) {
        return res.status(400).json('Fallo en deleteUser.')
    }
}

module.exports = { registerUser, loginUser, allUsers, updateUser, deleteUser }
