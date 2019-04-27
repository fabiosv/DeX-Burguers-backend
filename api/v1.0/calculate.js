const router = require('express').Router()

router.post('/', (req, res, next) => {
  const ingredients = require('../../data/preData').ingredients

  res.send(ingredients)
})

module.exports = router