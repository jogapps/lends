exports.errorMessage = (res, message) => {
    res.status(500).json({
        status: false,
        message: `${message}`
    });
}

exports.errorServer = (res, message) => {
    this.errorMessage(res,  `Server error! ${message ? message : ""}`);
}
