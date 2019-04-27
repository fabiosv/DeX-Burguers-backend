const router = require('express').Router()

router.get('/', (req, res, next) => {
  const ingredients = require('../../data/preData').ingredients

  res.send(ingredients)
})

router.post('/', (req, res, next) => {
  const ingredients = require('../../data/preData').ingredients

  res.send(ingredients)
})

router.put('/', (req, res, next) => {
  const ingredients = require('../../data/preData').ingredients

  res.send(ingredients)
})

router.delete('/', (req, res, next) => {
  const ingredients = require('../../data/preData').ingredients

  res.send(ingredients)
})

module.exports = router