const mongoose = require("mongoose");
const crypto = require("crypto")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Please add a name"]
  },
  email: {
    type: String,
    required: [true, "Please add a email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  role: {
    type: String,
    enum: ["user", "publisher"],
    default: "user"
  },
  password: {
    type: String,
    required: [true, "Please add a Password"],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    dafault: Date.now
  }
});

// Encrypt the password before save
UserSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// return jwt token 
UserSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

UserSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

UserSchema.methods.getResetPasswordToken = function(){
  // Generate Token 
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set it to resetPasswordToken field 
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire 
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
}

module.exports = mongoose.model("User", UserSchema);