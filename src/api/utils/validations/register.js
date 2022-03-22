const joi = require("joi");
const { errorMessage } = require("../response/error");

const userRegisterSchema = joi.object({
     email: joi.string().email().trim(true).required(),
     password: joi.string().min(6).trim(true).required()
});

const userRegisterMiddleware = async (req, res, next) => {
    const payload = {
     email: req.body.email,
     password: req.body.password
    };
   
    const { error } = userRegisterSchema.validate(payload);
    if (error) return errorMessage(res, `Error in User Data : ${error.message}`);
    else next();
   };
   module.exports = userRegisterMiddleware;