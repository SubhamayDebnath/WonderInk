import User from "../models/user.model.js";
import Category from "../models/category.model.js";
import Setting from "../models/setting.model.js";
import Post from '../models/post.model.js'
import cloudinary from "../utils/cloudinary.js"
import slugify from "slugify";
import fs from "fs/promises";
const adminLayout = "../views/layouts/admin";
const dashboard = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Dashboard",
      description: "Welcome to our dashboard page",
    };
    const users = await User.find().sort({ createdAt: -1 }).limit(5);
    const posts = await Post.find().sort({ createdAt: -1 }).limit(5);    
    const userCount = await User.countDocuments();
    const categoryCount = await Category.countDocuments();
    const postCount = await Post.countDocuments();
    return res.render("admin/index", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
      users,
      posts,
      userCount,
      categoryCount,
      postCount,
      currentRoute: '/admin/dashboard'
    });
  } catch (error) {
    console.log(`Dashboard page error : ${error}`);
    return res.redirect("/error");
  }
};
const adminBlogsPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Dashboard - Blog",
      description: "Welcome to our dashboard blog page",
    };
    const setting = await Setting.findOne();
    let perPage = setting.dashboard.postNumber || 6;
    let page = req.query.page || 1;
    const postCount = await Post.countDocuments();
    const posts = await Post.find({isPublish: true })
    .populate("category", "name")
    .populate("author", "name")
    .sort({ createdAt: -1 })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();
    const count = await Post.countDocuments({});
    const totalPages = Math.ceil(count / perPage);
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const prevPage = page > 1 ? page - 1 : null;
    return res.render("admin/blog", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
      posts,
      postCount,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prevPage,
      totalPages,
       currentRoute: '/admin/blog'
    });
  } catch (error) {
    console.log(`Admin Blog page error : ${error}`);
    return res.redirect("/error");
  }
};
const adminCategoryPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Dashboard - Category",
      description: "Welcome to our dashboard category page",
    };
    const categories = await Category.find().sort({ createdAt: -1 });
    const categoryCount = await Category.countDocuments();

    return res.render("admin/category", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
      categories,
      categoryCount,
      currentRoute: '/admin/category'
    });
  } catch (error) {
    console.log(`Admin Category page error : ${error}`);
    return res.redirect("/error");
  }
};
const adminUsersPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Dashboard - User",
      description: "Welcome to our dashboard User page",
    };
    const users = await User.find().sort({ createdAt: -1 });
    const userCount = await User.countDocuments();
    return res.render("admin/user", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
      users,
      userCount,
      currentRoute: '/admin/users'
    });
  } catch (error) {
    console.log(`Admin User page error : ${error}`);
    return res.redirect("/error");
  }
};

const adminSettingPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Dashboard - Setting",
      description: "Welcome to our dashboard About page",
    };
    const setting = await Setting.findOne();
    return res.render("admin/settings", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
      setting,
      currentRoute: '/admin/settings'
    });
  } catch (error) {
    console.log(`Admin Update Website page error : ${error}`);
    return res.redirect("/error");
  }
};
const adminProfilePage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Dashboard - Profile",
      description: "Welcome to our dashboard Profile page",
    };
    const user = await User.findById(req.user._id);
    return res.render("admin/profile", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
      user,
      currentRoute: '/admin/profile'
    });
  } catch (error) {
    console.log(`Admin Update Website page error : ${error}`);
    return res.redirect("/error");
  }
};
const addPostPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Add - Post",
      description: "Welcome to our dashboard Profile page",
    };
    const categories = await Category.find();
    return res.render("form/addPost", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
      categories,
       currentRoute: '/admin/post/add'

    });
  } catch (error) {
    console.log(`Add Post page error : ${error}`);
    return res.redirect("/error");
  }
};

const addCategoryPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Add - Category",
      description: "Welcome to our dashboard Profile page",
    };
    return res.render("form/addCategory", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
      currentRoute: '/admin/category/add'
    });
  } catch (error) {
    console.log(`Add category page error : ${error}`);
    return res.redirect("/error");
  }
};

const editCategoryPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Edit - Category",
      description: "Welcome to our dashboard Profile page",
    };
    const categoryID = req.params.id;
    const category = await Category.findById(categoryID);
    return res.render("form/editCategory", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
      category,
      currentRoute: `/admin/category/edit/${categoryID}`
    });
  } catch (error) {
    console.log(`Edit category page error : ${error}`);
    return res.redirect("/error");
  }
};

// category

const updateCategory = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const { name } = req.body;
    if (!name) {
      req.flash("error_msg", "Please enter category name");
      return res.redirect(`/admin/category/edit/${categoryID}`);
    }
    const category = await Category.findById(categoryID);
    if (!category) {
      req.flash("error_msg", "Category not found");
      return res.redirect(`/admin/category/edit/${categoryID}`);
    }
    category.name = name;
    await category.save();
    req.flash("success_msg", "Category updated successfully");
    return res.redirect(`/admin/category/edit/${categoryID}`);
  } catch (error) {
    console.log(`Update category error : ${error}`);
    return res.redirect("/error");
  }
};

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      req.flash("error_msg", "Please enter category name");
      return res.redirect("/admin/category/add");
    }
    const category = await Category.create({ name });
    if (!category) {
      req.flash("error_msg", "Category not created");
      return res.redirect("/admin/category/add");
    }
    req.flash("success_msg", "Category created");
    return res.redirect("/admin/category/add");
  } catch (error) {
    console.log(`Add category error : ${error}`);
    return res.redirect("/error");
  }
};
const disableCategory = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const { status } = req.body;
    if (!categoryID) {
      req.flash("error_msg", "Invalid category ID");
      return res.redirect("/admin/category");
    }
    const category = await Category.findById(categoryID);
    if (!category) {
      req.flash("error_msg", "Category not found");
      return res.redirect("/admin/category");
    }
    category.isPublish = status == "false";
    await category.save();
    if (category.isPublish) {
      req.flash("success_msg", "Category enabled");
      return res.redirect("/admin/category");
    } else {
      req.flash("success_msg", "Category disabled");
      return res.redirect("/admin/category");
    }
  } catch (error) {
    console.log(`Disable category error : ${error}`);
    return res.redirect("/error");
  }
};
const deleteCategory = async (req, res) => {
  try {
    const categoryID = req.params.id;
    if (!categoryID) {
      req.flash("error_msg", "Invalid category ID");
      return res.redirect("/admin/category");
    }
    const deletedCategory = await Category.findByIdAndDelete(categoryID);
    if (!deletedCategory) {
      req.flash("error_msg", "Category not found");
      return res.redirect("/admin/category");
    }
    req.flash("success_msg", "Category deleted");
    res.redirect("/admin/category");
  } catch (error) {
    console.log(`Delete category error : ${error}`);
    return res.redirect("/error");
  }
};

// profile
const updateProfile = async (req, res) => {
  try {
    const userID = req.params.id;
    const { name, description } = req.body;
    if (!userID) {
      return res.redirect("/admin/profile");
    }
    const user = await User.findById(userID);
    if (!user) {
      return res.redirect("/admin/profile");
    }
    if (!name || !description) {
      return res.redirect("/admin/profile");
    }
    let image = "";
    let public_id = "";
    if (!req.file) {
      user.name = name;
      user.description = description;
      await user.save();
      return res.redirect("/admin/profile");
    } else {
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
      user.avatar = {
        public_id: public_id,
        secure_url: image,
      };
      user.name = name;
      user.description = description;
      await user.save();
      return res.redirect("/admin/profile");
    }
  } catch (error) {
    console.log(`Update Profile error : ${error}`);
    return res.redirect("/error");
  }
};
const updateSocialLinks = async (req,res) => {
  try {
    const userID = req.params.id;
    const {email,isEmail,gitHub,isGithub, twitter,isTwitter, instagram,isInstagram,facebook,isFacebook,linkedIn,isLinkedIn } = req.body;
    if(!userID){
      return res.redirect("/admin/profile")
    }
    const user = await User.findById(userID);
    if (!user) {
      return res.redirect("/admin/profile")
    }
    user.socialLinks.email = email;
    user.socialLinks.github = gitHub;
    user.socialLinks.twitter = twitter;
    user.socialLinks.instagram = instagram;
    user.socialLinks.facebook = facebook;
    user.socialLinks.linkedin = linkedIn;

    user.isSocialLinksVisible.email = isEmail == 'on';
    user.isSocialLinksVisible.github = isGithub == 'on';
    user.isSocialLinksVisible.twitter = isTwitter == 'on';
    user.isSocialLinksVisible.instagram = isInstagram == 'on';
    user.isSocialLinksVisible.facebook = isFacebook == 'on';
    user.isSocialLinksVisible.linkedin = isLinkedIn == 'on';
    await user.save()
    return res.redirect("/admin/profile")
  } catch (error) {
    console.log(`Update Social Link error : ${error}`);
    return res.redirect("/error");
  }
}

