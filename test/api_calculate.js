const server = require('../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const validatePost = require('../helpers/validation_methods').validatePost
const validatePut = require('../helpers/validation_methods').validatePut
const validatePrice = require('../helpers/validation_methods').validatePrice

const API = '/api/v1.0/calculate'

chai.use(chaiHttp)

describe('API v1.0 Calculate', function(){
  it('/POST/calculate : verify "X-Bacon" price', function(done){
    let burger = {
      name: "X-Bacon"
    }
    validatePrice(API, burger, 6.5, 6.5)

    done()
  })

  it('/POST/calculate : verify "X-Burger" price', function(done){
    let burger = {
      name: "X-Burger"
    }
    validatePrice(API, burger, 4.5, 4.5)

    done()
  })

  it('/POST/calculate : verify "X-Egg" price', function(done){
    let burger = {
      name: "X-Egg"
    }
    validatePrice(API, burger, 5.3, 5.3)

    done()
  })

  it('/POST/calculate : verify "X-Egg Bacon" price', function(done){
    let burger = {
      name: "X-Egg Bacon"
    }
    validatePrice(API, burger, 7.3, 7.3)

    done()
  })

  it('/POST/calculate : verify "custom" burger price that contains "Alface", "Bacon", "Ovo" and "Queijo"', function(done){
    let burger = {
      name: "custom",
      ingredients: ["Alface", "Ovo", "Queijo", "Bacon"]
    }
    validatePrice(API, burger, 4.7, 4.7)

    done()
  })

  it('/POST/calculate : verify burger price that it does not exist, should display 404', function(done){
    let burger = {
      name: "X-Test"
    }

    validatePost(API, 404, "Burger Not Found! Are you looking for a 'custom' burger?", burger)

    done()
  })

  it('/POST/calculate : verify "custom" price that contains non existent ingredients, should display 400', function(done){
    let burger = {
      name: "custom",
      ingredients: ["Tomate", "Cebola", "Queijo", "Alface"]
    }
    validatePost(API, 400, "[Tomate,Cebola] are not valid Ingredient", burger)

    done()
  })

  it('/POST/calculate : validate params, should display 400', function(done){
    const errmsg = "Neither name or ingredients was correct! Name must be a string and if 'custom' then ingredients must be an array."

    validatePost(API, 400, errmsg, {})
    validatePost(API, 400, errmsg, {name: 12})
    validatePost(API, 400, errmsg, {ingredients: []})
    validatePost(API, 400, errmsg, {name: "custom"})
    validatePost(API, 400, errmsg, {name: "custom", ingredients: "Alho"})
    validatePost(API, 400, errmsg, {name: "custom", ingredients: false})

    done()
  })

  it('/POST/calculate : update ingredient price and check burgers price', function(done){
    validatePut('/api/v1.0/ingredients', 200, "", { name: 'Queijo', price: 2.3 })
      .then(validatePrice(API, {name: "X-Bacon"}, 7.3, 7.3))
      .then(validatePut('/api/v1.0/ingredients', 200, "", { name: 'Queijo', price: 1.5 }))
      .then(done())
  })

  it('/POST/calculate : verify "Light" promotion', function(done){
    validatePrice(API, {name: "custom", ingredients: ["Alface", "Ovo", "Queijo"]}, 2.7, 2.43, ["Light"])

    done()
  })

  it('/POST/calculate : verify "Muita carne" promotion', function(done){
    const promo = ["Hambúrguer de carne", "Hambúrguer de carne", "Hambúrguer de carne"]
    validatePrice(API, {name: "custom", ingredients: ["Hambúrguer de carne", "Queijo"]}, 4.5, 4.5, [])
    validatePrice(API, {name: "custom", ingredients: ["Hambúrguer de carne", "Hambúrguer de carne", "Queijo"]}, 7.5, 7.5, [])
    validatePrice(API, {name: "custom", ingredients: [...promo, "Queijo"]}, 10.5, 7.5, ["Muita carne"])
    validatePrice(API, {name: "custom", ingredients: [...promo, "Queijo", "Hambúrguer de carne"]}, 13.5, 10.5, ["Muita carne"])
    validatePrice(API, {name: "custom", ingredients: [...promo, "Queijo", "Hambúrguer de carne", "Hambúrguer de carne"]}, 16.5, 13.5, ["Muita carne"])
    validatePrice(API, {name: "custom", ingredients: [...promo, ...promo, "Queijo"]}, 19.5, 13.5, ["Muita carne"])
    validatePrice(API, {name: "custom", ingredients: [...promo, ...promo, "Queijo", "Hambúrguer de carne"]}, 22.5, 16.5, ["Muita carne"])

    done()
  })

  it('/POST/calculate : verify "Muito queijo" promotion', function(done){
    const promo = ["Queijo", "Queijo", "Queijo"]
    validatePrice(API, {name: "custom", ingredients: ["Hambúrguer de carne", "Queijo"]}, 4.5, 4.5, [])
    validatePrice(API, {name: "custom", ingredients: ["Hambúrguer de carne", "Queijo", "Queijo"]}, 6.0, 6.0, [])
    validatePrice(API, {name: "custom", ingredients: [...promo, "Hambúrguer de carne"]}, 7.5, 6.0, ["Muito queijo"])
    validatePrice(API, {name: "custom", ingredients: [...promo, "Hambúrguer de carne", "Queijo"]}, 9.0, 7.5, ["Muito queijo"])
    validatePrice(API, {name: "custom", ingredients: [...promo, "Hambúrguer de carne", "Queijo", "Queijo"]}, 10.5, 9.0, ["Muito queijo"])
    validatePrice(API, {name: "custom", ingredients: [...promo, ...promo, "Hambúrguer de carne"]}, 12.0, 9.0, ["Muito queijo"])
    validatePrice(API, {name: "custom", ingredients: [...promo, ...promo, "Hambúrguer de carne", "Queijo"]}, 13.5, 10.5, ["Muito queijo"])

    done()
  })

  it('/POST/calculate : verify mix of promotion', function(done){
    const promo1 = ["Queijo", "Queijo", "Queijo"]
    const promo2 = ["Hambúrguer de carne", "Hambúrguer de carne", "Hambúrguer de carne"]
    validatePrice(API, {name: "custom", ingredients: ["Hambúrguer de carne", ...promo1, "Alface"]}, 7.9, 5.61, ["Light", "Muito queijo"])
    validatePrice(API, {name: "custom", ingredients: [...promo2, "Queijo", "Alface"]}, 10.9, 6.81, ["Light", "Muita carne"])
    validatePrice(API, {name: "custom", ingredients: [...promo2, ...promo1, "Alface"]}, 13.9, 8.01, ["Light", "Muita carne", "Muito queijo"])
    validatePrice(API, {name: "custom", ingredients: [...promo2, ...promo1, "Alface", "Bacon"]}, 15.9, 11.4, ["Muita carne", "Muito queijo"])
    validatePrice(API, {name: "custom", ingredients: [...promo2, ...promo1]}, 13.5, 9.0, ["Muita carne", "Muito queijo"])

    done()
  })

  it('/POST/calculate : verify if it calculate if zero ingredients are informed', function(done){
    let burger = {name: "custom", ingredients: []}
    chai.request(server)
      .post(API)
      .set('Authorization', 'some_value')
      .send(burger)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
          res.body.should.have.property('name').equal(burger.name)
          res.body.should.have.property('originalPrice').equal(0)
          res.body.should.have.property('promoPrice').equal(0)
          res.body.should.have.property('promoPrice').equal(0)
          res.body.should.have.property('promotions').with.lengthOf(0)

        done()
      })
  })

})