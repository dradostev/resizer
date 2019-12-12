const path = require('path')
const glob = require('glob')
const AdmZip = require('adm-zip')

module.exports = (task, options) => {
  return new Promise((resolve, reject) => {
    try {
      options.logger.log(`[${task.uid}]: packing objects back.`)

      glob(path.join(__dirname, '/../resized/+(*.png|*.jpg|*.jpeg|*.jpe|*.wepb|*.gif)'), null, (err, files) => {
        if (err) throw err
        const zip = new AdmZip()
        files.forEach(file => zip.addLocalFile(file))
        zip.writeZip(path.join(__dirname, `/../resized/${task.uid}-RESIZED.zip`))
      })

      options.logger.log(`[${task.uid}]: objects packed.`)

      resolve(task)
    } catch (err) {
      reject(err)
    }
  })
}
