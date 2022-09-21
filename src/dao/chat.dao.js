/**
 *
 * @param db - Mongo DB Instance
 */
const chatRepository = (db) => {
  const getAllUserRoomIds = async (userId) => {
    const groups = await db.collection('rooms')
      .find(
        {
          users: {
            $elemMatch: {
              id: userId
            }
          }
        },
        { users: 0 }
      )
      .project({ users: 0 })
      .toArray()

    const userChatIds = [...groups.map(x => x._id.toString()), userId]

    return db.collection('histories')
      .distinct(
        'roomID',
        { chatId: { $in: userChatIds } }
      )
  }

  const getAllRoomMessages = async (roomId) => {
    return db.collection('spika_messages')
      .find({ roomID: roomId })
      .sort('created')
      .toArray()
  }

  return {
    getAllUserRoomIds,
    getAllRoomMessages
  }
}

module.exports = chatRepository
