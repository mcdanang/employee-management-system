const db = require("../config/database");

class Employee {
	static async getAll() {
		const query = "SELECT * FROM employees ORDER BY id";
		const { rows } = await db.query(query);
		return rows;
	}

	static async getById(id) {
		const query = "SELECT * FROM employees WHERE id = $1";
		const { rows } = await db.query(query, [id]);
		return rows[0];
	}

	static async create(employee) {
		const query = "INSERT INTO employees (name, position, salary) VALUES ($1, $2, $3) RETURNING *";
		const values = [employee.name, employee.position, employee.salary];
		const { rows } = await db.query(query, values);
		return rows[0];
	}

	static async update(id, employee) {
		const query =
			"UPDATE employees SET name = $1, position = $2, salary = $3 WHERE id = $4 RETURNING *";
		const values = [employee.name, employee.position, employee.salary, id];
		const { rows } = await db.query(query, values);
		return rows[0];
	}

	static async delete(id) {
		const query = "DELETE FROM employees WHERE id = $1 RETURNING *";
		const { rows } = await db.query(query, [id]);
		return rows[0];
	}
}

module.exports = Employee;
