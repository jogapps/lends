exports.successMessage = (res, message, data) => {
    res.status(200).json({
        status: true,
        message: `${message}`,
        data: data ? data : []
    });
}
