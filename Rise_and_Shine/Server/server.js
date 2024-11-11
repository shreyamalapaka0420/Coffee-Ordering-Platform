const express = require("express"); //import express package
const bodyParser = require("body-parser");
const creds = require("./credential.json");
const path = require("path");


const db = require("./db"); //import database file
const app = express(); //create express application
const item = require("./models/itemmodel"); //import item model
app.use(express.json()); //register express.json middelware to parse incoming json data
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const itemsRoute = require("./routes/itemsRoute"); //import items route
const userRoute = require("./routes/userRoute"); //import user route
const ordersRoute = require("./routes/ordersRoute"); //import orders route
const driversRoute = require("./routes/driversRoute"); //import orders route
const { getMaxListeners } = require("process");

app.use("/api/items/", itemsRoute); //register apiendpoint for import routes
app.use("/api/users/", userRoute); //register apiendpoint for user routes
app.use("/api/orders/", ordersRoute); //register apiendpoint for orders routes
app.use("/api/drivers/", driversRoute); //register apiendpoint for orders routes

app.get("/", (req, res) => {
  res.send("Server Working" + port); //api to test if server is running
});



const port = process.env.port || 8000; //configure port 8000 for node server

app.listen(port, () => console.log("Server running on " + port)); //start the server on port 8000
