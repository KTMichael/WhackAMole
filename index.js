const express = require("express");
const app = express();
app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

app.use(express.static("public"));

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
