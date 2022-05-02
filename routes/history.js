const { Router } = require("express");
const {
  respiratory,
  cough,
  temperature,
  spo2,
  heartRate,
} = require("../controllers/history");

const router = Router();

router.post("/respiratory", async (req, res, next) => {
  try {
    const result = await respiratory(req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/cough", async (req, res, next) => {
  try {
    const result = await cough(req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/temperature", async (req, res, next) => {
  try {
    const result = await temperature(req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/spo2", async (req, res, next) => {
  try {
    const result = await spo2(req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/heartRate", async (req, res, next) => {
  try {
    const result = await heartRate(req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
