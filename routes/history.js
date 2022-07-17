const { Router } = require("express");
const {
  fetchAll,
  fetchCough,
  fetchHeartRate,
  fetchRespiratory,
  fetchSpo2,
  fetchTemperature,
  fetchAnalyzedStatus,
  fetchAnalyzedAll,
  fetchAnalyzedBpm,
  fetchAnalyzedHeartRate,
  fetchAnalyzedSpo2,
  fetchAnalyzedCoughRate,
  fetchAnalyzedTemperature,
} = require("../controllers/history");

const router = Router();

router.post("/all", async (req, res, next) => {
  try {
    const result = await fetchAll(req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/respiratory", async (req, res, next) => {
  try {
    const result = await fetchRespiratory(req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/cough", async (req, res, next) => {
  try {
    const result = await fetchCough(req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/temperature", async (req, res, next) => {
  try {
    const result = await fetchTemperature(req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/spo2", async (req, res, next) => {
  try {
    const result = await fetchSpo2(req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/heartRate", async (req, res, next) => {
  try {
    const result = await fetchHeartRate(req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/analyzedStatus", async (req, res, next) => {
  try {
    const result = await fetchAnalyzedStatus(req.body, req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/analyzedBpm", async (req, res, next) => {
  try {
    const result = await fetchAnalyzedBpm(req.body, req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/analyzedHeartRate", async (req, res, next) => {
  try {
    const result = await fetchAnalyzedHeartRate(req.body, req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/analyzedSpo2", async (req, res, next) => {
  try {
    const result = await fetchAnalyzedSpo2(req.body, req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/analyzedCoughRate", async (req, res, next) => {
  try {
    const result = await fetchAnalyzedCoughRate(req.body, req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/analyzedTemperature", async (req, res, next) => {
  try {
    const result = await fetchAnalyzedTemperature(req.body, req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/analyzedAll", async (req, res, next) => {
  try {
    const result = await fetchAnalyzedAll(req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
