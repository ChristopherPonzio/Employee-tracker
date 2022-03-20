// Requirements
const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db');


// Initial Function
function init() {
  prompt( [
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "VIEW ALL ROLES",
          vlaue: "VIEW_ROLES"
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        ///
      ]
    }
  ]) .then(res => {
    let choice = res.choice;
    switch(choice) {
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "VIEW ROLES":
        viewRoles();
        break;
    }
  
  })
}
    

           