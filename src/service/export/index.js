const fs = require('fs/promises')
const path = require('path')

const { Parser } = require('json2csv')

const config = require('../../config')

const createExportDir = async (relativeDir, baseDir = config.chats_export_dir) => {
  const absoluteDirPath = path.resolve(baseDir, relativeDir)
  await fs.mkdir(absoluteDirPath, { recursive: true })
  return absoluteDirPath
}

const exportToCsv = async (data, filePath) => {
  try {
    const json2csvParser = new Parser()
    const csv = json2csvParser.parse(data)
    await fs.writeFile(filePath, csv)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  exportToCsv,
  createExportDir
}
