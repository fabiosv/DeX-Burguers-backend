exports.ingredients = {
  "Alface":	0.40,
  "Bacon": 2.00,
  "Hambúrguer de carne": 3.00,
  "Ovo": 0.80,
  "Queijo": 1.50,
}

exports.burgers_menu = {
  "X-Bacon":	["Bacon", "Hambúrguer de carne", "Queijo"],
  "X-Burger":	["Hambúrguer de carne", "Queijo"],
  "X-Egg":	["Ovo", "Hambúrguer de carne", "Queijo"],
  "X-Egg Bacon":	["Ovo", "Bacon", "Hambúrguer de carne", "Queijo"],
}

exports.promotions = {
  "Light": {type: "discount", have: "Alface", not_have: "Bacon", discount: 0.1},
  "Muita carne": {type: "quantity", have: {condition: "each", quantity: 3, ingredient: "Hambúrguer de carne"}, charge: 2},
  "Muito queijo": {type: "quantity", have: {condition: "each", quantity: 3, ingredient: "Queijo"}, charge: 2}
}