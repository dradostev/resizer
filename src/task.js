module.exports = (task, options, fn, fnName) => {
  task.state = `running:${fnName}`;

  if (task.onStart) {
    task.onStart(task, task.state);
  }

  return fn(task, options);
};