// setting

const postSetting = async (req,res) => {
  try {
    const { homePagePostCount,blogPagePostCount } = req.body;
    const setting = await Setting.findOne();
    setting.post.latestPostNumber = homePagePostCount;
    setting.post.postNumber = blogPagePostCount;
    await setting.save()
    return res.redirect("/admin/settings")
  } catch (error) {
    console.log(`Post Setting error : ${error}`);
    return res.redirect("/error");
  }
}
const sidebarSetting = async (req,res) => {
  try {
    const { categoryCount,tagsCount } = req.body;
    const setting = await Setting.findOne();
    setting.side.categoryNumber = categoryCount;
    setting.side.tagNumber= tagsCount;
    await setting.save()
    return res.redirect("/admin/settings")
  } catch (error) {
    console.log(`Sidebar Setting error : ${error}`);
    return res.redirect("/error");
  }
}
const dashboardSetting = async (req,res) => {
  try {
    const { dashboardPagePostCount,dashboardPageCategoryCount,dashboardPageUserCount } = req.body;
    const setting = await Setting.findOne();
    setting.dashboard.postNumber=dashboardPagePostCount;
    setting.dashboard.categoryNumber=dashboardPageCategoryCount;
    setting.dashboard.userNumber=dashboardPageUserCount
    await setting.save()
    return res.redirect("/admin/settings")
  } catch (error) {
    console.log(`Dashboard Setting error : ${error}`);
    return res.redirect("/error");
  }
}

//post

const addPost = async(req,res)=>{
  try {
    const { title,category,tags,isPublish,description,content } = req.body;
    const authorID=req.user._id;
    if(!title || !category || !tags || !isPublish || !description || !content){
      req.flash("error_msg", "Please fill all fields");
      return res.redirect("/admin/post/add");
    }
    if(!authorID){
      req.flash("error_msg", "Please login to add post");
      return res.redirect("/admin/login");
    }
    if(!req.file){
      req.flash("error_msg", "Please upload image")
      return res.redirect("/admin/post/add");
    }
    const slug = slugify(title, {
      lower: true,
      strict: true,
      replacement: "-",
    });
    let existingPost = await Post.findOne({ slug: slug });
    if (existingPost) {
      slug = `${slug}-${Date.now()}`;
    }
    let image = "";
    let public_id = "";
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
      image:{
        public_id:public_id,
        secure_url:image
      },
      title:title,
      description:description,
      content:content,
      category:category,
      tags:tags.split(",").map(tag => tag.trim()),
      isPublish:isPublish == 'true',
      author:authorID,
      slug:slug
    });
    if(!post){
      req.flash("error_msg", "Failed to create post")
      return res.redirect("/admin/post/add");
    }
    await post.save();
    req.flash("success_msg", "Post created successfully");
    return res.redirect("/admin/post/add");

  } catch (error) {
    console.log(`Add Post error : ${error}`);
    return res.redirect("/error");
  }
}

export {
  dashboard,
  adminBlogsPage,
  adminCategoryPage,
  adminUsersPage,
  adminProfilePage,
  adminSettingPage,
  addCategoryPage,
  editCategoryPage,
  updateCategory,
  addCategory,
  disableCategory,
  deleteCategory,
  updateProfile,
  updateSocialLinks,
  postSetting,
  sidebarSetting,
  dashboardSetting,
  addPostPage,
  addPost
};
