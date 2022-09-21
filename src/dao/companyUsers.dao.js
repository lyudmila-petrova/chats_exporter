/**
 *
 * @param db - Mongo DB Instance
 */
const companyUsersRepository = (db) => {
  const getAllUsers = async (companyId) => {
    const users = await db.collection('users')
      .find({ organizationId: companyId })
      .toArray()

    return {
      page: 1,
      perPage: users.length,
      total: users.length,
      data: users.map(u => ({
        id: u._id.toString(),
        email: u.userid,
        fullName: u.name
      }))
    }
  }

  const getUser = async ({ userLogin, companyId = null, companyEntryName = null }) => {
    if (!(companyId || companyEntryName)) {
      throw new Error('Требуется указать компанию пользователя')
    }

    if (!companyId) {
      const company = await db.collection('companies').findOne({ entryName: companyEntryName })
      companyId = company._id.toString()
    }

    return db.collection('users').findOne({
      userid: userLogin,
      organizationId: companyId
    })
  }

  return {
    getAllUsers,
    getUser
  }
}

module.exports = companyUsersRepository
