const router = require('express').Router()

router.use('/ingredients', require('./ingredients'))
router.use('/burgers', require('./burgers'))

module.exports = router