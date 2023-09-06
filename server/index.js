const express = require("express");
const app = express();

// route handler: http "get" method, route: "/", response / request objects
app.get("/", (req, res) => {
  res.send({ Hey: "There" });
});

// allow for hosting / deployment on third party platforms
const PORT = process.env.PORT || 5000;

app.listen(PORT);
