const ingredients = {
  "Alface":	0.40,
  "Bacon": 2.00,
  "Hambúrguer de carne": 3.00,
  "Ovo": 0.80,
  "Queijo": 1.50,
}


exports.getAll = ingredients

exports.create = function(ingredient) {
  return new Promise((resolve, reject) => {
    try {
      ingredients[ingredient.name] = ingredient.price
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

exports.update = function(ingredient) {
  return new Promise((resolve, reject) => {
    try {
      ingredients[ingredient.name] = ingredient.price
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

exports.delete = function(ingredient) {
  return new Promise((resolve, reject) => {
    try {
      delete ingredients[ingredient.name]
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}