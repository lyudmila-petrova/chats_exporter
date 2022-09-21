const exportService = require('../../service/export')

const CompanyUsersRepository = require('../../dao/companyUsers.dao')
const ChatRepository = require('../../dao/chat.dao')

const exportRoutes = async (fastify) => {
  const companyUsersRepository = CompanyUsersRepository(fastify.mongo.db)
  const chatRepository = ChatRepository(fastify.mongo.db)

  fastify.post('/', async (request, reply) => {
    const { companyEntryName, userLogin } = request.body

    const user = await companyUsersRepository.getUser({ companyEntryName, userLogin })

    if (!user) {
      reply.code(400).send({
        message: 'Пользователь не найден'
      })
    }

    const userId = user._id.toString()

    const userRoomIds = await chatRepository.getAllUserRoomIds(userId)

    const getAllRoomMessages = async (roomId) => {
      const messages = await chatRepository.getAllRoomMessages(roomId)

      return messages.map(x => ({
        createdAt: x.created,
        createdBy: x.userID,
        message: x.message,
        location: x.location,
        file: x.file,
        messageType: x.type,
        senderType: x.senderType
      }))
    }

    const exportDir = await exportService.createExportDir(`${companyEntryName}/${userId}`)

    const tasks = userRoomIds.map(async roomId => {
      const messages = await getAllRoomMessages(roomId)
      const filePath = `${exportDir}/${roomId}.csv`
      await exportService.exportToCsv(messages, filePath)
    })

    await Promise.all(tasks)

    reply.code(201).send({
      message: `Exported ${userRoomIds.length} chats to csv files`
    })
  })
}

module.exports = exportRoutes
