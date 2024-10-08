import jwt from "jsonwebtoken";
import { config } from "dotenv";
import fs from "fs/promises";
import cloudinary from "../utils/cloudinary.js";
config();

import User from "../models/user.model.js";
import Category from "../models/category.model.js";
import Post from "../models/post.model.js";

const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;
/* 
    Dashboard
*/
const dashboard = async (req, res, next) => {
  try {
    const metaData = {
      title: "Dashboard - WonderInk",
      description: "Welcome to Dashboard",
    };
    const numberOfUsers = await User.countDocuments();
    const numberOfCategories = await Category.countDocuments();
    const decoded = jwt.verify(req.cookies.token, jwtSecret);
    const currentUser = await User.findById(decoded.userId);
    if (!req.cookies.token) {
      res.redirect("/auth/login");
    } else {
      res.render("admin/index", {
        metaData,
        currentUser,
        layout: adminLayout,
        numberOfUsers,
        numberOfCategories,
      });
    }
  } catch (error) {
    console.error("Dashboard: ", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
/* 
    Get all users
*/
const getAllUsers = async (req, res, next) => {
  try {
    const metaData = {
      title: "All users - WonderInk",
      description: "Welcome to Dashboard",
    };
    const decoded = jwt.verify(req.cookies.token, jwtSecret);
    const currentUser = await User.findById(decoded.userId);
    const users = await User.find();
    if (!req.cookies.token) {
      res.redirect("/auth/login");
    } else {
      res.render("admin/user", {
        metaData,
        currentUser,
        layout: adminLayout,
        users,
      });
    }
  } catch (error) {
    console.error("Get all users: ", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
/* 
    Category Page
*/
const categoryPage = async (req, res, next) => {
  try {
    const metaData = {
      title: "Categories - WonderInk",
      description: "Welcome to Dashboard",
    };
    const { metaDataSession } = req.session;
    const categories = await Category.find().sort({ createdAt: 1 });
    if (!req.cookies.token) {
      res.redirect("/auth/login");
    } else {
      res.render("admin/category", {
        metaData: metaDataSession || metaData,
        layout: adminLayout,
        categories,
      });
    }
  } catch (error) {
    console.error("Category Page: ", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
/* 
   Add Category Page
*/

const addCategoryPage = async (req, res, next) => {
  try {
    const metaData = {
      title: "Add Categories - WonderInk",
      description: "Welcome to Dashboard",
    };
    if (!req.cookies.token) {
      res.redirect("/auth/login");
    } else {
      res.render("admin/form/add-category", { metaData, layout: adminLayout });
    }
  } catch (error) {
    console.error("Add Category Page: ", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
/* 
   Add Category 
*/

const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Please enter category name." });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists." });
    }
    const category = await Category.create({ name });
    if (!category) {
      return res.status(400).json({ message: "Failed to add category." });
    }
    req.session.metaData = {
      title: "Add Categories - WonderInk",
      description: "Welcome to Dashboard",
    };
    res.redirect("/admin/dashboard/add/category");
  } catch (error) {
    console.error("Add Category: ", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

/* 
    Posts  page
*/
const postPage = async (req, res, next) => {
  try {
    const metaData = {
      title: "All posts - WonderInk",
      description: "Welcome to Dashboard",
    };
    const { metaDataSession } = req.session;
    const posts = await Post.find()
    .populate('postCategory', 'name') 
    .populate('author', 'username') 
    .sort({ createdAt: 1 });
    if (!req.cookies.token) {
      res.redirect("/auth/login");
    } else {
      res.render("admin/post", {
        metaData: metaDataSession || metaData,
        layout: adminLayout,
        posts,
      });
    }
  } catch (error) {
    console.error("All Posts Page: ", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
/* 
   Add Post  Page
*/
const addPostPage = async (req, res, next) => {
  try {
    const metaData = {
      title: "All posts - WonderInk",
      description: "Welcome to Dashboard",
    };
    const categories = await Category.find();
    if (!req.cookies.token) {
      res.redirect("/auth/login");
    } else {
      res.render("admin/form/add-post", {
        metaData,
        layout: adminLayout,
        categories,
      });
    }
  } catch (error) {
    console.error("Add Post Page: ", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
/* 
   Add  Post
*/

const addPost = async (req, res, next) => {
  try {
    const { title, content, category, status } = req.body;
    if (!title || !content || !category || !status) {
      return res.status(400).json({ message: "Please fill all fields." });
    }
    const decoded = jwt.verify(req.cookies.token, jwtSecret);
    let image = "";
    let public_id = "";
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image." });
    }
    if (req.file) {
      const transformationOptions = {
        transformation: [
          {
            quality: "auto:low",
            fetch_format: "avif",
          },
        ],
      };

      const cloudinaryResult = await cloudinary.uploader.upload(
        req.file.path,
        transformationOptions
      );
      image = cloudinaryResult.secure_url;
      public_id = cloudinaryResult.public_id;
      fs.rm(req.file.path);
    }

    const post = await Post.create({
      postImage: {
        public_id: public_id,
        secure_url: image,
      },
      postTitle: title,
      postContent: content,
      postCategory: category,
      postStatus: status,
      author: decoded.userId,
    });
    if (!post) {
      return res.status(400).json({ message: "Failed to add post." });
    }
    req.session.metaData = {
      title: "All posts - WonderInk",
      description: "Welcome to Dashboard",
    };
    res.redirect("/admin/dashboard/add/post");
  } catch (error) {
    console.error("Add Post: ", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
export {
  dashboard,
  getAllUsers,
  categoryPage,
  addCategoryPage,
  addCategory,
  postPage,
  addPostPage,
  addPost,
};
