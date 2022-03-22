const knex = require("../config/knex");
const bcrypt = require("bcrypt");
const { errorMessage } = require("../utils/response/error");
const { successMessage } = require("../utils/response/success");
const { generateToken } = require("../utils/token/token");
const { validateUserByEmail } = require("./CommonController");

exports.registerUser = (req, res) => {
    const {email, password} = req.body;
    let newPassword = bcrypt.hashSync(password, 10);
    knex('users').insert({
        email,
        password: newPassword
    })
    .then(createdUser => successMessage(res, "Account created successfully!", {
        ...{ token: generateToken(createdUser.id) },
        }))
    .catch(error => errorMessage(res, `${error.message}`));
}

exports.loginUser = (req, res) => {
    const {email, password} = req.body;
    validateUserByEmail(email)
    .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
            successMessage(res, "User logged in successfully!",
                {
                    ...{ token: generateToken(user.id) },
                    ...user,
                });
        } else {
            errorMessage(res, "Wrong credentials");
        }
    })
    .catch(error => errorMessage(res, `${error.message}`));
}