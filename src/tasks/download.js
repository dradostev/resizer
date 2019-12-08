const axios = require("whatwg-fetch");
const path = require("path");
const fs = require("fs");

module.exports = (task, options) => {
  return new Promise((resolve, reject) => {
    try {
      options.logger.log(`[${task.uid}]: downloading archive.`);
      resolve(task);
    } catch (err) {
      reject(err);
    }
  });
};
