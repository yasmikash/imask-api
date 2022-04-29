const PORT = process.env.PORT || 5000;
const express = require("express");
const mongoose = require("mongoose");

const userRoute = require("./routes/user");
const analyzeRoute = require("./routes/anaylize");
const { authenticateUser } = require("./middlewares/auth");

const app = express();

app.use(express.json());

app.use("/users", userRoute);

app.use("/analyze", authenticateUser, analyzeRoute);

app.get("/test", (req, res, next) => {
  res.json({ message: "Test Endpoint" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

startServer();

async function startServer() {
  await mongoose.connect(
    "mongodb+srv://imaskuser:imask@cluster0.2hoby.mongodb.net/imask?retryWrites=true&w=majority"
  );
  app.listen(PORT, () => console.log("APP RUNNING AT PORT " + PORT));
}
