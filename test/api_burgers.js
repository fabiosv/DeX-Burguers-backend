const server = require('../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const validatePost = require('../helpers/validation_methods').validatePost
const validatePut = require('../helpers/validation_methods').validatePut

chai.use(chaiHttp)

describe('API v1.0 Burgers', function(){
  it('/GET/burgers : verify if main burgers are displayed', function(done){
    chai.request(server)
      .get('/api/v1.0/burgers')
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
      .get('/api/v1.0/burgers')
      .set('Authorization', 'some_value')
      .end((err, res) => {
        res.body.should.have.property('X-Bacon').with.lengthOf(3)
        chai.expect(res.body['X-Bacon']).to.includes("Bacon", "Hambúrguer de carne", "Queijo")

        done()
      })
  })

  it('verify if X-Burger is only composed by "Hambúrguer de carne" and "Queijo"', function(done){
    chai.request(server)
      .get('/api/v1.0/burgers')
      .set('Authorization', 'some_value')
      .end((err, res) => {
        res.body.should.have.property('X-Burger').with.lengthOf(2)
        chai.expect(res.body['X-Burger']).to.includes("Hambúrguer de carne", "Queijo")

        done()
      })
  })

  it('verify if X-Egg is only composed by "Ovo", "Hambúrguer de carne" and "Queijo"', function(done){
    chai.request(server)
      .get('/api/v1.0/burgers')
      .set('Authorization', 'some_value')
      .end((err, res) => {
        res.body.should.have.property('X-Egg').with.lengthOf(3)
        chai.expect(res.body['X-Egg']).to.includes("Ovo", "Hambúrguer de carne", "Queijo")

        done()
      })
  })

  it('verify if X-Egg is only composed by "Ovo", "Bacon", "Hambúrguer de carne" and "Queijo"', function(done){
    chai.request(server)
      .get('/api/v1.0/burgers')
      .set('Authorization', 'some_value')
      .end((err, res) => {
        res.body.should.have.property('X-Egg Bacon').with.lengthOf(4)
        chai.expect(res.body['X-Egg Bacon']).to.includes("Ovo", "Bacon", "Hambúrguer de carne", "Queijo")

        done()
      })
  })
})