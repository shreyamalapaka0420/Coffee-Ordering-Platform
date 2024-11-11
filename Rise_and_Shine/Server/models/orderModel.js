const mongoose = require("mongoose")    //to import mongoose package


const orderSchema = mongoose.Schema({    //creating order schema 
    name : {type: String, require},
    email: {type: String, require},
    userid : {type: String, require},
    orderItems: [],
    shippingAddress: {type: Object},
    orderAmount: {type: Number, require},
    isDelivered: {type: Boolean, require, default:false},
    transactionId: {type: String, require}
}, {
    timestamps: true,
})


module.exports = mongoose.model('order', orderSchema) //compiling order schema into the model and exporting it to be used into routes files