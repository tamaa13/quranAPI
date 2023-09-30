const { verifToken } = require('../helper/jwt')
const { User } = require('../models')

const authenticationUser = async (req, res, next) => {
    try {
        const { access_token } = req.headers

        if (!access_token) throw { name: 'InvalidToken' }

        const { id } = verifToken(access_token)

        const user = await User.findByPk(id)

        if (!user) throw { name: 'InvalidToken' }

        req.user = user
        next()
    } catch (err) {
        next(err)
    }
}


module.exports = { authenticationUser }