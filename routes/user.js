const { Router } = require("express");
const {
  createUser,
  signUser,
  updateUser,
  getProfile,
  fetchLocations,
  fetchUserCoordinates,
} = require("../controllers/user");
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

router.get("/location", authenticateUser("user"), async (req, res, next) => {
  try {
    const fetchedLocations = await fetchLocations(req.currentUser);
    res.json(fetchedLocations);
  } catch (error) {
    next(error);
  }
});

router.get("/coordinate", authenticateUser("user"), async (req, res, next) => {
  try {
    const fetchedCoordinates = await fetchUserCoordinates(req.currentUser);
    res.json(fetchedCoordinates);
  } catch (error) {
    next(error);
  }
});

router.get("/profile", authenticateUser("user"), async (req, res, next) => {
  try {
    const user = await getProfile(req.currentUser);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/update", authenticateUser("user"), async (req, res, next) => {
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
