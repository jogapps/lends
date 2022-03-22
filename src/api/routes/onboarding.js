const express = require("express");
const { registerUser, loginUser } = require("../controllers/UserControllers");
const userRegisterMiddleware = require("../utils/validations/register");
const router = express.Router();

router.post("/register", userRegisterMiddleware, registerUser);
router.post("/login", userRegisterMiddleware, loginUser);

module.exports = router; 