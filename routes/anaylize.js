const { Router } = require("express");
const { calculateData } = require("../controllers/analyze");

const router = Router();

router.post("/calculate", async (req, res, next) => {
  try {
    const result = await calculateData(req.body, req.currentUser);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
