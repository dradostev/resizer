const app = require("express")();
const bodyParser = require("body-parser");

const { handler } = require("./handler");

app.use(bodyParser.json());

app.get("/health", (request, response) => {
  response.statusCode = 200;
  response.send();
});

app.post("/run", (request, response) => {
  const res = handler(
    {
      uid: "hc78932kjlfnkjds",
      url: "https://upsaleslab-users.s3.eu-central-1.amazonaws.com/Nature.zip",
      path: "Nature.zip"
    },
    { skipCleanUp: true, logger: console }
  )
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
