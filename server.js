//  GIVEN a command-line application that accepts user input
//      WHEN I start the application
//          THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
//      WHEN I choose to view all departments
//          THEN I am presented with a formatted table showing department names and department ids
//      WHEN I choose to view all roles
//          THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
//      WHEN I choose to view all employees
//          THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
//      WHEN I choose to add a department
//          THEN I am prompted to enter the name of the department and that department is added to the database
//      WHEN I choose to add a role
//          THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
//      WHEN I choose to add an employee
//          THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
//      WHEN I choose to update an employee role
//          THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

//  Packages the read me tells me I will need
//      X   mysql2 package
//      X   inquirer package
//      X   console.table package
//      X   dotenv package

//  Reccomendations From ReadMe
//  Make queries asynchronous
//  Seed Database
//  You might want to use a separate file that contains functions for performing 
//      specific SQL queries you'll need to use. A constructor function or class
//      couldbe helpful for organizing these. You might also want to include a 
//      seeds.sql file to pre-populate your database, making the development of
//      individualfeatures much easier.

// Schema Layouts
        //  Department
            //  id  INT (should be linked to department_id)
            //  name    varchar(30)

        //Role
            //  id  INT (linked to role_id)
            //  title   varchar(30)
            //  salary  decimal
            //  department_id   INT

        //Employee
            //  id  INT
            //first_name    varchar(30)
            //last_name     varchar(30)
            //role_id       INT
            //manager_id    INT (linked to id somehow)

//  Inquirer Questions
        //  View All Employees
            // Brings up a list of all employees with their id, fname, lname, job title, department, salary, and manager unless there is none then manager will be null
        //  Add Employee
            //  This brings up a question asking the first name
            //  Last name
            //  What role they have
            //  Who is their manager
        //  Update Employee Role
            //  This should bring up a list of all employees asking which one they want to select
            //  Then it should ask what role they are switching over to
        //  View All Roles
            //  Brings up list of all roles in company with id title department and salary
                //  Sales Lead, Salesperson, Lead Engineer, Software Engineer, Account Manager, Accountant, Legal Team Lead, Lawyer
        //  Add Roles
            //  This should bring up a new question of what is the name of the role
            //  Then ask what is the salary of this position
            //  Then ask which department this role will be in
        //  View All Departments
            //  Brings up list of all departments with id numbers
        //  Add Department
            //  This will prompt a question of what the department name should be

//  I need to create file structure and basic layout of whole project first
//  Create database we will be working out of
//  Create Seeds.sql for database
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  This will be main js file where everything gets built and put together.

// require packages
//  inquirer
//  