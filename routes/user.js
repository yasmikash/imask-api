const { Router } = require("express");
const { createUser } = require("../controllers/user");

const router = Router();

router.post("/add", async (req, res, next) => {
  console.log(req.body);

  const createdUser = await createUser(req.body);
  res.json(createdUser);
});

module.exports = router;
