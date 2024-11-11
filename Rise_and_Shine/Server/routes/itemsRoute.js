const express = require("express");  //importing express package 
const { restart } = require("nodemon");  //importing nodemon package for compiling  real time changes in code
const { models } = require("../db");     //importing database connection file
const router = express.Router();        //creating router to register api end points and middleware
const Item = require("../models/itemmodel"); //importing item model

//creating  get all items api endpoint(Http get api)
router.get("/getAllitems", async (req, res) => {
  try {
    const items = await Item.find({}); //fetch all items from database 
    res.send(items); //send fetched items to the ui as a response 
  } catch (error) {
    return res.status(400).json({ message: error });//send an error response
  }
});

router.post("/additem", async (req, res) => {
  try {
    const {item} = req.body;   //reading data from body

    const newItem = new Item({
      name : item.name,
      image : item.image,
      varients : ['small','medium','large'],   //map incoming data to data model
      description : item.description,
      category : item.category,
      prices : [item.prices]
    })

    await newItem.save()           //save data into database
    res.send('new item saved')     //send success  response to ui  

  } catch (error) {
    return res.status(400).json({ message: error });  //send error response to ui 
  }
});

router.post("/getItemById", async (req, res) => {
  const itemId = req.body.itemId;
  try {
    const item = await Item.findOne({_id : itemId});
    res.send(item);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/edititem", async (req, res) => {
  const updatedItem = req.body.updatedItem;
  try {
    const item = await Item.findOne({_id : updatedItem.id});
    item.name = updatedItem.name
    item.description = updatedItem.description
    item.image = updatedItem.image
    item.category = updatedItem.category
    item.prices = [updatedItem.prices]

    await item.save()

    res.send('Item details edited successfully')
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});


router.post('/deleteitem', async (req, res) => {
  const itemId = req.body.itemId

  try{
    await Item.findOneAndDelete({_id : itemId})
    res.send('Item deleted successfully')
  }catch(error){
    return res.status(400).json({message: error})
  }

} )
module.exports = router;
