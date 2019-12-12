const uniqid = require('uniqid')
const argv = require('yargs')
  .array('images')
  .boolean('custom')
  .parse()
const handler = require('./handler')

const task = {
  uid: uniqid(),
  assets: [],
  resize: argv.resize,
  custom: argv.custom
}

argv.images.forEach(img => task.assets.push({ src: img }))

const options = {
  logger: console,
  skipCleanUp: false
}

handler(task, options)
  .then(job => {
    console.log('> successfully finished.')
  })
  .catch(err => {
    console.error('> failed.')
    console.error(err)
  })
