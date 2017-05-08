const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const server = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/tldrdb')
mongoose.Promise = require('promise')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'db connection error:'))
db.once('open', () => {
  server.listen(process.env.PORT || 3000)
  console.log('DB connected successfully and APP listening at: ' + Date())
})

// Controller files for API and Data Management
const controllers = require('./src/controllers')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

server.use(express.static('dist'))

server.get('/articles', controllers.articles.get)
server.post('/articles', controllers.articles.post)
server.delete('/articles/:id', controllers.articles.del)
server.put('/articles/:id', controllers.articles.upd)

server.get('/sources', controllers.sources.get)
server.get('/topArticles', controllers.topArticles.get)
server.get('/categories', controllers.categories.get)
server.get('/api/:data', controllers.api.get)

server.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

module.exports = server
