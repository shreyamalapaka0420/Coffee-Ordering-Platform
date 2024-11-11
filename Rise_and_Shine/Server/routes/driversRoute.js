const express = require("express");  //importing express package 
const { restart } = require("nodemon");  //importing nodemon package for compiling  real time changes in code
const { models } = require("../db");     //importing database connection file
const router = express.Router();        //creating router to register api end points and middleware
const Driver = require("../models/driverModel"); //importing item model

//creating  get all items api endpoint(Http get api)
router.get("/getAllDrivers", async (req, res) => {
  try {
    const drivers = await Driver.find({}); //fetch all items from database 
    res.send(drivers); //send fetched items to the ui as a response 
  } catch (error) {
    return res.status(400).json({ message: error });//send an error response
  }
});

module.exports = router;

