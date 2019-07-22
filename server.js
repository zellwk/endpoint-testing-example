const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const User = require('./models/User')

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routes
app.get('/test', async (req, res) => {
  res.json({ message: 'pass!' })
})

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body
  const user = new User({ name, email, password })
  const ret = await user.save()
  res.json(ret)
})

module.exports = app
