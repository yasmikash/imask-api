const PORT = process.env.PORT || 5000;
const express = require("express");
const mongoose = require("mongoose");

const userRoute = require("./routes/user");

const app = express();

app.use(express.json());

app.use("/users", userRoute);

app.get("/test", (req, res, next) => {
  res.json({ message: "it works" });
});

main();

async function main() {
  await mongoose.connect(
    "mongodb+srv://imaskuser:imask@cluster0.2hoby.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  app.listen(PORT, () => console.log("APP RUNNING AT PORT " + PORT));
}
