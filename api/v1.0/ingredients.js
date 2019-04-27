const router = require('express').Router()
const ingredients_controller = require('../../controllers/ingredients_controller')

router.get('/', ingredients_controller.getAll)
router.post('/', ingredients_controller.create)
// router.post('/', (req, res, next) => {
//   const ingredients = require('../../data/preData').ingredients

//   res.send(ingredients)
// })

// router.put('/', (req, res, next) => {
//   const ingredients = require('../../data/preData').ingredients

//   res.send(ingredients)
// })

// router.delete('/', (req, res, next) => {
//   const ingredients = require('../../data/preData').ingredients

//   res.send(ingredients)
// })

module.exports = router