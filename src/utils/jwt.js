const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5d" })
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generateToken, verifyToken };