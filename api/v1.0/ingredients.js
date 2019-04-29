const router = require('express').Router()
const ingredients_controller = require('../../controllers/v1.0/ingredients_controller')

router.get('/', ingredients_controller.getAll)
router.post('/', ingredients_controller.create)
router.put('/', ingredients_controller.update)
router.delete('/', ingredients_controller.delete)

module.exports = router