/**
 * @type {import('fastify-plugin').FastifyPlugin}
 */
const fastifyPlugin = require('fastify-plugin')

const config = require('../config')

/**
 * Connects to a MongoDB database
 */
async function dbConnector (fastify, options) {
  fastify.register(require('@fastify/mongodb'), {
    forceClose: true,
    url: config.mongo_uri
  })
}

module.exports = fastifyPlugin(dbConnector)
