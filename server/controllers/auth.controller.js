import User from "../models/user.model.js";
import bcrypt from "bcrypt";
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
    const metaData = {
      title: "Create account - WonderInk",
      description: "Welcome to Register - WonderInk",
    };
    res.render("auth/register", { metaData, layout: authenticationLayout });
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
    const metaData = {
      title: "Login account - WonderInk",
      description: "Welcome to Login - WonderInk",
    };
    res.render("auth/login", { metaData, layout: authenticationLayout });
  } catch (error) {
    console.error("Login Page: ", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

const login=async (req,res,next) => {
  try {
    const metaData = {
      title: "Login account - WonderInk",
      description: "Welcome to Login - WonderInk",
    };
    res.render("auth/login", { metaData, layout: authenticationLayout });
  } catch (error) {
    console.error("Login Logic: ", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}
export { registerPage, loginPage, register };
