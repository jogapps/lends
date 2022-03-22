const joi = require("joi");
const { errorMessage } = require("../response/error");

const fundAnotherWalletSchema = joi.object({
    id: joi.string().uuid().trim(true),
    reciever_email: joi.string().email().trim(true).required(),
    amount: joi.number().positive().required(),
});

const fundAnotherWalletMiddleware = async (req, res, next) => {
    const payload = {
        id: req.body.id,
        reciever_email: req.body.reciever_email,
        amount: req.body.amount,
    };

    const { error } = fundAnotherWalletSchema.validate(payload);
    if (error) return errorMessage(res, `Error in User Data : ${error.message}`);
    else next();
};
module.exports = fundAnotherWalletMiddleware;