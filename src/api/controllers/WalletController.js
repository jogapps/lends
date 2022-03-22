const knex = require("../config/knex");
const { errorMessage } = require("../utils/response/error");
const { successMessage } = require("../utils/response/success");
const { validateUserById, validateUserByEmail } = require("./CommonController");

exports.fundAccount = (req, res) => {
    const { id, amount } = req.body;
    let userId = (id != null && id != undefined) ? id : req.data.id;
    validateUserById(userId)
        .then(user => {
            let currentWallet = Number(amount) + Number(user.wallet);
            knex('users').where("id", userId)
                .update({ wallet: currentWallet })
                .then(walletFunded => successMessage(res, "Account funded successfully!"))
                .catch(error => errorMessage(res, `${error.message}`));
        })
        .catch(error => errorMessage(res, `${error.message}`));
}

exports.withdrawFromAccount = (req, res) => {
    const { id, amount } = req.body;
    let userId = (id != null && id != undefined) ? id : req.data.id;
    validateUserById(userId)
        .then(user => {
            if (Number(amount) > Number(user.wallet)) errorMessage(res, "Insufficient funds");
            else {
                let currentWallet = Number(user.wallet) - Number(amount);
                knex('users').where("id", userId)
                    .update({ wallet: currentWallet })
                    .then(walletFunded => successMessage(res, "Withdrawal processed successfully!"))
                    .catch(error => errorMessage(res, `${error.message}`));
            }
        })
        .catch(error => errorMessage(res, `${error.message}`));
}

exports.fundAnotherAccount = (req, res) => {
    const { id, reciever_email, amount } = req.body;
    let userId = (id != null && id != undefined) ? id : req.data.id;
    validateUserById(userId)
        .then(sender => {
            if (Number(amount) > Number(sender.wallet)) errorMessage(res, "Insufficient funds");
            else {
                validateUserByEmail(reciever_email)
                    .then(receiver => {
                        let senderCurrentWallet = Number(sender.wallet) - Number(amount);
                        let receiverCurrentWallet = Number(receiver.wallet) + Number(amount);
                        knex('users').where("id", sender.id)
                            .update({ wallet: senderCurrentWallet })
                            .then(senderAccountUpdated => {
                                knex('users').where("id", receiver.id)
                                    .update({ wallet: receiverCurrentWallet })
                                    .then(receiverAccountUpdated => {
                                        successMessage(res, "User account funded successfully!")
                                    })
                            })
                            .catch(error => errorMessage(res, `${error}`));
                    })
                    .catch(error => errorMessage(res, `${error}`));
            }
        })
        .catch(error => errorMessage(res, `${error.message}`));
}