CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    salary INTEGER NOT NULL
);

-- Add some sample data
INSERT INTO employees (name, position, salary) 
VALUES 
    ('John Doe', 'Software Engineer', 75000),
    ('Jane Smith', 'Product Manager', 85000);