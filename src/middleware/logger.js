const logger = (req, res, next) => {
	const start = Date.now();

	res.on("finish", () => {
		const now = new Date().toISOString();
		const elapsedTime = Date.now() - start;
		const logMessage = `${now}: ${req.method} ${req.originalUrl} ${res.statusCode} - ${elapsedTime}ms`;

		// Log the message to the terminal
		console.log(logMessage);
	});

	next();
};

module.exports = logger;
