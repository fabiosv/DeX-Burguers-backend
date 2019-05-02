const server = require('../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

exports.validatePost = (api, status, msg, data) => {
  return new Promise((resolve, reject) => {
    chai.request(server)
      .post(api)
      .set('Authorization', 'some_value')
      .send(data)
      .end((err, res) => {
        res.should.have.status(status)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.error.should.equal(msg)

        resolve()
      })
  })
}

exports.validatePut = (api, status, msg, data) => {
  return new Promise((resolve, reject) => {
    chai.request(server)
      .put(api)
      .set('Authorization', 'some_value')
      .send(data)
      .end((err, res) => {
        console.log(res.body)
        res.should.have.status(status)
        res.body.should.be.a('object')
        if(msg){
          res.body.should.have.property('error')
          res.body.error.should.equal(msg)
        }
        resolve()
      })
  })
}

exports.validateDelete = (api, status, msg, data) => {
  return new Promise((resolve, reject) => {
    chai.request(server)
      .delete(api)
      .set('Authorization', 'some_value')
      .send(data)
      .end((err, res) => {
        res.should.have.status(status)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.error.should.equal(msg)

        resolve()
      })
    })
}

exports.validatePrice = (api, burger, price, promoPrice, promoApplied = []) => {
  chai.request(server)
    .post(api)
    .set('Authorization', 'some_value')
    .send(burger)
    .end((err, res) => {
      // console.log(res.body)
      res.should.have.status(200)
      res.body.should.be.a('object')
      res.body.should.have.property('name').equal(burger.name)
      res.body.should.have.property('originalPrice').equal(price)
      res.body.should.have.property('promoPrice').equal(promoPrice)
      res.body.should.have.property('promotions').with.lengthOf(promoApplied.length)
      if(promoApplied.length > 0) {
        chai.expect(res.body.promotions).to.includes(...promoApplied)
      }
    })
}