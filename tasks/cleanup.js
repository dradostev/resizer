const fs = require('fs')
const path = require('path')

module.exports = (task, options) => {
  return new Promise((resolve, reject) => {
    try {
      options.logger.log(`[${task.uid}]: cleaning up.`)

      const dir = path.join(__dirname, '/../downloads')

      fs.readdir(dir, (err, files) => {
        if (err) {
          options.logger.error(err)
          throw err
        }
        files.forEach(file => {
          if (file !== '.gitignore') {
            fs.unlink(path.join(dir, file), err => {
              if (err) throw err
            })
          }
        })
      })

      resolve(task)
    } catch (err) {
      reject(err)
    }
  })
}
