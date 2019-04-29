const server = require('../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const validatePost = require('../helpers/validation_methods').validatePost

const API = '/api/v1.0/calculate'

chai.use(chaiHttp)

describe('API v1.0 Calculate', function(){
  it('/POST/calculate : verify "X-Bacon" price', function(done){
    let burger = {
      name: "X-Bacon"
    }
    chai.request(server)
      .post(API)
      .set('Authorization', 'some_value')
      .send(burger)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('name').equal('X-Bacon')
        res.body.should.have.property('originalPrice').equal(6.5)
        done()
      })
  })

  it('/POST/calculate : verify "X-Burger" price', function(done){
    let burger = {
      name: "X-Burger"
    }
    chai.request(server)
      .post(API)
      .set('Authorization', 'some_value')
      .send(burger)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('name').equal('X-Burger')
        res.body.should.have.property('originalPrice').equal(4.5)
        done()
      })
  })

  it('/POST/calculate : verify "X-Egg" price', function(done){
    let burger = {
      name: "X-Egg"
    }
    chai.request(server)
      .post(API)
      .set('Authorization', 'some_value')
      .send(burger)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('name').equal('X-Egg')
        res.body.should.have.property('originalPrice').equal(5.3)
        done()
      })
  })

  it('/POST/calculate : verify "X-Egg Bacon" price', function(done){
    let burger = {
      name: "X-Egg Bacon"
    }
    chai.request(server)
      .post(API)
      .set('Authorization', 'some_value')
      .send(burger)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('name').equal('X-Egg Bacon')
        res.body.should.have.property('originalPrice').equal(7.3)
        done()
      })
  })

  it('/POST/calculate : verify "custom" burger price that contains "Alface", "Ovo" and "Queijo"', function(done){
    let burger = {
      name: "custom",
      ingredients: ["Alface", "Ovo", "Queijo"]
    }
    chai.request(server)
      .post(API)
      .set('Authorization', 'some_value')
      .send(burger)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('name').equal('custom')
        res.body.should.have.property('originalPrice').equal(2.7)
        done()
      })
  })

  it('/POST/calculate : verify burger price that it does not exist, should display 404', function(done){
    let burger = {
      name: "X-Test"
    }
    chai.request(server)
      .post(API)
      .set('Authorization', 'some_value')
      .send(burger)
      .end((err, res) => {
        res.should.have.status(404)
        res.text.should.be.a('string')
        res.text.should.equal("Burger Not Found! Are you looking for a 'custom' burger?")
        done()
      })
  })

  it('/POST/calculate : verify "custom" price that contains non existent ingredients, should display 400', function(done){
    let burger = {
      name: "custom",
      ingredients: ["Tomate", "Cebola", "Queijo", "Alface"]
    }
    chai.request(server)
      .post(API)
      .set('Authorization', 'some_value')
      .send(burger)
      .end((err, res) => {
        res.should.have.status(400)
        res.text.should.be.a('string')
        res.text.should.equal("[Tomate,Cebola] are not valid Ingredient")
        done()
      })
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
})