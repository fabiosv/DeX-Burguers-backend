const burgers_menu = require('../../data/preData').burgers_menu
const ingredients = require('../../data/preData').ingredients

const paramsOK = (burger) => {
  if(burger.name === "custom") {
    return Array.isArray(burger.ingredients)
  } else {
    return typeof(burger.name) === "string"
  }
}

const getIngredientsPrice = (ingredients_list) => {
  return ingredients_list.map((ingr) => ingredients[ingr])
}

exports.calculate = (req, res, next) => {
  const burger = req.body
  if(!paramsOK(burger)) {
    return res.status(400).send("Neither name or ingredients was correct! Name must be a string and if 'custom' then ingredients must be an array.")
  }

  if(burger.name === "custom") {
    let notIngredint = burger.ingredients.filter((ing) => !(ing in ingredients))

    if(notIngredint.length > 0) {
      return res.status(400).send(`[${notIngredint}] are not valid Ingredient`)
    }

    let prices = getIngredientsPrice(burger.ingredients)
    let price = prices.reduce((total, num) => total + num)

    return res.status(200).json({name: burger.name, originalPrice: price})
  }

  if(burger.name in burgers_menu){
    let prices = getIngredientsPrice(burgers_menu[burger.name])
    let price = prices.reduce((total, num) => total + num)

    return res.status(200).json({name: burger.name, originalPrice: price})
  }

  return res.status(404).send("Burger Not Found! Are you looking for a 'custom' burger?")
}