const express = require('express')
const quranController = require('../controllers/quranController')
const router = express.Router()

router.get('/', quranController.home)
router.get('/mark', quranController.getQuran)
router.delete('/read', quranController.removeQuran)
router.get('/surah', quranController.infoSurah)
router.get('/:id', quranController.detail)
router.get('/sounds/:id', quranController.sounds)
router.post('/read/:id', quranController.addQuran)

module.exports = router