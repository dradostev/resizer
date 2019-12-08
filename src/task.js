module.exports = (step, options, execute, name) => {
  step.state = `running:${name}`;

  if (step.onStart) {
    step.onStart(step, step.state);
  }

  return execute(step, options);
};
