const express = require ("express");
const router = express.Router();
const {welcomeUser, about, login, register, loginUser, registerUser, dashboard,getUserData, uploadProfile} = require("../Controllers/User.Controller");


router.get("/", welcomeUser);
router.get("/about", about);
router.get("/register", register);
router.get("/login", login);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", dashboard);
router.post("/upload", uploadProfile);
// router.get("/getUserData", getUserData);

// router.get('/api/users', async (req, res) => {
    // try {
    //   const user = await userModel.find();
    //   res.json(user); //bhbbbkjhb@gmail.com
    // } catch (err) {
    //   console.error('Error fetching users:', err);
    //   res.status(500).json({ error: 'Internal Server Error' });
    // }
//   });

module.exports = router;