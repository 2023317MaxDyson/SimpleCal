const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.SignupAccount);
router.post("/login", authController.LoginAccount);

module.exports = router;



