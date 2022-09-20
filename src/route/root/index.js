const rootRoutes = async (fastify) => {
  fastify.get('/', async (request, reply) => {
    reply.send('OK')
  })
}

module.exports = rootRoutes
