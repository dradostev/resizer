const path = require('path')
const glob = require('glob')
const AdmZip = require('adm-zip')

module.exports = (task, options) => {
  return new Promise((resolve, reject) => {
    try {
      options.logger.log(`[${task.uid}]: unpacking.`)

      glob(path.join(__dirname, '/../downloads/*.zip'), null, (err, files) => {
        if (err) {
          options.logger.error(err)
          throw err
        }
        files.forEach(file => {
          const zip = new AdmZip(file)
          zip.extractAllTo(path.join(__dirname, '/../downloads/'))
        })
      })

      resolve(task)
    } catch (err) {
      reject(err)
    }
  })
}