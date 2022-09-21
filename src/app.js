const fastify = require('fastify')

const db = require('./plugin/database')

const rootRoute = require('./route/root')
const infoRoute = require('./route/info')
const exportRoute = require('./route/export')

const build = (options = {}) => {
  /**
   * @type {import('fastify').FastifyInstance} Instance of Fastify
   */
  const app = fastify(options)

  app.register(db)
  app.register(rootRoute)
  app.register(infoRoute, { prefix: 'info' })
  app.register(exportRoute, { prefix: 'export' })

  return app
}

module.exports = build
