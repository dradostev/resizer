const uniqid = require("uniqid");
const argv = require('yargs').array('images').parse();
const handler = require("./handler");

const task = {
  uid: uniqid(),
  assets: [],
  params: {
    by: argv.by,
    kind: argv.kind
  }
}

argv.images.forEach(img => task.assets.push({ src: img }))

const options = {
  logger: console,
  skipCleanUp: false
}

const res = handler(task, options)
  .then(job => {
    console.log("> successfully finished.");
  })
  .catch(err => {
    console.error("> failed.");
    console.error(err);
  });