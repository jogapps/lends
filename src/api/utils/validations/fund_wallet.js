const joi = require("joi");
const { errorMessage } = require("../response/error");

const fundWalletSchema = joi.object({
    id: joi.string().uuid().trim(true),
    amount: joi.number().positive().required(),
});

const fundWalletMiddleware = async (req, res, next) => {
    const payload = {
        id: req.body.id,
        amount: req.body.amount,
    };

    const { error } = fundWalletSchema.validate(payload);
    if (error) return errorMessage(res, `Error in User Data : ${error.message}`);
    else next();
};
module.exports = fundWalletMiddleware;