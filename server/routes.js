'use strict'

module.exports = function(app) {
  app.get('/ingredients', (req, res) => {
    const ingredients = require('./data/preData').ingredients

    res.send(ingredients)
  })

  app.get('/sandwiches', (req, res) => {
    const sandwiches = require('./data/preData').sandwiches

    res.send(sandwiches)
  })
}