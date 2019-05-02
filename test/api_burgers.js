const server = require('../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const validatePost = require('../helpers/validation_methods').validatePost
const validatePut = require('../helpers/validation_methods').validatePut
const validateDelete = require('../helpers/validation_methods').validateDelete

const API = '/api/v1.0/burgers'
chai.use(chaiHttp)

describe('API v1.0 Burgers', function(){
  it('/GET/burgers : verify if main burgers are displayed', function(done){
    chai.request(server)
      .get(API)
      .set('Authorization', 'some_value')
      .end((err, res) => {
        const burgers = [ 'X-Bacon', 'X-Burger', 'X-Egg', 'X-Egg Bacon' ]
        res.should.have.status(200)
        res.body.should.be.a('object')
        Object.keys(res.body).should.have.lengthOf(4);
        chai.expect(res.body).to.include.all.keys(burgers)
        // Object.values(res.body).forEach((ingredient_price) => {
        //   chai.expect(ingredient_price).to.be.a('number')
        // })
        done()
      })
  })

  it('verify if X-Bacon is only composed by "Bacon", "Hambúrguer de carne" and "Queijo"', function(done){
    chai.request(server)
      .get(API)
      .set('Authorization', 'some_value')
      .end((err, res) => {
        res.body.should.have.property('X-Bacon').with.property('ingredients').with.lengthOf(3)
        chai.expect(res.body['X-Bacon'].ingredients).to.includes("Bacon", "Hambúrguer de carne", "Queijo")

        done()
      })
  })

  it('verify if X-Burger is only composed by "Hambúrguer de carne" and "Queijo"', function(done){
    chai.request(server)
      .get(API)
      .set('Authorization', 'some_value')
      .end((err, res) => {
        res.body.should.have.property('X-Burger').with.property('ingredients').with.lengthOf(2)
        chai.expect(res.body['X-Burger'].ingredients).to.includes("Hambúrguer de carne", "Queijo")

        done()
      })
  })

  it('verify if X-Egg is only composed by "Ovo", "Hambúrguer de carne" and "Queijo"', function(done){
    chai.request(server)
      .get(API)
      .set('Authorization', 'some_value')
      .end((err, res) => {
        res.body.should.have.property('X-Egg').with.property('ingredients').with.lengthOf(3)
        chai.expect(res.body['X-Egg'].ingredients).to.includes("Ovo", "Hambúrguer de carne", "Queijo")

        done()
      })
  })

  it('verify if X-Egg is only composed by "Ovo", "Bacon", "Hambúrguer de carne" and "Queijo"', function(done){
    chai.request(server)
      .get(API)
      .set('Authorization', 'some_value')
      .end((err, res) => {
        res.body.should.have.property('X-Egg Bacon').with.property('ingredients').with.lengthOf(4)
        chai.expect(res.body['X-Egg Bacon'].ingredients).to.includes("Ovo", "Bacon", "Hambúrguer de carne", "Queijo")

        done()
      })
  })

  it('/POST/burgers : create new burger called "X-Test" composed by "Ovo" and "Hambúrguer de carne", should display status 201', function(done){
    let burger = {
      name: "X-Test",
      ingredients: ["Ovo", "Hambúrguer de carne"]
    }
    chai.request(server)
      .post(API)
      .set('Authorization', 'some_value')
      .send(burger)
      .end((err, res) => {
        res.should.have.status(201)
        res.text.should.be.a('string')
        console.log(res.body)
        res.body.name.should.equal(burger.name)
        chai.expect(res.body.ingredients).to.includes("Ovo","Hambúrguer de carne")
        res.body.should.have.property('image')
      })
    chai.request(server)
      .get(API)
      .set('Authorization', 'some_value')
      .end((err, res) => {
        const burgers = [ 'X-Bacon', 'X-Burger', 'X-Egg', 'X-Egg Bacon', 'X-Test' ]
        res.should.have.status(200)
        res.body.should.be.a('object')
        Object.keys(res.body).should.have.lengthOf(5)
        chai.expect(res.body).to.include.all.keys(burgers)
        chai.expect(res.body['X-Test'].ingredients).to.includes("Ovo", "Hambúrguer de carne")
        res.body['X-Test'].ingredients.should.have.lengthOf(2)
      })

    done()
  })

  it('/POST/burgers : try to create burger "X-Bacon" that already exists, should display 409 - "Burger already exists!"', function(done){
    let burger = {
      name: 'X-Bacon',
      ingredients: ["Ovo", "Hambúrguer de carne"]
    }
    validatePost(API, 409, "Burger already exists!", burger)

    done()
  })

  it('/POST/burgers : try to create burger and validade params, should display 400 - "Neither name or ingredients was correct! Name must be a string and ingredients an array."', function(done){
    const errmsg = "Neither name or ingredients was correct! Name must be a string and ingredients an array."
    validatePost(API, 400, errmsg, {})
    validatePost(API, 400, errmsg, {name:"X-Fish"})
    validatePost(API, 400, errmsg, {ingredients: 0.50})
    validatePost(API, 400, errmsg, {name:"X-Fish", ingredients: 0.50})
    validatePost(API, 400, errmsg, {name:"X-Fish", ingredients: {}})
    validatePost(API, 400, errmsg, {name: 12, ingredients: []})
    validatePost(API, 400, errmsg, {name: true, ingredients: []})
    validatePost(API, 400, errmsg, {name: "", ingredients: false})

    done()
  })

  it('/POST/burgers : try to create burger with ingredients that not exists, should display 400 - "["Ingredient"] are not valid Ingredient"', function(done){
    validatePost(API, 400, '[Peixe] are not valid Ingredient', {name: "X-Fish", ingredients: ["Peixe", "Ovo", "Bacon"]})

    done()
  })

  it('/PUT/burgers : update burger called "X-Test" adding "Bacon", should display 204', function(done){
    let burger = {
      name: "X-Test",
      ingredients: ["Ovo", "Hambúrguer de carne", "Bacon"]
    }
    chai.request(server)
      .put(API)
      .set('Authorization', 'some_value')
      .send(burger)
      .end((err, res) => {
        res.should.have.status(200)

        chai.request(server)
          .get(API)
          .set('Authorization', 'some_value')
          .end((err, res) => {
            const burgers = [ 'X-Bacon', 'X-Burger', 'X-Egg', 'X-Egg Bacon', 'X-Test' ]
            res.should.have.status(200)
            res.body.should.be.a('object')
            Object.keys(res.body).should.have.lengthOf(5)
            chai.expect(res.body).to.include.all.keys(burgers)
            chai.expect(res.body['X-Test'].ingredients).to.includes("Bacon", "Ovo", "Hambúrguer de carne")
            res.body['X-Test'].ingredients.should.have.lengthOf(3)
          })
      })
    done()
  })

  it('/PUT/burgers : try to update burger with ingredients that not exists, should display 400 - "["Ingredient"] are not valid Ingredient"', function(done){
    validatePut(API, 400, '[Peixe,Molho BBQ] are not valid Ingredient', {name: "X-Test", ingredients: ["Peixe", "Molho BBQ", "Ovo", "Bacon"]})

    done()
  })

  it('/PUT/burgers : try to update burger that not exist, should display 404 - "Burger Not Found!"', function(done){
    validatePut(API, 404, "Burger Not Found!", {name: "X-Pecial", ingredients: []})
    done()
  })

  it('/PUT/burgers : try to update burger "X-Test" and validate params, should display 400 - "Neither name or ingredients was correct! Name must be a string and ingredients an array."', function(done){
    const errmsg = "Neither name or ingredients was correct! Name must be a string and ingredients an array."
    validatePut(API, 400, errmsg, {})
    validatePut(API, 400, errmsg, {name:"X-Test"})
    validatePut(API, 400, errmsg, {ingredients: 0.50})
    validatePut(API, 400, errmsg, {name:"X-Test", ingredients: 0.50})
    validatePut(API, 400, errmsg, {name:"X-Test", ingredients: {}})
    validatePut(API, 400, errmsg, {name: 12, ingredients: []})
    validatePut(API, 400, errmsg, {name: true, ingredients: []})
    validatePut(API, 400, errmsg, {name: "", ingredients: false})

    done()
  })

  it('/PUT/burgers : try to update burger that not exist, should display 404 - "Burger Not Found!"', function(done){
    validatePut(API, 404, "Burger Not Found!", {name: "X-Pecial", ingredients: []})
    done()
  })

  it('/DELETE/burgers : try to delete burger and check if others burgers still there, should display 200 - "Burger Deleted!"', function(done){
    let burger = {
      name: "X-Test"
    }

    chai.request(server)
      .delete(API)
      .set('Authorization', 'some_value')
      .send(burger)
      .end((err, res) => {
        res.should.have.status(200)
        res.text.should.be.a('string')
        res.body.should.have.property('msg')
        res.body.msg.should.equal("Burger Deleted!")
      })

    chai.request(server)
      .get(API)
      .set('Authorization', 'some_value')
      .end((err, res) => {
        const burgers = [ 'X-Bacon', 'X-Burger', 'X-Egg', 'X-Egg Bacon' ]
        res.should.have.status(200)
        res.body.should.be.a('object')
        Object.keys(res.body).should.have.lengthOf(4);
        chai.expect(res.body).to.include.all.keys(burgers)
      })

    done()
  })

  it('/DELETE/burgers : try to delete burger "X-Test" again, should display 404 - "Burger Not Found!"', function(done){
    let burger = {
      name: "X-Test"
    }

    validateDelete(API, 404, "Burger Not Found!", burger)

    done()
  })

  it('/DELETE/burgers : try to delete burger without inform any params, should display 400 - "Please inform a name param! It must be a string"', function(done){
    let burger = {}

    validateDelete(API, 400, "Please inform a name param! It must be a string", burger)

    done()
  })
})