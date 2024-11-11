const mongoose = require("mongoose");     //to import mongoose package 

const itemSchema = mongoose.Schema(        //creating item model schema
  {
    
    name: { type: String, require },
    sugarlevel: [],
    varients: [],
    prices: [],
    category: { type: String, require },
    image: { type: String, require },
    description: { type: String, require },
  },
  {
    timestamps: true,
  }
);

const itemmodel = mongoose.model("items", itemSchema);  // step to compile schema into model 

module.exports = itemmodel;  //exporting the model to be used into route files
