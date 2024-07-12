const { verifyToken } = require('../utils/jwt')
const User = require('../api/models/users')

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(400).json('No estas autorizado, no hay TOKEN')
        }

        const parsedToken = await token.replace('Bearer ', '')
        const { id } = verifyToken(parsedToken)

        const user = await User.findById(id)
        user.password = null
        req.user = user

        next()
    } catch (error) {
        return res.status(400).json('ERROR! No estas autozizado')
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(400).json('No estas autorizado, no hay TOKEN')
        }

        const parsedToken = await token.replace('Bearer ', '')
        const { id } = verifyToken(parsedToken)

        const user = await User.findById(id)

        if (userName === 'salva') {
            user.password = null
            req.user = user
            next()
        } else {
            return res.status(400).json('No eres daniel')
        }
    } catch (error) {
        return res.status(400).json('ERROR! No estas autozizado')
    }
}

module.exports = { isAuth, isAdmin }
