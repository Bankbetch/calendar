const path = require('path')
require('dotenv').config({ path: `${path.resolve('.')}/.env` })
module.exports = {
  isProduction: process.env.NODE_ENV === 'production',
  mongodbUri: process.env.MONGO_URL,
}
