const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
module.exports = {
  signUp: async function (body) {
    let otp = Math.floor(Math.random() * 100000) + 100000;
    let result = {};
    let tempUser = await User.findOne({ email: body.email });
    if (tempUser) {
      result.message = "This email is already registered";
    } else {
      try {
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: process.env.NODE_MAILER_USER, // generated ethereal user
            pass: process.env.NODE_MAILER_PASS, // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        let mailOption = {
          from: "hittheshubham1810@gmail.com",
          to: body.email,
          subject: "Email verification for Traveey",
          text: `Your OTP for email verification is ${otp}`,
        };
        transporter.sendMail(mailOption, async (error, info) => {
          if (error) {
            console.log(error);
          } else {
            await new User({...body, otp}).save();
          }
        });
        result.message = "Otp has been sent to the given email address";
      } catch (error) {
        console.log(error)
        result.err = error;
      }
    }
    return result;
  },
  emailVerify: async function (body) {
    let result = {};
    try {
       let user = await User.findOne({email: body.email});
       if(user){
          let verification = await User.findOne({otp: body.otp});
          if(verification){
            result.data = await User.findByIdAndUpdate(body._id, { $set: {emailverified:true}}, { new: true });
            result.message = "Email verified"
          }
          else{
            result.message = "Wrong OTP"
          }
       }
       else{
        result.message ="Email is not regestered" 
       }
    } catch (error) {
        
    }
    return result;
  },
  login: async function (body) {
    let result = {};
    try {
      let logedUser = await User.findOne(body);
      if (logedUser) {
          result.data = logedUser;
          result.message = "Traveey welcomes You :)";
        result.token = await jwt.sign({logedUser} , process.env.JWT_KEY);
      } else {
        result.message = "Invalid login details";
      }
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  updateUser: async function (body) {
    let result = {};
    try {
      result.data = await User.findByIdAndUpdate(body._id, { $set: body }, { new: true });
      result.message = "User Updated Successfully";
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  getUserById: async function (id) {
    let result = {};
    try {
      result.data = await User.findOne({ _id: id });
      result.message = "User data fatched successfully";
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  getUsers: async function (req) {
    let result = {};
    try {
      result.data = await User.find({});
      result.message = "User list fatched successfully";
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  deleteUser: async function (id) {
    let result = {};
    try {
      result.data = await User.findByIdAndDelete(id);
      result.message = "User deleted successfully";
    } catch (error) {
      result.err = error;
    }
    return result;
  },
};
