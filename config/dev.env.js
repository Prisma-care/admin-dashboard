var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PRISMA_API_URL: `"${process.env.PRISMA_API_URL}"`
})
