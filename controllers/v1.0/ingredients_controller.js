const ingredients = require('../../data/preData').ingredients

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

  if(typeof(newIngredient.price) !== "number"){
    return res.status(400).send("Price must be a number!")
  }

  if(newIngredient.price <= 0) {
    return res.status(400).send("Price must be higher than zero!")
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

  if(typeof(ingredient.price) !== "number"){
    return res.status(400).send("Price must be a number!")
  }

  if(ingredient.price <= 0) {
    return res.status(400).send("Price must be higher than zero!")
  }

  if(!(ingredient.name in ingredients)) {
    return res.status(404).send("Ingredient Not Found!")
  }
  ingredients[ingredient.name] = ingredient.price
  return res.status(204).end()
}

exports.delete = (req, res, next) => {
  const ingredient = req.body

  if(typeof(ingredient.name) === "string" && ingredient.name in ingredients){
    delete ingredients[ingredient.name]
    return res.send("Ingredient Deleted!")
  }

  return res.status(404).send("Ingredient Not Found!")
}