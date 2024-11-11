const mongoose = require("mongoose");     //to import mongoose package 

const driverSchema = mongoose.Schema(        //creating item model schema
  {
    name: { type: String, require },
    
  },
  {
    timestamps: true,
  }
);

const drivermodel = mongoose.model("drivers", driverSchema);  // step to compile schema into model 

module.exports = drivermodel;  //exporting the model to be used into route files
