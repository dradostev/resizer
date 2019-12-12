const path = require('path')
const glob = require('glob')
const AdmZip = require('adm-zip')

module.exports = (task, options) => {
  return new Promise((resolve, reject) => {
    options.logger.log(`[${task.uid}]: unpacking.`)

    glob(path.join(__dirname, '/../downloads/*.zip'), null, (err, files) => {
      if (err) reject(err)
      files.forEach(file => {
        const zip = new AdmZip(file)
        try {
          zip.extractAllTo(path.join(__dirname, '/../downloads/'))
          options.logger.log(`[${task.uid}]: unpacked.`)
          resolve(task)
        } catch (err) {
          reject(err)
        }
      })
    })
  })
}
