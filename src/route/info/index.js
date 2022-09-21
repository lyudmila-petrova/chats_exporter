const CompanyRepository = require('../../dao/company.dao')
const CompanyUsersRepository = require('../../dao/companyUsers.dao')
const infoRoutes = async (fastify) => {
  const companyRepository = CompanyRepository(fastify.mongo.db)
  const companyUsersRepository = CompanyUsersRepository(fastify.mongo.db)

  fastify.get('/company', async (request, reply) => {
    return companyRepository.getAll()
  })

  fastify.get('/company/:companyId/users', async (request, reply) => {
    const { companyId } = request.params

    return companyUsersRepository.getAllUsers(companyId)
  })
}

module.exports = infoRoutes
