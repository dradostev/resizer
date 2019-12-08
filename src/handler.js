const run = require("./task");

const download = require("./tasks/download");
const unpack = require("./tasks/unpack");
const resize = require("./tasks/resize");
const pack = require("./tasks/pack");
const upload = require("./tasks/upload");
const cleanup = require("./tasks/cleanup");

const handler = (task, options) => {
  return Promise.resolve(task)
    .then(step => run(step, options, download, "download"))
    .then(step => run(step, options, unpack, "unpack"))
    .then(step => run(step, options, resize, "resize"))
    .then(step => run(step, options, pack, "pack"))
    .then(step => run(step, options, upload, "upload"))
    .then(step => run(step, options, cleanup, "cleanup"));
};

module.exports = { handler };
