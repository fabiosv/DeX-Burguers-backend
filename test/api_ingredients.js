  const server = require('../server')
  const chai = require('chai')
  const chaiHttp = require('chai-http')
  const should = chai.should()

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
        chai.expect(res.body).to.include.all.keys(basicIngredients)
        Object.values(res.body).forEach((ingredient_price) => {
          chai.expect(ingredient_price).to.be.a('number')
        })
        done()
      })
  })


})