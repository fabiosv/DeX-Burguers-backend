const router = require('express').Router()

router.get('/', (req, res, next) => {
  const sandwiches = require('../../data/preData').sandwiches

  res.send(sandwiches)
})

module.exports = router