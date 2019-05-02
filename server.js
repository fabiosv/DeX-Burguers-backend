require('dotenv').config()
require('dotenv').config({path: './.env'})

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./server/config')
const path = require("path")

const app = express()

app.use(express.static('public'))
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
  return res.send(require('./helpers/welcome_api').welcomge_msg)
})

app.get('/public', express.static(path.join(__dirname, "./public")))

app.get("/public/images/:name", (req, res) => {
  return res.sendFile(path.join(__dirname, `./public/images/${req.params.name}`));
})
app.use(require('./secured').authorization)

app.use('/api', require('./api'))

// app.listen(3001, '0.0.0.0', () => {
app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})

module.exports = app