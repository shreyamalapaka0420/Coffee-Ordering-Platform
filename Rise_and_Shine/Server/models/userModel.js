const mongoose = require("mongoose")  //to import mongoose package
const bcrypt = require("bcrypt");
const saltRounds = 10; // the number of salt rounds to use for hashing


const userSchema = mongoose.Schema({   //creating user schema
    name : {type: String, require},
    email: {type: String, require},
    password: {type: String, require},
    isAdmin: {type: Boolean, require, default: false},
}, {
    timestamps: true,
})

// hash the password before saving it to the database
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
    next();
  });
  
  // compare the user input password with the hashed password in the database
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

module.exports = mongoose.model('users', userSchema) //compiling user schema into the model and exporting it to be used into routes files