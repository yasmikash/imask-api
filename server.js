const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/test", (req, res, next) => {
  res.json({ message: "it works" });
});

app.listen(PORT, () => console.log("app is running on port=" + PORT));
