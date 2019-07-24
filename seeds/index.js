const fs = require('fs')
const util = require('util')
const readDir = util.promisify(fs.readdir)
const path = require('path')
const mongoose = require('mongoose')

function toTitleCase (str) {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

// Load seeds of all models
async function seedDatabase (runSaveMiddleware = false) {
  const dir = await readDir(__dirname)
  const seedFiles = dir.filter(f => f.endsWith('.seed.js'))

  for (const file of seedFiles) {
    const fileName = file.split('.seed.js')[0]
    const modelName = toTitleCase(fileName)
    const model = mongoose.models[modelName]

    if (!model) throw new Error(`Cannot find Model '${modelName}'`)
    const fileContents = require(path.join(__dirname, file))

    runSaveMiddleware
      ? await model.create(fileContents)
      : await model.insertMany(fileContents)
  }
}

exports.seedDatabase = seedDatabase
