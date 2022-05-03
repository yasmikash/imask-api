const { Router } = require("express");
const { createUser, signUser, updateUser } = require("../controllers/user");
const { authenticateUser } = require("../middlewares/auth");

const router = Router();

router.post("/add", async (req, res, next) => {
  try {
    const createdUser = await createUser(req.body);
    res.json(createdUser);
  } catch (error) {
    next(error);
  }
});

router.put("/update", authenticateUser, async (req, res, next) => {
  try {
    const updatedUser = await updateUser(req.body, req.currentUser);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.post("/signIn", async (req, res, next) => {
  try {
    const token = await signUser(req.body);
    res.json(token);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
