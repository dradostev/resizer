const state = require("./task");

const download = require("./tasks/download");
const unpack = require("./tasks/unpack");
const resize = require("./tasks/resize");
const pack = require("./tasks/pack");
const upload = require("./tasks/upload");
const cleanup = require("./tasks/cleanup");

const handler = (task, options) => {
  return (
    Promise.resolve(task)
      // .then(task => state(task, options, download, "download"))
      // .then(task => state(task, options, unpack, "unpack"))
      // .then(task => state(task, options, resize, "resize"))
      // .then(task => state(task, options, pack, "pack"))
      // .then(task => state(task, options, upload, "upload"))
      .then(task => state(task, options, cleanup, "cleanup"))
  );
};

module.exports = { handler };
