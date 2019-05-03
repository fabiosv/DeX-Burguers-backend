exports.ingredients = {
  "Alface":	0.40,
  "Bacon": 2.00,
  "Hambúrguer de carne": 3.00,
  "Ovo": 0.80,
  "Queijo": 1.50,
}

exports.burgers_menu = {
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

exports.promotions = {
  "Light": {type: "discount", have: "Alface", not_have: "Bacon", discount: 0.1},
  "Muita carne": {type: "quantity", have: {condition: "each", quantity: 3, ingredient: "Hambúrguer de carne"}, charge: 2},
  "Muito queijo": {type: "quantity", have: {condition: "each", quantity: 3, ingredient: "Queijo"}, charge: 2}
}