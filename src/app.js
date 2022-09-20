const fastify = require('fastify')

const rootRoute = require('./route/root')

const build = (options = {}) => {
  const app = fastify(options)

  app.register(rootRoute)

  return app
}

module.exports = build
