module.exports = (task, options) => {
  return new Promise((resolve, reject) => {
    try {
      options.logger.log(`[${task.uid}]: cleaning up.`);
      resolve(task);
    } catch (err) {
      reject(err);
    }
  });
};
