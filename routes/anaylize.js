const { Router } = require("express");
const { caluclateData } = require("../controllers/analyze");

const router = Router();

router.post("/calculate", async (req, res, next) => {
  try {
    const result = await caluclateData(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
