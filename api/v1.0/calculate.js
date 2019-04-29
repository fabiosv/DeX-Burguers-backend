const router = require('express').Router()
const calculate_controller = require('../../controllers/v1.0/calculate_controller')

router.post('/', calculate_controller.calculate)

module.exports = router