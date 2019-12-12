const glob = require('glob')
const path = require('path')
const sharp = require('sharp')

module.exports = (task, options) => {
  return new Promise((resolve, reject) => {
    options.logger.log(`[${task.uid}]: resizing objects.`)

    glob(path.join(__dirname, '/../downloads/+(*.png|*.jpg|*.jpeg|*.jpe|*.wepb|*.gif)'), null, (err, files) => {
      if (err) reject(err)
      files.forEach(f => {
        const fileName = f.substring(f.lastIndexOf('/') + 1)
        const file = sharp(f)

        if (task.custom) {
          file.resize(task.resize)
        } else {
          file
            .metadata()
            .then(meta => {
              return sharp(f)
                .resize(Math.round(meta.width * task.resize / 100))
                .toFile(path.join(__dirname, '/../resized/', fileName))
            })
        }

        file
          .toFile(path.join(__dirname, '/../resized/', fileName))
          .then(() => resolve(task))
          .catch(err => reject(err))
      })

      options.logger.log(`[${task.uid}]: resized.`)
    })
  })
}
