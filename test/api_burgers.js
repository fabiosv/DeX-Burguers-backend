const server = require('../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const validatePost = require('../helpers/validation_methods').validatePost
const validatePut = require('../helpers/validation_methods').validatePut

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
        res.body.should.have.property('X-Bacon').with.lengthOf(3)
        chai.expect(res.body['X-Bacon']).to.includes("Bacon", "Hambúrguer de carne", "Queijo")

        done()
      })
  })

  it('verify if X-Burger is only composed by "Hambúrguer de carne" and "Queijo"', function(done){
    chai.request(server)
      .get(API)
      .set('Authorization', 'some_value')
      .end((err, res) => {
        res.body.should.have.property('X-Burger').with.lengthOf(2)
        chai.expect(res.body['X-Burger']).to.includes("Hambúrguer de carne", "Queijo")

        done()
      })
  })

  it('verify if X-Egg is only composed by "Ovo", "Hambúrguer de carne" and "Queijo"', function(done){
    chai.request(server)
      .get(API)
      .set('Authorization', 'some_value')
      .end((err, res) => {
        res.body.should.have.property('X-Egg').with.lengthOf(3)
        chai.expect(res.body['X-Egg']).to.includes("Ovo", "Hambúrguer de carne", "Queijo")

        done()
      })
  })

  it('verify if X-Egg is only composed by "Ovo", "Bacon", "Hambúrguer de carne" and "Queijo"', function(done){
    chai.request(server)
      .get(API)
      .set('Authorization', 'some_value')
      .end((err, res) => {
        res.body.should.have.property('X-Egg Bacon').with.lengthOf(4)
        chai.expect(res.body['X-Egg Bacon']).to.includes("Ovo", "Bacon", "Hambúrguer de carne", "Queijo")

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
        res.text.should.equal('Burger created Successfully: \n{"name":"X-Test","ingredients":["Ovo","Hambúrguer de carne"]}')
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
        chai.expect(res.body['X-Test']).to.includes("Ovo", "Hambúrguer de carne")
        res.body['X-Test'].should.have.lengthOf(2)
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

  it('/PUT/burgers : create new burger called "X-Test" adding "Bacon", should display 204', function(done){
    let burger = {
      name: "X-Test",
      ingredients: ["Ovo", "Hambúrguer de carne", "Bacon"]
    }
    chai.request(server)
      .put(API)
      .set('Authorization', 'some_value')
      .send(burger)
      .end((err, res) => {
        res.should.have.status(204)

        chai.request(server)
          .get(API)
          .set('Authorization', 'some_value')
          .end((err, res) => {
            const burgers = [ 'X-Bacon', 'X-Burger', 'X-Egg', 'X-Egg Bacon', 'X-Test' ]
            res.should.have.status(200)
            res.body.should.be.a('object')
            Object.keys(res.body).should.have.lengthOf(5)
            chai.expect(res.body).to.include.all.keys(burgers)
            chai.expect(res.body['X-Test']).to.includes("Bacon", "Ovo", "Hambúrguer de carne")
            res.body['X-Test'].should.have.lengthOf(3)
          })
      })
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
        res.text.should.equal("Burger Deleted!")
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

    chai.request(server)
      .delete(API)
      .set('Authorization', 'some_value')
      .send(burger)
      .end((err, res) => {
        res.should.have.status(404)
        res.text.should.be.a('string')
        res.text.should.equal("Burger Not Found!")
      })

    done()
  })

  it('/DELETE/burgers : try to delete burger without inform any params, should display 400 - "Please inform a name param! It must be a string"', function(done){
    let burger = {}

    chai.request(server)
      .delete(API)
      .set('Authorization', 'some_value')
      .send(burger)
      .end((err, res) => {
        res.should.have.status(400)
        res.text.should.be.a('string')
        res.text.should.equal("Please inform a name param! It must be a string")
      })

    done()
  })
})