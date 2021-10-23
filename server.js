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
//      X   Seed Database
//  You might want to use a separate file that contains functions for performing 
//      specific SQL queries you'll need to use. A constructor function or class
//      couldbe helpful for organizing these. You might also want to include a 
//      seeds.sql file to pre-populate your database, making the development of
//      individualfeatures much easier.

// Schema Layouts
        //      X   Department
            //      X   id  INT (should be linked to department_id)
            //      X   name    varchar(30)

        //      X   Role
            //      X   id  INT (linked to role_id)
            //      X   title   varchar(30)
            //      X   salary  decimal
            //      X   department_id   INT

        //  X   Employee
            //      X   id  INT
            //  X   first_name    varchar(30)
            //  X   last_name     varchar(30)
            //  X   role_id       INT
            //  X   manager_id    INT (linked to id somehow)

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
const inquirer = require('inquirer');
const mysql = require('mysql2');
const dotenv = require('dotenv').config();
// const express = require('express'); //  I don't think we need express to get this working
const { env } = require('process'); //  Not sure where this came from
// const app = express()   // if express isn't needed I wont need this
const port = process.env.PORT || 3001

// app.use(express.json());    // if express isn't needed I wont need this
// app.use(express.urlencoded({ extended: true }));    // if express isn't needed I wont need this

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'team_db'
    },
    console.log(`Connected to the database`)
);

// initial inquirer question
const initQuestion = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all employees', 'Add an employee', 'Update an employee role', 'View all roles', 'Add a role', 'View all departments', 'Add a department'],
        name: 'initAnswer'
    }
];
const addDepQuestion = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'addDepAns'
    }
];
const addRoleQuestions = [
    {
        type: 'input',
        message: 'What is the name of then role?',
        name: 'roleName'
    },
    {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'roleSalary'
    },
    {
        type: 'list',
        message: 'What department does the role belong to?',
        choices: [''], //I need a way to query whats in the database here.
        name: 'roleDepartment'
    }
];
const addEmpQuestions = [
    {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'empFirstName'
    },
    {
        type: 'input',
        message: "what is the employee's last name?",
        name: 'empLastName'
    },
    {
        type: 'list',
        message: "What is this employee's role?",
        choices: [''], //   I need a way to query current list of roles
        name: 'empRole'
    },
    {
        type: 'list',
        message: "What is the employee's manager?",
        choices: [''], //   I need a way to query database for up to date list of managers
        name: 'empManager'
    }
];
const updateEmpQuestions = [
    {
        type: 'list',
        message: "Which employee's role do you want to update?",
        choices: [''],  //I need a way to query up to date list of emps from database
        name: 'empName'
    },
    {
        type: 'list',
        message: 'Which role do you want to assign the selected employee?',
        choices: [''],  //  I need a way to query database and get up to date list on the roles
        name: 'empRole2'
    }
]

//  Functions
function viewEmployees() {
    //  query database and SELECT employee table then take that data and use console.table to display in console
    db.query('SELECT * FROM employee' , function (err, results) {
        if (results){
            console.table(results)
        } else {
            console.log(err)
        };
        init();
    })
};
function addEmployee() {
    //  prompt addEmp questions
    inquirer.prompt(addEmpQuestions).then(resp => {
        //  query database and INSERT INTO employee VALUE response given from prompt
        init();
    })
};
function updateEmployee() {
    //  prompt upEmp questions
    inquirer.prompt(updateEmpQuestions).then(resp => {
         //  query database and UPDATE employee WHERE that employee is
         init();
    })
};
function viewRoles() {
    //  query database and SELECT * FROM role table then make it visible in console with console.table
    db.query('SELECT * FROM role' , function (err, results) {
        if (results){
            console.table(results)
        } else {
            console.log(err)
        };
        init();
    })
};
function addRole() {
    //  prompt addRole questions
    inquirer.prompt(addRoleQuestions).then(resp => {
        //  query database and INSERT INTO role table what user inputs as new role
        init();
    })
};
function viewDepartments() {
    //  query database and SELECT * from department and use console.table to make visible in console
    db.query('SELECT * FROM department' , function (err, results) {
        if (results){
            console.table(results)
        } else {
            console.log(err)
        };
        init();
    })
};
function addDepartment() {
    //  prompt addDept questions
    inquirer.prompt(addDepQuestion).then(resp => {
        //  query database and INSERT INTO department what user inputs as new department
    init();
    })
};
//  Initializing Function
function init() {
    //  Prompt initial question
    inquirer.prompt(initQuestion)
    // then take that response and if it = one of these run that function if not console.log('that was not a good input)
    .then(resp => {
        if(resp.initAnswer === 'View all employees'){
            viewEmployees();
        }else if(resp.initAnswer === 'Add an employee'){
            addEmployee();
        }else if(resp.initAnswer === 'Update an employee role'){
            updateEmployee();
        }else if(resp.initAnswer === 'View all roles'){
            viewRoles();
        }else if(resp.initAnswer === 'Add a role'){
            addRole();
        }else if(resp.initAnswer === 'View all departments'){
            viewDepartments();
        }else if(resp.initAnswer === 'Add a department'){
            addDepartment();
        } else {
            // Change this to a else if and exit application option so it's not an endless loop
        }
    })
};
init();