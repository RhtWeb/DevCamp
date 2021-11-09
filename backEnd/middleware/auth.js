const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

// Protected Routes 
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    token = req.headers.authorization.split(" ")[1];
  }

  // else if(req.cookies){
  //   token = req.cookies.token
  // }

  if(!token){
    return next(new ErrorResponse("Not autorize to access this route", 401));
  }

  try {
    // Verify the token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse("Not autorize to access this route", 401));
  }
});