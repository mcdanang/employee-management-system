# Employee Management System

A Node.js and PostgreSQL-based Employee Management System with Docker containerization and Kubernetes deployment capabilities.

## Table of Contents
- [Employee Management System](#employee-management-system)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [API Documentation](#api-documentation)
  - [Author](#author)

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/mcdanang/employee-management-system.git
cd employee-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=employees_db
PORT=3000
```

4. Initialize the database:
```bash
psql -U postgres
CREATE DATABASE employees_db;
\c employees_db
\i scripts/init.sql
```

5. Start the application:
```bash
npm run dev
```

The application will be available at http://localhost:3000


## API Documentation

The application exposes the following endpoints:

- `GET /api/employees` - List all employees
- `POST /api/employees` - Create a new employee
- `GET /api/employees/:id` - Get employee by ID
- `PUT /api/employees/:id` - Update employee by ID
- `DELETE /api/employees/:id` - Delete employee by ID

API documentation is available at:

- [View Postman API Documentation](https://documenter.getpostman.com/view/17491289/2sAY4rE4t8)

## Author
Muhamad Danang Priambodo
- Email: mdanangpriambodo@gmail.com
- Website: https://mcdanang.com/