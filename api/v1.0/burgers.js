const router = require('express').Router()
const burgers_controller = require('../../controllers/v1.0/burgers_controller')

router.get('/', burgers_controller.getAll)
router.post('/', burgers_controller.create)
router.put('/', burgers_controller.update)
router.delete('/', burgers_controller.delete)

module.exports = router