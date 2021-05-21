const mongoose = require('mongoose')
const config = require('./index')
const logger = require('../helpers/debug')
const databases = {
  mongoDB() {
    const db = mongoose.connect(config.mongodbUri)
    mongoose.set('debug', !config.isProduction)
    mongoose.connection.on('connected', () => {
      logger.info(`Mongoose default connection is open`)
    })
    return db
  },
  elastic() {},

  redis() {},
}

module.exports = databases
