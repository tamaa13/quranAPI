const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

const signToken = (data) => {
    return jwt.sign(data, SECRET_KEY)
}

const verifToken = (payload) => {
    return jwt.verify(payload, SECRET_KEY)
}

module.exports = { signToken, verifToken }