const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.LoginAccount);
router.post("/signup", authController.SignupAccount);

module.exports = router;


