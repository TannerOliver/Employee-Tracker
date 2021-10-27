const inquirer = require('inquirer');
const mysql = require('mysql2');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3001

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'team_db'
    },
    console.log(`Connected to the database`)
);

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
        name: 'addDepartmentAnswer'
    }
];

function viewEmployees() {
    db.query('SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id' , function (err, results) {
        if (results){
            console.table(results);
            init();
        } else {
            console.log(err);
            init();
        };
    })
};

function viewRoles() {
    db.query('SELECT * FROM role' , function (err, results) {
        if (results){
            console.table(results);
            init();
        } else {
            console.log(err);
            init();
        };
    })
};

function viewDepartments() {
    db.query('SELECT * FROM department' , function (err, results) {
        if (results){
            console.table(results);
            init();
        } else {
            console.log(err);
            init();
        };
    })
};

async function addEmployee() {
    let dbQuery4 = await addEmployeeQuery();
    let queryChoices4 = dbQuery4.map(({id, name}) => ({name: name, value: id}));

    let dbQuery5 = await addEmployeeQuery2();
    let queryChoices5 = dbQuery5.map(({id, name}) => ({name: name, value: id}));
    // if manager_id === null then push that employee into a list for ssot of managers

    inquirer.prompt([
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
            choices: queryChoices4, 
            name: 'empRole'
        },
        {
            type: 'list',
            message: "What is the employee's manager?",
            choices: queryChoices5, 
            name: 'empManager'
        }
    ]).then(resp => {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [resp.empFirstName, resp.empLastName, resp.empRole, resp.empManager], (err, results) => {
            if (results){
                console.log('Employee added sucessfully');
                init()
            } else {
                console.log(`Employee couldn't be added`);
                init();
            }
        })
    })
};  //  Add logic for filtering out if a employee is a manager

function addEmployeeQuery() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id, title AS name FROM role`, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
};

function addEmployeeQuery2() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id, manager_id, CONCAT(employee.first_name, ' ', employee.last_name) AS name FROM employee`, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
};

async function updateEmployee() {
    let dbQuery2 = await updateEmployeeQuery();
    let queryChoices2 = dbQuery2.map(({id, name}) => ({name: name, value:id})) 

    let dbQuery3 = await updateEmployeeQuery2();
    let queryChoices3 = dbQuery3.map(({id, name}) => ({name: name, value:id}))

    inquirer.prompt([
        {
            type: 'list',
            message: "Which employee do you want to update?",
            choices: queryChoices2,
            name: 'empName'
        },
        {
            type: 'list',
            message: 'Which role do you want to assign the selected employee?',
            choices: queryChoices3,
            name: 'empRole2'
        }
    ]).then(resp => {
        db.query('UPDATE employee SET role_id = (?)  WHERE id = (?)', [resp.empRole2, resp.empName], (err, results) => {
            if (results){
                console.log('Employee updated sucessfully');
                init();
            } else {
                console.log(`Couldn't update employee`);
                init();
            }
        })
    })
};

function updateEmployeeQuery() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id, CONCAT(employee.first_name, ' ', employee.last_name) AS name FROM employee`, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
};

function updateEmployeeQuery2() {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, title AS name FROM role', (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
};

async function addRole() {
    let dbQuery = await addRoleQuery();
    let queryChoices = dbQuery.map(({id, name}) => ({name: name, value: id}))
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of then role?',
            name: 'roleName'
        },
        {
            type: 'number',
            message: 'What is the salary of the role?',
            name: 'roleSalary'
        },
        {
            type: 'list',
            message: 'What department does the role belong to?',
            choices: queryChoices,
            name: 'roleDepartment'
        }
    ]).then(resp => {
        db.query('INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)', [resp.roleName, resp.roleSalary, resp.roleDepartment], (err, results) => {
            if (results){
                console.log('Role added sucessfully');
                init();
            } else {
                console.log(`Role couldn't be added`);
                init();
            }
        })
    })
};

function addRoleQuery() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM department', (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
};

function addDepartment() {
    inquirer.prompt(addDepQuestion).then(resp => {
        db.query('INSERT INTO department (name) VALUES (?)', resp.addDepartmentAnswer, function(err,results) {
            if(results) {
                console.log('Department added sucessfully!');
                init();
            } else {
                console.log("Department couldn't be added");
                init();
            }
        })
    })
};

function init() {
    inquirer.prompt(initQuestion)
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
        };
    });
};

init();