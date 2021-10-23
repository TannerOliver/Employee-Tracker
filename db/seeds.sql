-- create database seeds here
USE team_db;

INSERT INTO department(name)
VALUES ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');
INSERT INTO role(title, salary)
    VALUES ('Sales Lead', '100000'),
        ('Salesperson', '80000'),
        ('Lead Engineer', '150000'),
        ('Software Engineer', '120000'),
        ('Accountant Manager', '160000'),
        ('Accountant', '125000'),
        ('Legal Team Lead', '250000'),
        ('Lawyer', '190000');
INSERT INTO employee(first_name, last_name)
    VALUES('Tanner', 'Oliver'),
        ('Brandy', 'Paul'),
        ('Andres', 'Barber'),
        ('Joe', 'Roberts'),
        ('Nicolas', 'Goodman'),
        ('Lynn', 'Schmidt'),
        ('Ethel', 'Bell'),
        ('Iris', 'Ramsey'),
        ('Jody', 'Bryan'),
        ('Marie', 'Leonard'),
        ('Alvin', 'Payne');