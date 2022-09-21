/**
 *
 * @param db - Mongo DB Instance
 */
const companyRepository = (db) => {
  const getAll = async () => {
    const companies = await db.collection('companies')
      .find()
      .toArray()

    return {
      page: 1,
      perPage: companies.length,
      total: companies.length,
      data: companies.map(c => ({
        id: c._id.toString(),
        name: c.name,
        entryName: c.entryName
      }))
    }
  }

  return {
    getAll
  }
}

module.exports = companyRepository
