
const burgers_menu = {
  "X-Bacon":	{
    ingredients: ["Bacon", "Hambúrguer de carne", "Queijo"],
    image: '/public/images/x-bacon.png'
  },
  "X-Burger":	{
    ingredients: ["Hambúrguer de carne", "Queijo"],
    image: '/public/images/x-burger.png'
  },
  "X-Egg": {
    ingredients: ["Ovo", "Hambúrguer de carne", "Queijo"],
    image: '/public/images/x-egg.png'
  },
  "X-Egg Bacon": {
    ingredients: ["Ovo", "Bacon", "Hambúrguer de carne", "Queijo"],
    image: '/public/images/x-egg-bacon.png'
  },
}

exports.getAll = function() {
  return new Promise((res) => {
    res(burgers_menu)
  })
}

exports.get = function(burgerName) {
  return new Promise((res) => {
    res(burgers_menu[burgerName])
  })
}

exports.create = function(burger) {
  return new Promise((resolve, reject) => {
    try {
      if(burger.name in burgers_menu){
        throw "Burger already exists!"
      }
      burgers_menu[burger.name] = {ingredients: burger.ingredients, image: ''}
      resolve(burgers_menu[burger.name])
    } catch (error) {
      reject(error)
    }
  })
}

exports.addImage = function(burgerName, imagePath) {
  return new Promise((resolve, reject) => {
    try {
      burgers_menu[burgerName].image = imagePath
      resolve(burgers_menu[burgerName])
    } catch (error) {
      reject(error)
    }
  })
}

exports.update = function(burger) {
  return new Promise((resolve, reject) => {
    try {
      burgers_menu[burger.name].ingredients = burger.ingredients
      resolve(burgers_menu[burger.name])
    } catch (error) {
      reject(error)
    }
  })
}

exports.delete = function(burger) {
  return new Promise((resolve, reject) => {
    try {
      delete burgers_menu[burger.name]
      resolve(burgers_menu)
    } catch (error) {
      reject(error)
    }
  })
}