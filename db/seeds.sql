-- create database seeds here
USE team_db;

INSERT INTO department(name)
VALUES ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');
INSERT INTO role(title, salary, department_id)
    VALUES ('Sales Lead', '100000', 1),
        ('Salesperson', '80000', 1),
        ('Lead Engineer', '150000', 2),
        ('Software Engineer', '120000', 2),
        ('Accountant Manager', '160000', 3),
        ('Accountant', '125000', 3),
        ('Legal Team Lead', '250000', 4),
        ('Lawyer', '190000', 4);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES('Tanner', 'Oliver', 1, null),
        ('Brandy', 'Paul', 2, 1),
        ('Andres', 'Barber', 3, 1),
        ('Joe', 'Roberts', 4, null),
        ('Nicolas', 'Goodman', 5, 4),
        ('Lynn', 'Schmidt', 6, 4),
        ('Ethel', 'Bell', 7, 4),
        ('Iris', 'Ramsey', 8, 1),
        ('Jody', 'Bryan', 1, 4),
        ('Marie', 'Leonard', 2, 1),
        ('Alvin', 'Payne', 3, 4);