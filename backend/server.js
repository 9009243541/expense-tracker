const app = require("./app");

app.get("/", (req, res) => {
  res.send("done");
});

app.listen(2000, () => {
  console.log("start 2000");
});
