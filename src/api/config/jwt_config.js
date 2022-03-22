module.exports = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN, 
    notBefore: process.env.JWT_NOT_BEFORE, 
    audience: process.env.AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    algorithm: process.env.JWT_ALGORITHM
}