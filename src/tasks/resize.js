module.exports = (task, options) => {
  return new Promise((resolve, reject) => {
    try {
      options.logger.log(`[${task.uid}]: resizing objects.`);
      resolve(task);
    } catch (err) {
      reject(err);
    }
  });
};
