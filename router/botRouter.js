const express = require('express')
const botController = require('../controllers/botController')
const router = express.Router()

router.get('/', botController.quotes)

module.exports = router