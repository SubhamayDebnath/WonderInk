import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import fs from "fs/promises";
import crypto from "crypto";
config();

import User from '../models/user.model.js';

const registerPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Register",
      description: "Welcome to our home page",
    };
    res.render("auth/register", { locals });
  } catch (error) {
    console.log(`Register page error : ${error}`);
    res.redirect('/error')
  }
}
const loginPage = async (req, res) => {
    try {
      const locals = {
        title: "Wonderink - Login",
        description: "Welcome to our home page",
      };
      res.render("auth/login", { locals });
    } catch (error) {
      console.log(`Register page error : ${error}`);
      res.redirect('/error')
    }
}


// register logic

const register = async (req,res) => {
  try {
    const { name, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,26})/;
    if(!name || !email || !password) {
      req.flash("error_msg", "Please fill in all fields");
      return res.redirect("/auth/register");
    }
    if(name.length < 3 || name.length > 30) {
      req.flash("error_msg", "Name must be between 3 and 30 characters");
      return res.redirect("/auth/register");
    }
    if(!emailRegex.test(email)){
      req.flash("error_msg", "Invalid email");
      return res.redirect("/auth/register");
    }
    if(!passwordRegex.test(password)){
      req.flash("error_msg", "Password must be 6-26 characters long, contain at least one uppercase letter, one special character, and one number");
      return res.redirect("/auth/register");
    }
    const isExistingUser= await User.findOne({email});
    if(isExistingUser) {
      req.flash("error_msg", "Email already exists");
      return res.redirect("/auth/register");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      avatar: {
        public_id: new Date(),
        secure_url:`https://res.cloudinary.com/ds7sd75xu/image/upload/v1732899092/2606572_5907_hmdhiz.jpg`,
      },
    });
    if(!user){
      req.flash("error_msg", "Failed to create user");
      return res.redirect("/auth/register");
    }
    await user.save();
    req.flash("success_msg", "You are now registered and can log in");
    return res.redirect("/auth/login");

  } catch (error) {
    console.log(`Register error : ${error}`);
    res.redirect('/error')
  }
}

export { registerPage, loginPage,register };
