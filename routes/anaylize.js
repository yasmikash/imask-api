const { Router } = require("express");
const { calculateData } = require("../controllers/analyze");

const router = Router();

router.post("/calculate", async (req, res, next) => {
  const data = JSON.parse(JSON.parse(JSON.stringify(req.body.data)));
  try {
    const result = await calculateData(
      data,
      req.files.cough.data,
      req.currentUser
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
