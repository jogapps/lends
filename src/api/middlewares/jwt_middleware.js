const JWT = require("jsonwebtoken");
const jwtConfig = require("../config/jwt_config");
const { errorMessage } = require("../utils/response/error");

let validateToken = (req, res, next) => {
    let tokenValue = req.headers['authorization'];
    if(tokenValue) {
        JWT.verify(tokenValue, jwtConfig.secret, (error, data) => {
            if (error) return errorMessage(res, "Invalid token found");
            else {
                req.data = data;
                next();
            }
        });
    } else return errorMessage(res, "Token is required");
}

module.exports = {
    checkToken: validateToken
}