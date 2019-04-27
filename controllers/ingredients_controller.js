const ingredients = require('../data/preData').ingredients

const verifyParams = (ingredient) => {
  return typeof(ingredient.name) === "undefined" || typeof(ingredient.price) === "undefined"
}

exports.getAll = (req, res, next) => {
  res.send(ingredients)
}

exports.create = (req, res, next) => {
  const newIngredient = req.body

  if(verifyParams(newIngredient)) {
    return res.status(400).send("Neither name or price was informed!")
  }

  if(newIngredient.name in ingredients){
    return res.status(409).send("Ingredient already exists!")
  }

  ingredients[newIngredient.name] = newIngredient.price

  res.status(201).send("Ingredient created Successfully: \n" + JSON.stringify(newIngredient))
}

exports.update = (req, res, next) => {
  const ingredient = req.body

  if(verifyParams(ingredient)) {
    return res.status(400).send("Neither name or price was informed!")
  }
}