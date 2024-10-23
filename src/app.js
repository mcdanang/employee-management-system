const express = require("express");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const logger = require("./middleware/logger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
	res.json({ status: "OK" });
});

// API routes
app.use("/api/employees", employeeRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
