USE employee_db;

INSERT INTO department (name)
VALUE ("OPS"),
       ("Accountability"),
       ("Technology"),
       ("Teacher");

INSERT INTO role (title, salary, department_id)
VALUE ("OPS Coordinator", 60000, 1),
      ("Attendance Specialist", 50000, 2),
      ("Integrated Systems Developer", 75000, 3),
      ("Science Teacher", 45000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Michelle", "Blackwell", 1, NULL),
      ("Lila", "Kreso", 2, NULL),
      ("Christopher", "Ponzio", 3, NULL),
      ("Sara", "Dill", 4, NULL);