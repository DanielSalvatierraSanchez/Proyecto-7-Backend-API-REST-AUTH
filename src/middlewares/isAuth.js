const { verifyToken } = require('../utils/jwt')
const User = require('../api/models/users')

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const parsedToken = await token.replace('Bearer ', '')

        const { id } = verifyToken(parsedToken)

        const user = await User.findById(id)
        user.password = null
        req.user = user
        next()
    } catch (error) {
        return res.status(400).json('No estas autozizado. Primero debes de hacer el login.')
    }
}

module.exports = { isAuth }
