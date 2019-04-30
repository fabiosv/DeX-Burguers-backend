const burgers_menu = require('../../data/preData').burgers_menu
const ingredients = require('../../data/preData').ingredients
const promotions = require('../../data/preData').promotions

const paramsOK = (burger) => {
  if(burger.name === "custom") {
    return Array.isArray(burger.ingredients)
  } else {
    return typeof(burger.name) === "string"
  }
}

const getIngredientsPrice = (ingredientsList) => {
  return ingredientsList.map((ingr) => ingredients[ingr]).reduce((total, num) => total + num)
}

const checkPromo = (ingredientsList, originalPrice) => {
  let appliedPromo = {promoPrice:originalPrice, promotions: []}

  Object.keys(promotions).forEach((promotion) => {
    let promo_rule = promotions[promotion]

    if(promo_rule.type === "discount") {
      if(ingredientsList.includes(promo_rule.have) && !ingredientsList.includes(promo_rule.not_have)) {
        appliedPromo.promotions.push(promotion)
        appliedPromo.promoPrice -= (appliedPromo.promoPrice * promo_rule.discount)
      }
    }

    if(promo_rule.type === "quantity") {
      let actual_quantity = ingredientsList.filter((ingr) => ingr === promo_rule.have.ingredient).length
      if(actual_quantity >= promo_rule.have.quantity) {
        let ingredient_price = ingredients[promo_rule.have.ingredient]

        // find how many of ingredient will be charged
        let charge = Math.trunc(actual_quantity / promo_rule.have.quantity) * promo_rule.charge
        charge += actual_quantity % promo_rule.have.quantity

        appliedPromo.promotions.push(promotion)
        appliedPromo.promoPrice -= actual_quantity * ingredient_price    // remove ingredients from price
        appliedPromo.promoPrice += charge * ingredient_price             // apply promo to the price
        appliedPromo.promoPrice = appliedPromo.promoPrice.toFixed(2) * 1 // convert string to number
      }
    }
  })

  return appliedPromo
}

exports.calculate = (req, res, next) => {
  const burger = req.body
  let ingredientsList = []
  if(!paramsOK(burger)) {
    return res.status(400).send("Neither name or ingredients was correct! Name must be a string and if 'custom' then ingredients must be an array.")
  }

  if(!(burger.name in burgers_menu) && burger.name !== "custom") {
    return res.status(404).send("Burger Not Found! Are you looking for a 'custom' burger?")
  }

  if(burger.name === "custom") {
    let notIngredint = burger.ingredients.filter((ing) => !(ing in ingredients))

    if(notIngredint.length > 0) {
      return res.status(400).send(`[${notIngredint}] are not valid Ingredient`)
    }

    ingredientsList = burger.ingredients
  }

  if(burger.name in burgers_menu){
    ingredientsList = burgers_menu[burger.name].ingredients
  }

  let price = getIngredientsPrice(ingredientsList)

  let promo = checkPromo(ingredientsList, price)

  return res.status(200).json({name: burger.name, originalPrice: price, ...promo})
}