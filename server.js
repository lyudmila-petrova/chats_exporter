require('dotenv').config()

const PORT = process.env.PORT || 5000

const server = require('./src/app')({
  logger: {
    level: 'info'
  }
})

const start = async () => {
  try {
    await server.listen({ port: PORT, host: '0.0.0.0' })
  } catch (e) {
    server.log.error(e)

    process.exit(1)
  }
}

start()
