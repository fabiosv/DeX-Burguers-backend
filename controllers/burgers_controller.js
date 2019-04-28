const burgers_menu = require('../data/preData').burgers_menu
const ingredients = require('../data/preData').ingredients

const paramsOK = (burger) => {
  return typeof(burger.name) === "string" && typeof(burger.ingredients) === "array"
}

exports.getAll = (req, res, next) => {
  res.send(burgers_menu)
}

exports.create = (req, res, next) => {
  const newBurger = req.body

  if(!paramsOK(newBurger)){
    return res.status(400).send("Neither name or ingredients was correct! Name must be a string and ingredients an array.")
  }
  res.status(201).send("Ingredient created Successfully: \n" + JSON.stringify(newIngredient))
}

exports.update = (req, res, next) => {
  const burger = req.body

  if(!paramsOK(burger)){
    return res.status(400).send("Neither name or ingredients was correct! Name must be a string and ingredients an array.")
  }

  if(!(burger.name in burgers_menu)) {
    return res.status(404).send("Burger Not Found!")
  }

  burgers_menu[burger.name] = burger.ingredients
  return res.status(204).end()
}

exports.delete = (req, res, next) => {
  const burger = req.body

  if(burger.name in ingredients){
    delete burgers_menu[burger.name]
    return res.send("Burger Deleted!")
  }

  return res.status(404).send("Ingredient Not Found!")
}