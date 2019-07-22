const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
})

// Hashes password automatically
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword
})

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
