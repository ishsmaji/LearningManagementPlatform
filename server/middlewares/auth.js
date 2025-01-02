const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookie.toekn ||
      req.body.token ||
      req.header("Authorisation").replace("Bearer", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: true,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: true,
      message: "Something went wrong when validating the token",
    });
  }
};

//student

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType != "Student") {
      return res.status(401).json({
        success: true,
        message: "This is a protected route for students Only",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: true,
      message: "User role is not verified",
    });
  }
};

//Instructor

exports.isInstructor = async (req, res, next) => {
    try {
      if (req.user.accountType != "Instructor") {
        return res.status(401).json({
          success: true,
          message: "This is a protected route for Instructor  Only",
        });
      }
  
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        success: true,
        message: "User role is not verified",
      });
    }
  };

//Admin
exports.isAdmin = async (req, res, next) => {
    try {
      if (req.user.accountType != "Admin") {
        return res.status(401).json({
          success: true,
          message: "This is a protected route for Admin Only",
        });
      }
  
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        success: true,
        message: "User role is not verified",
      });
    }
  };