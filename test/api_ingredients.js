const server = require('../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const validatePost = require('../helpers/validation_methods').validatePost
const validatePut = require('../helpers/validation_methods').validatePut

chai.use(chaiHttp)

describe('API v1.0 Ingredients', function(){
  it('/GET/ingredients : verify if basic ingredients are displayed, and prices are numbers', function(done){
    chai.request(server)
      .get('/api/v1.0/ingredients')
      .set('Authorization', 'some_value')
      .end((err, res) => {
        const basicIngredients = ['Alface', 'Bacon', 'Hambúrguer de carne', 'Ovo', 'Queijo']
        res.should.have.status(200)
        res.body.should.be.a('object')
        Object.keys(res.body).should.have.lengthOf(5);
        chai.expect(res.body).to.include.all.keys(basicIngredients)
        Object.values(res.body).forEach((ingredient_price) => {
          chai.expect(ingredient_price).to.be.a('number')
        })
        done()
      })
  })

  it('/POST/ingredients : try to create "Tomate", should display 201 - "Ingredient already exists!"', function(done){
    let ingredient = {
      name: "Tomate",
      price: 0.10
    }
    chai.request(server)
      .post('/api/v1.0/ingredients')
      .set('Authorization', 'some_value')
      .send(ingredient)
      .end((err, res) => {
        res.should.have.status(201)
        res.text.should.be.a('string')
        res.text.should.equal('Ingredient created Successfully: \n{"name":"Tomate","price":0.1}')
        done()
      })
  })

  it('/GET/ingredients : verify if "Tomate" was added to ingredients list', function(done){
    chai.request(server)
      .get('/api/v1.0/ingredients')
      .set('Authorization', 'some_value')
      .end((err, res) => {
        const basicIngredients = ['Alface', 'Bacon', 'Hambúrguer de carne', 'Ovo', 'Queijo', 'Tomate']
        res.should.have.status(200)
        res.body.should.be.a('object')
        chai.expect(res.body).to.include.all.keys(basicIngredients)
        Object.values(res.body).forEach((ingredient_price) => {
          chai.expect(ingredient_price).to.be.a('number')
        })
        res.body['Tomate'].should.equal(0.1)
        done()
      })
  })

  it('/POST/ingredients : try to create ingredient without inform name or price, should display 400 - "Neither name or price was informed!"', function(done){
    validatePost(400, 'Neither name or price was informed!', {})
    validatePost(400, 'Neither name or price was informed!', {name:"Tomate"})
    validatePost(400, 'Neither name or price was informed!', {price:0.50})

    done()
  })

  it('/POST/ingredients : try to create ingredient with price different of number, should display 400 - "Price must be a number!"', function(done){
    validatePost(400, 'Price must be a number!', {name:"Tomate", price: "0.50"})
    validatePost(400, 'Price must be a number!', {name:"Tomate", price: ""})
    validatePost(400, 'Price must be a number!', {name:"Tomate", price: true})
    validatePost(400, 'Price must be a number!', {name:"Tomate", price: [0.25]})

    done()
  })

  it('/POST/ingredients : try to create ingredient with price equal or less than zero, should display 400 - "Price must be higher than zero!"', function(done){
    validatePost(400, 'Price must be higher than zero!', {name:"Tomate", price: -204})
    validatePost(400, 'Price must be higher than zero!', {name:"Tomate", price: 0})

    done()
  })

  it('/POST/ingredients : try to create "Alface" that already exists, should display 409 - "Ingredient already exists!"', function(done){
    let ingredient = {
      name: "Alface",
      price: 0.10
    }
    chai.request(server)
      .post('/api/v1.0/ingredients')
      .set('Authorization', 'some_value')
      .send(ingredient)
      .end((err, res) => {
        res.should.have.status(409)
        res.text.should.be.a('string')
        res.text.should.equal('Ingredient already exists!')
        done()
      })
  })

  it('/PUT/ingredients : try to update "Tomate" price, should display 204 and return "Tomate" with updated price on GET', function(done){
    let ingredient = {
      name: "Tomate",
      price: 1.25
    }
    chai.request(server)
      .put('/api/v1.0/ingredients')
      .set('Authorization', 'some_value')
      .send(ingredient)
      .end((err, res) => {
        res.should.have.status(204)

        chai.request(server)
        .get('/api/v1.0/ingredients')
        .set('Authorization', 'some_value')
        .end((err, res) => {
          res.should.have.status(200)
          res.body['Tomate'].should.equal(1.25)
          done()
        })
      })
  })

  it('/PUT/ingredients : try to update ingredient without inform name or price, should display 400 - "Neither name or price was informed!"', function(done){
    validatePut(400, 'Neither name or price was informed!', {})
    validatePut(400, 'Neither name or price was informed!', {name:"Tomate"})
    validatePut(400, 'Neither name or price was informed!', {price:0.50})

    done()
  })

  it('/PUT/ingredients : try to update ingredient with price different of number, should display 400 - "Price must be a number!"', function(done){
    validatePut(400, 'Price must be a number!', {name:"Tomate", price: "0.50"})
    validatePut(400, 'Price must be a number!', {name:"Tomate", price: ""})
    validatePut(400, 'Price must be a number!', {name:"Tomate", price: true})
    validatePut(400, 'Price must be a number!', {name:"Tomate", price: [0.25]})

    done()
  })

  it('/PUT/ingredients : try to update ingredient with price equal or less than zero, should display 400 - "Price must be higher than zero!"', function(done){
    validatePut(400, 'Price must be higher than zero!', {name:"Tomate", price: -204})
    validatePut(400, 'Price must be higher than zero!', {name:"Tomate", price: 0})

    done()
  })

  it('/PUT/ingredients : try to update ingredient that not exist, should display 404 - "Ingredient Not Found!"', function(done){
    validatePut(404, 'Ingredient Not Found!', {name:"Salame", price: 2.5})

    done()
  })

  it('/DELETE/ingredients : try to delete ingredient, should display 200 - "Ingredient Deleted!"', function(done){
    let ingredient = {
      name: "Tomate"
    }

    chai.request(server)
    .delete('/api/v1.0/ingredients')
    .set('Authorization', 'some_value')
    .send(ingredient)
    .end((err, res) => {
      res.should.have.status(200)
      res.text.should.be.a('string')
      res.text.should.equal("Ingredient Deleted!")
    })

    done()
  })

  it('/DELETE/ingredients : try to delete ingredient that not exist, should display 404 - "Ingredient Not Found!"', function(done){
    let ingredient = {
      name: "Salame"
    }

    chai.request(server)
    .delete('/api/v1.0/ingredients')
    .set('Authorization', 'some_value')
    .send(ingredient)
    .end((err, res) => {
      res.should.have.status(404)
      res.text.should.be.a('string')
      res.text.should.equal("Ingredient Not Found!")
    })

    done()
  })

})