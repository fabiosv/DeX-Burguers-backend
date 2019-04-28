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

  if(ingredient.name in ingredients) {
    ingredients[ingredient.name] = ingredient.price
    return res.status(204).end()
  }

  return res.status(404).send("Ingredient Not Found")
}

exports.delete = (req, res, next) => {
  const ingredient = req.body

  if(typeof(ingredient.name) !== "undefined" && ingredient.name in ingredients){
    delete ingredients[ingredient.name]
    return res.send("Ingredient Deleted!")
  }

  return res.status(404).send("Ingredient not found")
}
