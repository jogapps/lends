const knex = require("../config/knex");

exports.validateUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        if (!email) reject(new Error("Enter required fields!"));
        knex('users').where({
            email: email
          }).first()
            .then(user => {
                if (user) resolve(user);
                else reject(new Error("Invalid User!"));
            })
            .catch(error => {
                reject(new Error("Server Error!"));
            })
    });
}

exports.validateUserById = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) reject(new Error("Enter required fields!"));
        knex('users').where({
            id: id
          }).first()
            .then(user => {
                if (user) resolve(user);
                else reject(new Error("Invalid User!"));
            })
            .catch(error => {
                reject(new Error("Server Error!"));
            })
    });
}

