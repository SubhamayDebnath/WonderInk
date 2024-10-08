import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config();
const authenticationLayout = "../views/layouts/authentication";
const jwtSecret = process.env.JWT_SECRET;
const cookieOption = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
};

/* 
  Register

*/
const registerPage = async (req, res) => {
  try {
    const locals = {
      title: "Create account - WonderInk",
      description: "Welcome to Register - WonderInk",
    };
    if(req.cookies.token){
      res.redirect("/admin/dashboard")
    }else{
      res.render("auth/register", { locals, layout: authenticationLayout });
    }
  } catch (error) {
    console.error("Register Page: ", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
const register = async (req, res, next) => {
  try {

    const { username, fullName, email, password } = req.body;
    if (!username || !fullName || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      fullName,
      email,
      password:hashPassword,
      avatar: {
        public_id: email,
        secure_url:
          "https://res.cloudinary.com/ds7sd75xu/image/upload/v1728318598/user-image_dskmhx.avif",
      },
    });
    if (!user) {
      return res.status(400).json({ message: "Failed to create user" });
    }
    await user.save();
    res.redirect("/activation");
  } catch (error) {
    console.error("Register Logic: ", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
/* 
  Login

*/
const loginPage = async (req, res) => {
  try {
    const locals = {
      title: "Login account - WonderInk",
      description: "Welcome to Login - WonderInk",
    };
    if(req.cookies.token){
      res.redirect("/admin/dashboard")
    }else{
      res.render("auth/login", { locals, layout: authenticationLayout });
    }
    
  } catch (error) {
    console.error("Login Page: ", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

const login=async (req,res,next) => {
  try {
    const {email,password}=req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const user = await User.findOne({ email }).select("+password");
    const  isValidPassword = await bcrypt.compare(password, user.password);

    if (!user || !isValidPassword){
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, cookieOption);
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Login Logic: ", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}
export { registerPage, loginPage, register,login };
