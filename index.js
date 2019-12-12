const app = require("express")();
const bodyParser = require("body-parser");
const uniqid = require("uniqid");

const {
  handler
} = require("./handler");

app.use(bodyParser.json());

app.get("/health", (request, response) => {
  response.statusCode = 200;
  response.send();
});

app.post("/run", (request, response) => {

  const task = {
    uid: uniqid(),
    assets: [{
      src: "https://upsaleslab-users.s3.eu-central-1.amazonaws.com/Nature.zip",
      dest: "Nature.zip",
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

  response.send();
});

app.listen(5000);