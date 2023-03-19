const express = require('express')
const router = express.Router()

router.use('/ads', require('./adsRoute'))

module.exports = router