const express = require("express");
const router = express.Router();
const {register, login, update, logout, loggedIn, forgotPassword, resetPassword} = require("../controllers/user.Controller")




router.route("/inscription").post(register);

router.route("/login").post(login);

router.route("/update").post(update);

// router.route("/logout").post(logout);

// router.route("/loggedIn").post(loggedIn);

module.exports = router;
