const response = (res, status, message, data) => {
	res.json({
		status,
		message,
		data: data
	});
}

module.exports = response;