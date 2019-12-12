const run = require('./task')

const download = require('./tasks/download')
const unpack = require('./tasks/unpack')
const resize = require('./tasks/resize')
const pack = require('./tasks/pack')
const upload = require('./tasks/upload')
const cleanup = require('./tasks/cleanup')

module.exports = (task, options) => {
  return Promise.resolve(task)
    .then(task => run(task, options, download, 'download'))
    .then(task => run(task, options, unpack, 'unpack'))
    .then(task => run(task, options, resize, 'resize'))
    .then(task => run(task, options, pack, 'pack'))
    .then(task => run(task, options, upload, 'upload'))
    .then(task => run(task, options, cleanup, 'cleanup'))
}
