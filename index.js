// Import and require
const {prompt} = require('inquirer');
const db = require('./db');
require('console.table');

// Initial function to run prompts
function runPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        // View
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        // Add
        {
          name: "Add a Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Add a Role",
          value: "ADD_ROLE"
        },
        {
          name: "Add an Employee",
          value: "ADD_EMPLOYEE"
        },
        // Update
        {
          name: "Update an Employee",
          value: "UPDATE_EMPLOYEE"
        },
        {
          name: "QUIT",
          value: "QUIT"
        }
      ]
    }
  ]) .then(res => {
    let choice = res.choice;
        // Call the functions from what the user selects
        switch (choice) {
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "UPDATE_EMPLOYEE":
                updateEmployee();
                break;
            default:
                quit();
    }
  })
}

// View all employees
function viewEmployees() {
  db.allEmployees()
      .then(([rows]) => {
          let employees = rows;
          console.log("\n");
          console.table(employees);
      })
      .then(() => runPrompts());
}

// View all roles
function viewRoles() {
  db.allRoles()
      .then(([rows]) => {
          let roles = rows;
          console.log("\n");
          console.table(roles);
      })
      .then(() => runPrompts());
}

// View all deparments
function viewDepartments() {
  db.allDepartments()
      .then(([rows]) => {
          let departments = rows;
          console.log("\n");
          console.table(departments);
      })
      .then(() => runPrompts());
}

// Add a role
function addRole() {
  db.allDepartments()
      .then(([rows]) => {
          let departments = rows;
          const departmentChoices = departments.map(({ id, name }) => ({
              name: name,
              value: id
          }));

      prompt([
        {
          name: "title",
          message: "What is the name of the role?"
        },
        {
          name: "salary",
          message: "What is the salary rate?"
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does the role fall in under?",
          choices: departmentChoices
        }
    ])
      .then(role => {
        db.addRole(role)
      .then(() => console.log(`Added ${role.title} to the database`))
      .then(() => runPrompts())
    })
  })
}

// Add a department
function addDepartment() {
  prompt([
    {
      name: "name",
      message: "What is the name of the department?"
    }
  ])
  .then(res => {
    let name = res;
    db.addDepartment(name)
  .then(() => console.log(`Added ${name.name} to the database`))
  .then(() => runPrompts())
})
}

// Add an employee
function addEmployee() {
          prompt([
            {
              name: "first_name",
              message: "What's the employee's first name?"
            },
            {
              name: "last_name",
              message: "What's the employee's last name?"
            }
  ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;

       db.allRoles()
          .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
              name: title,
              value: id
          }));
          prompt({
            type: "list",
            name: "roleId",
            message: "What's the employee's role?",
            choices: roleChoices
           })
            .then(res => {
                let roleId = res.roleId;
       db.allEmployees()
          .then(([rows]) => {
            let employees = rows;
            const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                  name: `${first_name} ${last_name}`,
                  value: id
                }));

      managerChoices.unshift({ name: "None", value: null });

          prompt({
            type: "list",
            name: "managerId",
            message: "Who's the employee's manager?",
            choices: managerChoices
          })
          .then(res => {
               let employee = {
                  manager_id: res.managerId,
                  role_id: roleId,
                  first_name: firstName,
                  last_name: lastName
            }

          db.addEmployee(employee);
          })
          .then(() => console.log(`Added ${firstName} ${lastName} to the database`))
          .then(() => runPrompts())
        })
      })
    })
  })
}

// Update an employee's role
function updateEmployee() {
  db.allEmployees()
      .then(([rows]) => {
          let employees = rows;
          const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id
          }));

      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's role do you want to update?",
          choices: employeeChoices
        }
        ])
        .then(res => {
          let employeeId = res.employeeId;
        db.allRoles()
          .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
                  name: title,
                  value: id
}));

        prompt([
          {
            type: "list",
            name: "roleId",
            message: "What is the new role of this employee?",
            choices: roleChoices
          }
        ])
        .then(res => db.updateEmployee(employeeId, res.roleId))
        .then(() => console.log("Employee's role has been updated"))
        .then(() => runPrompts())
      });
  });
})
}
// Quit the application
function quit() {
  process.exit();
}     

runPrompts();
