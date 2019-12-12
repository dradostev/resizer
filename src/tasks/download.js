const fetch = require("node-fetch");
const path = require("path");
const fs = require("fs");

const download = (task, options, asset) => {
  return fetch(asset.src)
    .then(res => res.ok ?
      res :
      Promise.reject({
        reason: "Initial error downloading file",
        meta: {
          url,
          error: res.error
        }
      }))
    .then(res => {
      const stream = fs.createWriteStream(asset.dest)
      return new Promise((resolve, reject) => {
        const errorHandler = (error) => {
          reject(new Error({
            reason: "Unable to download file",
            meta: {
              url,
              error
            }
          }))
        }

        res.body
          .on("error", errorHandler)
          .pipe(stream)

        stream
          .on("error", errorHandler)
          .on("finish", resolve);
      })
    });
}

module.exports = (task, options) => {
  options.logger.log(`[${task.uid}]: downloading started.`);

  const promises = task.assets.map(asset => download(task, options, asset))
  return Promise.all(promises).then(_ => task);
}