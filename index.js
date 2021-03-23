const inquirer = require("inquirer");
var mysql = require("mysql");
require("console.table");
const connection = require("./db/connection.js");

loadQuestions();

async function loadQuestions() {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "View All Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLE",
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]);

  switch (choice) {
    case "VIEW_EMPLOYEES":
      return viewEmployees();
    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
      return viewEmployeesByDepartment();
    case "VIEW_EMPLOYEES_BY_MANAGER":
      return viewEmployeesByManager();
    case "ADD_EMPLOYEE":
      return addEmployee();
    case "REMOVE_EMPLOYEE":
      return removeEmployee();
    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole();
    case "UPDATE_EMPLOYEE_MANAGER":
      return updateEmployeeManager();
    case "VIEW_DEPARTMENTS":
      return viewDepartments();
    case "ADD_DEPARTMENT":
      return addDepartment();
    case "REMOVE_DEPARTMENT":
      return removeDepartment();
    case "VIEW_ROLES":
      return viewRoles();
    case "ADD_ROLE":
      return addRole();
    case "REMOVE_ROLE":
      return removeRole();
    default:
      return quit();
  }
}

async function viewDepartments() {
  connection.query(`SELECT id, name FROM department`, async function (err, data){
    if (err) {
      console.log(err);
    }
    console.table(data);
    loadQuestions();
  });
}

async function addRole() {
  connection.query(`SELECT name, id FROM department`, async function (err, data) {
    if (err) {
      console.log(err);
    }
    const departmentChoices = data.map(({ id, name }) => ({
      name: name,
      value: id
    }));
    const role = await inquirer.prompt([
    { type: "input", message: "Enter new role", name: "title" },
    {
      type: "input",
      message: "What is the salary of this role?",
      name: "salary",
    },
    {
      type: "list",
      message: "What department does this role belong to?",
      name: "department_id",
      choices: departmentChoices,
    },
  ]);
  let addRoleQuery = `INSERT INTO role(title, salary, department_id) VALUES ('${role.title}', '${role.salary}', '${role.department_id}')`;
  connection.query(addRoleQuery, function (err, data) {
    if (err) {
      console.log(err);
    }
  });
  console.log(`Added ${role.title} to the database`);
  loadQuestions();
  });
}

async function addDepartment() {
  const { department } = await inquirer.prompt([
    { type: "input", message: "Enter new department name", name: "department" },
  ]);
  let addDepartmentQuery = `INSERT INTO department(name) VALUES ('${department}')`;
  connection.query(addDepartmentQuery, function (err, data) {
    if (err) {
      console.log(err);
    }
  });
  console.log(`Added ${department} to the database`);
  loadQuestions();
}

async function quit() {
  console.log("Closing appliction");
  process.exit();
}
