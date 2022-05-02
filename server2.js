const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload({ limits: 1024 * 1024 * 50 }));

app.post("/upload", (req, res) => {
  console.log(req.files);
});

app.listen(3000, () => console.log("server 2 starting"));
