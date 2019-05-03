const burgersModel = require('../data/burgers')
const paramsOK = (burger) => {
  return typeof(burger.name) === "string" && Array.isArray(burger.ingredients)
}

exports.getAll = function(){
  return burgersModel.getAll()
}
