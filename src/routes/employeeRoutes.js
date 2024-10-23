const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const validateEmployee = require("../middleware/validateEmployee");

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.post("/", validateEmployee, employeeController.createEmployee);
router.put("/:id", validateEmployee, employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
