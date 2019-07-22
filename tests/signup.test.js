/* globals expect it */
const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)

const User = require('../models/User')
const { setupDB } = require('../test-setup')

setupDB('endpoint-testing', true)

it('Should save user to database', async done => {
  const res = await request.post('/signup')
    .send({
      name: 'Zell',
      email: 'testing@gmail.com',
      password: '12345678'
    })

  // Ensures response contains name and email
  expect(res.body.name).toBeTruthy()
  expect(res.body.email).toBeTruthy()

  // Searches the user in the database
  const user = await User.findOne({ email: 'testing@gmail.com' })
  expect(user.name).toBeTruthy()
  expect(user.email).toBeTruthy()

  done()
})
