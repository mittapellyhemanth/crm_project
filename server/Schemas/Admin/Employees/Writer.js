const express = require('express');
const createSchema = require('../../../ReFunctions/AddEmployee'); // Import the schema creation function

const userModel = createSchema('Writer'); // Create the dynamic model with the name 'User'
// const employeeModel = createSchema('Employee'); // Create another dynamic model with the name 'Employee'
module.exports = userModel