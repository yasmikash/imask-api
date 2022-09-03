const { Router } = require("express");
const { fetchLocalLocations } = require("../controllers/location");

const router = Router();

router.get("/flagged", async (req, res, next) => {
  try {
    const result = await fetchLocalLocations();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
