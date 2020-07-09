const path = require("path");
const express = require("express");
const secure = require("ssl-express-www");
const expressStaticGzip = require("compression");

const port = process.env.PORT || 4000;
const app = express();

app.use(express.static(`${__dirname}/build`));
app.use(secure);

app.get(
  "*",
  expressStaticGzip(path.join(__dirname), {
    urlContains: "static/",
    fallthrough: false,
    enableBrotli: true,
  })
);

app.listen(port, () => {
  console.log(`Application is running...`);
});
