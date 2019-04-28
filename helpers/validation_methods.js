const server = require('../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

exports.validatePost = (status, msg, ingredient) => {
  chai.request(server)
  .post('/api/v1.0/ingredients')
  .set('Authorization', 'some_value')
  .send(ingredient)
  .end((err, res) => {
    res.should.have.status(status)
    res.text.should.be.a('string')
    res.text.should.equal(msg)
  })
}

exports.validatePut = (status, msg, ingredient) => {
  chai.request(server)
  .put('/api/v1.0/ingredients')
  .set('Authorization', 'some_value')
  .send(ingredient)
  .end((err, res) => {
    res.should.have.status(status)
    res.text.should.be.a('string')
    res.text.should.equal(msg)
  })
}