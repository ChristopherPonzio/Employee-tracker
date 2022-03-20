// Requirements
const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db');
const express = require('express');

// Server
const PORT = process.env.PORT || 3001;
const app = express();

// MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use(express.json());





// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });