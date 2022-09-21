const loadEnvironmentVariable = (envName) => {
  if (process.env[envName]) {
    return process.env[envName]
  }
  throw new Error(`${envName} env does not exist`)
}

module.exports = {
  mongo_uri: loadEnvironmentVariable('MONGO_URI'),
  chats_export_dir: loadEnvironmentVariable('EXPORT_DIR')
}
