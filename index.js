const uniqid = require("uniqid");
const argv = require('yargs').array('images').parse();
const handler = require("./handler");


const task = {
  uid: uniqid(),
  assets: [{
    src: "https://upsaleslab-users.s3.eu-central-1.amazonaws.com/Nature.zip",
    dest: "./downloads/Nature.zip",
    type: "zip"
  }]
}

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