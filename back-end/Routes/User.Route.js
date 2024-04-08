const express = require ("express");
const router = express.Router();
const {welcomeUser, about, login, register, loginUser, registerUser, dashboard} = require("../Controllers/User.Controller")


router.get("/", welcomeUser);
router.get("/about", about);
router.get("/register", register);
router.get("/login", login);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", dashboard);

router.get('/users', async (req, res) => {
    try {
      const users = await users.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });





module.exports = router;