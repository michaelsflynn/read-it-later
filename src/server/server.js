// Setup Server
const Express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const server = Express()

// setup Database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/tldrdb')
mongoose.Promise = require('promise')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'db connection error:'))
db.once('open', () => {
  server.listen(process.env.PORT || 3000)
  console.log('DB connected successfully and APP listening at: ' + Date())
})

// Config for Request Handling middleware
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use(Express.static('dist'))

// Controllers/Routes
const controllers = require('./controllers')

// main controller for initial render of html and redux initial state
server.get('/', controllers.handleRender.get)

// api loads Sources and rolls up Categories
server.get('/api/:data', controllers.api.get)

// crud for saved articles
server.get('/articles', controllers.articles.get)
server.post('/articles', controllers.articles.post)
server.delete('/articles/:id', controllers.articles.del)
server.put('/articles/:id', controllers.articles.upd)

module.exports = server
