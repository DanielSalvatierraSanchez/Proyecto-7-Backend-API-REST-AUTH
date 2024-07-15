const { verifyToken } = require('../utils/jwt')
const User = require('../api/models/users')

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const parsedToken = await token.replace('Bearer ', '')

        const { id } = verifyToken(parsedToken)

        const userAuth = await User.findById(id)
        userAuth.password = null
        req.userAuth = userAuth
        next()
    } catch (error) {
        return res.status(400).json('No estas autozizado. Primero debes de hacer el login.')
    }
}

module.exports = { isAuth }
