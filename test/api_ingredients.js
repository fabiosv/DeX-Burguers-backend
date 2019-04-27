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
        Object.keys(res.body).should.have.lengthOf(5);
        chai.expect(res.body).to.include.all.keys(basicIngredients)
        Object.values(res.body).forEach((ingredient_price) => {
          chai.expect(ingredient_price).to.be.a('number')
        })
        done()
      })
  })

  it('/POST/ingredients : try create "Tomate", should display 201 - "Ingredient already exists!"', function(done){
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

  it('/POST/ingredients : try create ingredient without name or price, should display 400 - "Neither name or price was informed!"', function(done){
    const validate = (ingredient) => {
      chai.request(server)
      .post('/api/v1.0/ingredients')
      .set('Authorization', 'some_value')
      .send(ingredient)
      .end((err, res) => {
        res.should.have.status(400)
        res.text.should.be.a('string')
        res.text.should.equal('Neither name or price was informed!')
      })
    }
    validate({})
    validate({name:"Tomate"})
    validate({price:0.50})

    done()
  })

  it('/POST/ingredients : try create "Alface" that already exists, should display 409 - "Ingredient already exists!"', function(done){
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

})