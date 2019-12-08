module.exports = (task, options) => {
  return new Promise((resolve, reject) => {
    try {
      options.logger.log(`[${task.uid}]: packing objects back.`);
      resolve(task);
    } catch (err) {
      reject(err);
    }
  });
};
