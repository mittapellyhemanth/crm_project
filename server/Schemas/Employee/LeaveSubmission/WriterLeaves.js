const express = require('express');
const createSchema = require('../../../ReFunctions/LeavesSchema'); // Import the schema creation function

const userModel = createSchema('WriterLeaves'); // Create the dynamic model with the name 'User'
// const employeeModel = createSchema('Employee'); // Create another dynamic model with the name 'Employee'
module.exports = userModel