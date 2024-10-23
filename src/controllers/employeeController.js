const Employee = require("../models/Employee");

const employeeController = {
	async getAllEmployees(req, res) {
		try {
			const employees = await Employee.getAll();
			res.json(employees);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async getEmployeeById(req, res) {
		try {
			const employee = await Employee.getById(req.params.id);
			if (!employee) {
				return res.status(404).json({ message: "Employee not found" });
			}
			res.json(employee);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async createEmployee(req, res) {
		try {
			const employee = await Employee.create(req.body);
			res.status(201).json(employee);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async updateEmployee(req, res) {
		try {
			const employee = await Employee.update(req.params.id, req.body);
			if (!employee) {
				return res.status(404).json({ message: "Employee not found" });
			}
			res.json(employee);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async deleteEmployee(req, res) {
		try {
			const employee = await Employee.delete(req.params.id);
			if (!employee) {
				return res.status(404).json({ message: "Employee not found" });
			}
			res.json({ message: "Employee deleted successfully" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};

module.exports = employeeController;
