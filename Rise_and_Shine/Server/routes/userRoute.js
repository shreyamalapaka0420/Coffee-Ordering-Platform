
const express = require("express");  //import express package
// const { restart } = require("nodemon");

const router = express.Router(); //create a router to register api endpoints
const User = require("../models/userModel"); //import user model


router.post("/register", (req, res) =>{  //create register api endpoint (http post)
    const{name, email, password} = req.body //read incoming data from request body
    const newUser = new User({name, email, password})// create new user model and map incoming data with user model

    try{
        newUser.save()     //save new user to database 
        res.send('User registered Successfully')// send success response to ui 
    }catch(error){
        return res.status(400).json({message: error})//send error response to ui
    }
});
//create login api endpoint http post 
router.post("/login", async(req,res) => {
     const{ email, password} = req.body  //read incoming data from request body

     try{
             const user = await User.find({email, password})//find user from  database which matches with incoming email and password
             if(user.length > 0){
                 const currentUser = {                     //if user found from database create user model to send to ui 
                     name : user[0].name ,
                     email : user[0].email,
                     isAdmin : user[0].isAdmin,           //mapping the data with record found in database
                     _id : user[0]._id
                 }
                 res.send(currentUser);    //send userdata to ui 
             }
             else{
                 return res.status(400).json({message: 'User Login Failed'});//send login failed response to ui 
             }

     }catch(error){
        return res.status(400).json({message: 'Something went Wrong'});//send error response to ui 
     }
});

router.get('/getallusers', async(req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    }catch(error){
        return res.status(400).json({message: error});
    }
});


router.post('/deleteuser',async(req, res) => {
    const userid = req.body.userid
    try{
        await User.findOneAndDelete({_id : userid})
        res.send('User Deleted Succefully')
    }catch(error){
        return res.status(400).json({message: error});
    }
})

module.exports = router  //export router to be used in server.js file