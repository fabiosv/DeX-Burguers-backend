require('dotenv').config()
require('dotenv').config({path: './.env'})

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./server/config')

const app = express()

app.use(express.static('public'))
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  const help = `
    <pre>
      Welcome to the Food Shop API!
    </pre>
  `
  res.send(help)
})

app.use(require('./secured').authorization)

// require('./server/routes')(app)
app.use('/api', require('./api'))

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})

module.exports = app