const fs = require("fs");

const { Router } = require("express");
const { calculateData } = require("../controllers/analyze");

const router = Router();

router.post("/calculate", async (req, res, next) => {
  try {
    const data = JSON.parse(JSON.parse(JSON.stringify(req.body.data)));
    const result = await calculateData(
      data,
      req.files.cough.data,
      req.files.respiratoryRate.data,
      req.files.spo2.data,
      req.files.heartRate.data,
      req.files.temperature.data,
      req.currentUser
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
