const { checkPassword } = require('../helper/hash')
const { User } = require('../models')
const { signToken } = require('../helper/jwt')

class userController {
    static async register(req, res, next) {
        const { username, email, password } = req.body
        try {
            const user = await User.create({ username, email, password })
            res.status(201).json(`${user.username} success created`)
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) throw { name: 'Email is required' }
            if (!password) throw { name: 'Password is required' }
            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) throw { name: 'Invalid email or password' }

            const verified = checkPassword(password, user.password)

            if (!verified) throw { name: 'Invalid email or password' }

            const access_token = signToken({
                id: user.id,
                email
            })
            res.status(200).json({ access_token })
        } catch (err) {
            next(err);
        }

    }
}

module.exports = userController