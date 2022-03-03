const express = require("express");
const app = express();
var port = process.env.PORT || 3003;

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
