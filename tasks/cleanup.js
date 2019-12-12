const fs = require('fs')
const path = require('path')

module.exports = (task, options) => {
  return new Promise((resolve, reject) => {
    try {
      options.logger.log(`[${task.uid}]: cleaning up.`)

      const dirs = [
        path.join(__dirname, '/../downloads'),
        path.join(__dirname, '/../resized')
      ]

      dirs.forEach(dir => fs.readdir(dir, (err, files) => {
        if (err) throw err
        files.forEach(file => {
          if (file !== '.gitignore') {
            fs.unlink(path.join(dir, file), err => {
              if (err) throw err
            })
          }
        })
      }))

      resolve(task)
    } catch (err) {
      reject(err)
    }
  })
}
