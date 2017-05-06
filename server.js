const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/tldrdb')
mongoose.Promise = require('promise')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'db connection error:'))
db.once('open', () => {
  app.listen(process.env.PORT || 3000)
  console.log('DB connected successfully and APP listening at: ' + Date())
})

// const models = require('./src/models')
const controllers = require('./src/controllers')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/dist', express.static('dist'))

app.get('/articles', controllers.articles.get)
app.post('/articles', controllers.articles.post)
app.delete('/articles/:id', controllers.articles.del)
app.put('/articles/:id', controllers.articles.upd)

app.get('/sources', controllers.sources.get)
app.get('/topArticles', controllers.topArticles.get)
app.get('/categories', controllers.categories.get)
app.get('/api/:data', controllers.api.get)

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

module.exports = app
