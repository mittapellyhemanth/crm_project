const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");
require("dotenv").config();
const app = express();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
// app.use(express.static("uploads"));

app.use(bodyParser.json());


app.use(cors());
app.use(express.urlencoded({ extended: true }));


//Routers  
const userRouter = require('./Routers/Register/Register');
const employeeRouter = require('./Routers/Employee/EmployeeRouter');
const AdminRouter = require('./Routers/Admin/AdminRouter');
const SuperAdmin = require('./Routers/SuperAdmin/SuperAdmin')
const Imgpost = require('./Routers/Employee/DesignerProjectSubmit')
const AdminProjectFilter = require('./Routers/Admin/AdminFilters')
const getClient = require('./Routers/Admin/ClientDetails')
const leaveTracker = require('./Routers/Employee/LeavesRouter')

const port = process.env.PORT;
const URL = process.env.DB_URL;


app.use('/leave',leaveTracker);
app.use('/client',getClient);
app.use('/filter',AdminProjectFilter);
app.use("/designer",Imgpost);
app.use("/user",userRouter); // Login Router
app.use("/employee",employeeRouter); // Employee Router
app.use("/admin",AdminRouter); // Admin Router
app.use("/superAdmin",SuperAdmin)










app.use(express.static("uploads"));







app.listen(process.env.PORT, () => console.log('Server connected on port', process.env.PORT));