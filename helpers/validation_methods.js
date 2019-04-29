const server = require('../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

exports.validatePost = (api, status, msg, data) => {
  chai.request(server)
  .post(api)
  .set('Authorization', 'some_value')
  .send(data)
  .end((err, res) => {
    res.should.have.status(status)
    res.text.should.be.a('string')
    res.text.should.equal(msg)
  })
}

exports.validatePut = (api, status, msg, data) => {
  chai.request(server)
  .put(api)
  .set('Authorization', 'some_value')
  .send(data)
  .end((err, res) => {
    res.should.have.status(status)
    res.text.should.be.a('string')
    res.text.should.equal(msg)
  })
}