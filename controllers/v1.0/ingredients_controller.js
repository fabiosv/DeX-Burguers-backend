const ingredients = require('../../data/preData').ingredients

const verifyParams = (ingredient) => {
  return typeof(ingredient.name) === "undefined" || typeof(ingredient.price) === "undefined"
}

const handleError = (res, status, errMsg) => {
  return res.status(status).json({error: errMsg})
}

exports.getAll = (req, res, next) => {
  res.send(ingredients)
}

exports.create = (req, res, next) => {
  const newIngredient = req.body

  if(verifyParams(newIngredient)) {
    return handleError(res, 400, "Neither name or price was informed!")
  }

  if(typeof(newIngredient.price) !== "number"){
    return handleError(res, 400, "Price must be a number!")
  }

  if(newIngredient.price <= 0) {
    return handleError(res, 400, "Price must be higher than zero!")
  }

  if(newIngredient.name in ingredients){
    return handleError(res, 409, "Ingredient already exists!")
  }

  ingredients[newIngredient.name] = newIngredient.price

  res.status(201).json(newIngredient)
}

exports.update = (req, res, next) => {
  const ingredient = req.body

  if(verifyParams(ingredient)) {
    return handleError(res, 400, "Neither name or price was informed!")
  }

  if(typeof(ingredient.price) !== "number"){
    return handleError(res, 400, "Price must be a number!")
  }

  if(ingredient.price <= 0) {
    return handleError(res, 400, "Price must be higher than zero!")
  }

  if(!(ingredient.name in ingredients)) {
    return handleError(res, 404, "Ingredient Not Found!")
  }
  ingredients[ingredient.name] = ingredient.price
  return res.status(200).json(ingredient)
}

exports.delete = (req, res, next) => {
  const ingredient = req.body

  if(typeof(ingredient.name) === "string" && ingredient.name in ingredients){
    delete ingredients[ingredient.name]
    return res.json({msg: "Ingredient Deleted!"})
  }

  return handleError(res, 404, "Ingredient Not Found!")
}
