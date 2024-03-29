require("dotenv").config();

const PORT = process.env.PORT || 8080;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const locationRoute = require("./routes/location");
const analyzeRoute = require("./routes/anaylize");
const historyRoute = require("./routes/history");
const { authenticateUser } = require("./middlewares/auth");
const fileUpload = require("express-fileupload");

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({ limits: 1024 * 1024 * 50 }));

app.use("/users", userRoute);

app.use("/admins", adminRoute);

app.use("/locations", locationRoute);

app.use("/analyze", authenticateUser("user"), analyzeRoute);

app.use("/history", authenticateUser("user"), historyRoute);

app.get("/test", (req, res) => {
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
