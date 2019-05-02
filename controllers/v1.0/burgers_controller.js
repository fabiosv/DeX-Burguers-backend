const burgers_menu = require('../../data/preData').burgers_menu
const ingredients = require('../../data/preData').ingredients

const paramsOK = (burger) => {
  return typeof(burger.name) === "string" && Array.isArray(burger.ingredients)
}

const handleError = (res, status, errMsg) => {
  return res.status(status).json({error: errMsg})
}

exports.getAll = (req, res, next) => {
  res.send(burgers_menu)
}

exports.create = (req, res, next) => {
  const newBurger = req.body

  if(!paramsOK(newBurger)){
    return handleError(res, 400, "Neither name or ingredients was correct! Name must be a string and ingredients an array.")
  }

  if(newBurger.name in burgers_menu){
    return handleError(res, 409, "Burger already exists!")
  }

  let notIngredint = newBurger.ingredients.filter((ing) => !(ing in ingredients))

  if(notIngredint.length > 0) {
    return handleError(res, 400, `[${notIngredint}] are not valid Ingredient`)
  }

  burgers_menu[newBurger.name] = {ingredients: newBurger.ingredients, image: ''}
  res.status(201).json({name: newBurger.name, ...burgers_menu[newBurger.name]})
}

exports.update = (req, res, next) => {
  const burger = req.body
  let errorMsg = {}

  if(!paramsOK(burger)){
    errorMsg.error = "Neither name or ingredients was correct! Name must be a string and ingredients an array."
    return res.status(400).json(errorMsg)
  }

  if(!(burger.name in burgers_menu)) {
    errorMsg.error = "Burger Not Found!"
    return res.status(404).json(errorMsg)
  }

  let notIngredint = burger.ingredients.filter((ing) => !(ing in ingredients))

  if(notIngredint.length > 0) {
    errorMsg.error = `[${notIngredint}] are not valid Ingredient`
    return res.status(400).json(errorMsg)
  }

  burgers_menu[burger.name].ingredients = burger.ingredients
  return res.json(burgers_menu[burger.name])
}

exports.delete = (req, res, next) => {
  const burger = req.body
  const errorMsg = {}
  console.log(burger)

  if(typeof(burger.name) !== "string"){
    errorMsg.error = "Please inform a name param! It must be a string"
    return res.status(400).send(errorMsg)
  }

  if(burger.name in burgers_menu){
    delete burgers_menu[burger.name]
    return res.json({msg: "Burger Deleted!"})
  }

  return res.status(404).send({error: "Burger Not Found!"})
}