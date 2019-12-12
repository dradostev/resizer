const glob = require('glob')
const path = require('path')
const sharp = require('sharp')

module.exports = (task, options) => {
  return new Promise((resolve, reject) => {
    try {
      options.logger.log(`[${task.uid}]: resizing objects.`)

      setTimeout(() => {
        glob(path.join(__dirname, '/../downloads/+(*.png|*.jpg|*.jpeg)'), null, (err, files) => {
          if (err) throw err
          files.forEach(file => {
            const fileName = file.substring(file.lastIndexOf('/') + 1)
            if (task.custom) {
              return sharp(file)
                .resize(task.resize)
                .toFile(path.join(__dirname, '/../resized/', fileName))
            } else {
              return sharp(file)
                .metadata()
                .then(meta => {
                  return sharp(file)
                    .resize(Math.round(meta.width * task.resize / 100))
                    .toFile(path.join(__dirname, '/../resized/', fileName))
                })
                .catch(err => options.logger.error(err))
            }
          })
        })
      }, 1000)

      options.logger.log(`[${task.uid}]: resized.`)

      resolve(task)
    } catch (err) {
      reject(err)
    }
  })
}
