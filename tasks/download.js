const fetch = require('node-fetch')
const fs = require('fs')

const download = (task, options, asset) => {
  const dest = './downloads/' + asset.src.substring(asset.src.lastIndexOf('/') + 1)
  return fetch(asset.src)
    .then(res => res.ok ? res : Promise.reject(new Error({
      reason: 'Initial error downloading file',
      meta: { error: res.error }
    })))
    .then(res => {
      const stream = fs.createWriteStream(dest)
      return new Promise((resolve, reject) => {
        const errorHandler = (error) => {
          reject(new Error({
            reason: 'Unable to download file',
            meta: { error }
          }))
        }

        res.body
          .on('error', errorHandler)
          .pipe(stream)

        stream
          .on('error', errorHandler)
          .on('finish', resolve)
      })
    })
}

module.exports = (task, options) => {
  options.logger.log(`[${task.uid}]: downloading started.`)

  const promises = task.assets.map(asset => download(task, options, asset))
  return Promise.all(promises).then(_ => task)
}
