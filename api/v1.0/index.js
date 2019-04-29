const router = require('express').Router()

router.use('/ingredients', require('./ingredients'))
router.use('/burgers', require('./burgers'))
router.use('/calculate', require('./calculate'))

module.exports = router