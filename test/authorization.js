const server = require('../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const validatePost = require('../helpers/validation_methods').validatePost
const validatePut = require('../helpers/validation_methods').validatePut
const welcome_msg = require('../helpers/welcome_api').welcomge_msg

chai.use(chaiHttp)

const authorize_msg = "Please provide an Authorization header to identify yourself"

describe('API v1.0 Authorization', function(){
  it('/GET/ : Verify if welcome page is public', function(done){
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        res.text.should.be.a('string')
        res.text.should.equal(welcome_msg)
      })
    done()
  })

  it('/GET-POST-PUT-DELETE/burgers : verify if burgers API is under protection, should display 403 - "Please provide an Authorization header to identify yourself"', function(done){
    chai.request(server)
      .get('/api/v1.0/burgers')
      .end((err, res) => {
        res.should.have.status(403)
        res.body.should.be.a('object')
        res.body['error'].should.equal(authorize_msg)
      })

    let burger = {name: "X-Test", ingredients: []}

    chai.request(server)
      .post('/api/v1.0/burgers')
      .send(burger)
      .end((err, res) => {
        res.should.have.status(403)
        res.body.should.be.a('object')
        res.body['error'].should.equal(authorize_msg)
      })

    chai.request(server)
      .put('/api/v1.0/burgers')
      .send(burger)
      .end((err, res) => {
        res.should.have.status(403)
        res.body.should.be.a('object')
        res.body['error'].should.equal(authorize_msg)
      })

    done()
  })

  it('/GET/ingredients : verify if ingredients API is under protection, should display 403 - "Please provide an Authorization header to identify yourself"', function(done){
    chai.request(server)
    .get('/api/v1.0/ingredients')
    .end((err, res) => {
      res.should.have.status(403)
      res.body.should.be.a('object')
      res.body['error'].should.equal(authorize_msg)
    })

    chai.request(server)
      .post('/api/v1.0/ingredients')
      .send({name: "Tomate", price: 0.10})
      .end((err, res) => {
        res.should.have.status(403)
        res.body.should.be.a('object')
        res.body['error'].should.equal(authorize_msg)
      })

    chai.request(server)
      .put('/api/v1.0/ingredients')
      .send({name: "Alface", price: 0.10})
      .end((err, res) => {
        res.should.have.status(403)
        res.body.should.be.a('object')
        res.body['error'].should.equal(authorize_msg)
      })

    done()
  })
})