const express = require("express");
const { fundAccount, withdrawFromAccount, fundAnotherAccount } = require("../controllers/WalletController");
const { checkToken } = require("../middlewares/jwt_middleware");
const fundAnotherWalletMiddleware = require("../utils/validations/fund_another_wallet");
const fundWalletMiddleware = require("../utils/validations/fund_wallet");
const router = express.Router();

router.post("/fund", [checkToken, fundWalletMiddleware], fundAccount);
router.post("/withdraw", [checkToken, fundWalletMiddleware], withdrawFromAccount);
router.post("/fund/user", [checkToken, fundAnotherWalletMiddleware], fundAnotherAccount);


module.exports = router; 