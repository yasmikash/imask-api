const { Router } = require("express");
const {
  createUser,
  signUser,
  flagLocation,
  getProfile,
  fetchFlaggedLocations,
} = require("../controllers/admin");
const { authenticateUser } = require("../middlewares/auth");

const router = Router();

router.post("/add", authenticateUser("admin"), async (req, res, next) => {
  try {
    const createdUser = await createUser(req.body);
    res.json(createdUser);
  } catch (error) {
    next(error);
  }
});

router.get("/profile", authenticateUser("admin"), async (req, res, next) => {
  try {
    const user = await getProfile(req.currentUser);
    res.json(user);
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

router.post(
  "/flag-location",
  authenticateUser("admin"),
  async (req, res, next) => {
    try {
      const flaggedLocations = await flagLocation(req.body, req.currentUser);
      res.json(flaggedLocations);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/flag-location",
  authenticateUser("admin"),
  async (req, res, next) => {
    try {
      const flaggedLocations = await fetchFlaggedLocations();
      res.json(flaggedLocations);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
