import jwt from "jsonwebtoken";
import { config } from "dotenv";
import User from "../models/user.model.js";
config();

const jwtSecret = process.env.JWT_SECRET;
/*
  Check user login or not
*/ 
const isLoggedIn = async (req, res, next) => {
  try {
    const {accessToken } = req.cookies;
    if (accessToken) {
      res.clearCookie("accessToken");
      return res.redirect("/");
    }
    next();
  } catch (error) {
    console.log(`JWT error : ${error}`);
    res.redirect("/error");
  }
};
/*
  Check user have access or not
*/ 
const isAuthorized = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      req.flash("error_msg", "Please log in to access this page.");
      return res.redirect("/auth/login");
    }
    const decoded = jwt.verify(accessToken, jwtSecret);
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      req.flash("error_msg", "Please log in to access this page.");
      return res.redirect("/auth/login");
    }
    if (!currentUser.isActive) {
      req.flash(
        "error_msg",
        "Unauthorized!you do not have permission to access the route"
      );
      return res.redirect("/auth/login");
    }
    req.user = currentUser;
    next();
  } catch (error) {
    console.log(`JWT error : ${error}`);
    res.redirect("/error");
  }
};
/*
  set user details in request
*/ 
const isAuthenticated = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      req.user = undefined;
      next();
    } else {
      const decoded = jwt.verify(accessToken ,jwtSecret);
      const currentUser = await User.findById(decoded.userId);
      req.user = currentUser;
      next();
    }
  } catch (error) {
    console.log(`JWT error : ${error}`);
    res.redirect("/error");
  }
};

export { isLoggedIn, isAuthorized, isAuthenticated };
