const path = require('path')
const archiver = require('archiver')
const fs = require('fs')

module.exports = (task, options) => {
  return new Promise((resolve, reject) => {
    options.logger.log(`[${task.uid}]: packing objects back.`)

    const stream = fs.createWriteStream(path.join(__dirname, `/../resized/RESIZED-${task.uid}.zip`))
    const zip = archiver('zip', { zlib: { level: 9 } })

    stream.on('close', () => {
      options.logger.log(`[${task.uid}]: objects packed.`)
      resolve(task)
    })

    stream.on('error', err => reject(err))

    zip.glob('./resized/+(*.png|*.jpg|*.jpeg|*.jpe|*.wepb|*.gif)')
    zip.pipe(stream)
    zip.finalize()
  })
}
