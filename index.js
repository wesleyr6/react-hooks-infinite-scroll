const path = require("path");
const express = require("express");
const secure = require("ssl-express-www");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.static(`${__dirname}/build`));

app.use(secure);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Application is running...`);
});
