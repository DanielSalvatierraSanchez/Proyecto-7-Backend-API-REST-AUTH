const { verifyToken } = require("../utils/jwt")
const User = require("../api/models/users")

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const parsedToken = await token.replace('Bearer ', '')

        const { id } = verifyToken(parsedToken)

        const user = await User.findById(id)

        if (user.role === 'admin') {
            user.password = null
            req.user = user
            next()
        } else {
            return res.status(400).json('No puedes hacer la tarea porque no tienes permisos de Admin.')
        }
    } catch (error) {
        return res.status(400).json('No estas autozizado.')
    }
}

module.exports = { isAdmin };