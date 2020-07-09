const path = require("path");
const express = require("express");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.static(`${__dirname}/build`));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Application is running...`);
});
