const express = require("express");  //import express package
const { restart } = require("nodemon"); //import nodemon package
const { models } = require("../db");  //import database file
const router = express.Router(); //create router to register api endpoints and middleware
const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")("sk_test_51Ks8XVIX6jiHQ167KUU1u48IgUVSlQT5BylkqCSdUB3jMQOEDBCrfHw38tmfxZR9MepFKtjwW6lJ62rfXBTU6Vr90055hYN7NB")
const Order = require("../models/orderModel");//import order model
const crypto = require("crypto");//import crypto package for encryption and decryption
const dotenv = require('dotenv');
dotenv.config();
let nodemailer = require("nodemailer");


//create placeorder api endpoint(Http post api)
router.post("/placeorder", async (req, res) => {

    const {token,subtotal,currentUser,cartItems} = req.body; //read incoming data from  request body 
  try {
    const customer = await stripe.customers.create({
      email : token.email,
      source:token.id
  })

  const payment = await stripe.charges.create({
    amount:subtotal*100,
    currency:'USD',
    customer : customer.id,
    receipt_email : token.email
}, {
    idempotencyKey : uuidv4()
})

// console.log('Logging placeorder' + token, subtotal, currentUser, cartItems)

if(payment)
      {
    //create new order model and populate the fields with incoming data
    const newOrder = new Order({
        name : currentUser.name,
        email : currentUser.email,
        userid : currentUser._id,
        orderItems: cartItems,
        orderAmount: subtotal,
        shippingAddress : {
          street : token.card.address_line1,
          city : token.card.address_city,
          country : token.card.address_country,
          pincode : token.card.address_zip
      },
        transactionId: payment.source.id      

    })

    newOrder.save();  //save the created model into database
    res.send('Payment success and order placed successfully'); //send success response back to ui
  } else{
    res.send('Payment failed')
}

} catch (error) {
    return res.status(400).json({ message: error });//send error response to ui
  }

});
//create api endpoint to get all orders(Http post api)
router.post("/getUserOrders", async (req, res) => {
    const {userid} = req.body; //read incoming data from request body 
    try {
      const orders = await Order.find({userid}).sort({_id : -1});  //fetch all orders from  database for given user id in descending order 
      res.send(orders);  //send response back to ui 
    } catch (error) {
      return res.status(400).json({ message: error });//send error message to ui 
    }
  });


  router.get('/getallorders', async (req,res) => {
    try {
      const orders = await Order.find({})
      res.send(orders)
    }catch(error){
        return res.status(400).json({message: error});
    }
  })


  router.post('/deliverorder', async (req,res) => {
    const orderid = req.body.orderid
    try {
      const order = await Order.findOne({_id : orderid})
      order.isDelivered = true
      await order.save()
      res.send('Order Delivered successfully')
    }catch(error){
      return res.status(400).json({message: error});
    }
  })

  router.post('/sendemail', async (req,res) => {
    const {useremail,driver} = req.body
    console.log(useremail)

    try {
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.email,
          pass: process.env.password,
        },
      });
      const messageOptions = {
        subject: "Enjoy your Biryani!",
        text: "Your order will be delivered by " + driver,
        to: useremail,
        from: process.env.email,
      };
      
      await transporter.sendMail(messageOptions);
      res.send('Email sent successfully')
    }catch(error){
      return res.status(400).json({message: error});
    }
  })

module.exports = router;//export router endpoints to be used in server js files
