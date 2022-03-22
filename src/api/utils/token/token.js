const JWT = require("jsonwebtoken");
const jwt_config = require("../../config/jwt_config");

exports.generateToken = (userId) => {
    let token = JWT.sign(
        { id: userId },
        jwt_config.secret,
        {});
    return token;
}