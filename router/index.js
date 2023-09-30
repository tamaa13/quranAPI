const express = require('express')
const router = express.Router()
const userRouter = require('../router/userRouter')
const quranRouter = require('../router/quranRouter')
const botRouter = require('../router/botRouter')

const { authenticationUser } = require('../middlewares/authentication')


router.use('/user', userRouter)

router.use(authenticationUser)

router.use('/quran', quranRouter)
router.use('/bot', botRouter)


module.exports = router