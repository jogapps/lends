const express = require("express");
const moment = require("moment");
const { successMessage } = require("../utils/response/success");
const router = express.Router();

// routes
const userRoute = require("./onboarding");
const walletRoute = require("./wallet");


const apiVersion = "1.0.0";

// console log every visited route
router.use((req, res, next) => {
    console.log(`${moment()}: ${req.originalUrl}`);
    next();
});

router.use("/user", userRoute);
router.use("/wallet", walletRoute);

router.get("/", (req, res) => {
    successMessage(res, `Welcome to the Lendsqr API - v${apiVersion}`);
});

module.exports = router; 