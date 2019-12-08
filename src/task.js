module.exports = (task, options, execute, name) => {
  task.state = `running:${name}`;

  if (task.onStart) {
    task.onStart(task, task.state);
  }

  return execute(task, options);
};
