import User from "../models/user.model.js";
import Category from "../models/category.model.js";
import Post from "../models/post.model.js";
import Contact from "../models/contact.model.js";

const adminLayout = "../views/layouts/admin";

/*
  Dashboard Page Render
*/ 

const dashboard = async (req, res, next) => {
  try {
    const locals = {
      title: "Dashboard",
      description: "Welcome to Dashboard",
    };
    const numberOfUsers = await User.countDocuments();
    const numberOfCategories = await Category.countDocuments();
    const numberOfPosts = await Post.countDocuments();
    const numberOfPostByUser = (await Post.find({ author: req.user._id }))
      .length;
    res.render("admin/index", {
      locals,
      layout: adminLayout,
      user: req.user,
      numberOfUsers,
      numberOfCategories,
      numberOfPosts,
      numberOfPostByUser,
    });
  } catch (error) {
    console.log(`Dashboard error : ${error}`);
    res.redirect("/error");
  }
};
/*
  Articles Page Render
*/ 
const articlesPage = async (req, res, next) => {
  try {
    const locals = {
      title: "Article",
      description: "Welcome to Article",
    };
    const posts = await Post.find()
      .populate("category", "name")
      .populate("author", "username role")
      .sort({ createdAt: 1 });
    res.render("admin/articles", {
      locals,
      layout: adminLayout,
      user: req.user,
      posts,
    });
  } catch (error) {
    console.log(`Dashboard error : ${error}`);
    res.redirect("/error");
  }
};
/*
  Categories Page Render
*/ 
const categoriesPage = async (req, res, next) => {
  try {
    const locals = {
      title: "Categories",
      description: "Welcome to Categories",
    };
    const categories = await Category.find().sort({ createdAt: 1 });
    res.render("admin/categories", {
      locals,
      layout: adminLayout,
      user: req.user,
      categories,
    });
  } catch (error) {
    console.log(`Categories error : ${error}`);
    res.redirect("/error");
  }
};

/*
  Users Page Render
*/ 
const usersPage = async (req, res, next) => {
  try {
    const locals = {
      title: "Users",
      description: "Welcome to Users",
    };
    const users = await User.find();
    res.render("admin/users", {
      locals,
      layout: adminLayout,
      user: req.user,
      users,
    });
  } catch (error) {
    console.log(`Users error : ${error}`);
    res.redirect("/error");
  }
};

/*
  User Page Render
*/ 

const userPage = async (req, res, next) => {
  try {
    const userID = req.user._id;
    const user = await User.findById({ _id: userID });
    const numberOfPostByUser = (await Post.find({ author: req.user._id }))
      .length;
    const locals = {
      title: user.username,
      description: "Welcome to " + user.username,
    };
    res.render("admin/user", {
      locals,
      layout: adminLayout,
      user: req.user,
      user,
      numberOfPostByUser,
    });
  } catch (error) {
    console.log(`User error : ${error}`);
    res.redirect("/error");
  }
};
/*
  Contact Page Render
*/ 
const contactPage = async (req, res, next) => {
  try {
    const locals = {
      title: "Contact Form",
      description: "Welcome to Contact Form",
    };
    const contact = await Contact.find().sort({
      createdAt: -1
    })
    res.render("admin/contact", {
      locals,
      layout: adminLayout,
      user: req.user,
      contact
    });
  } catch (error) {
    console.log(`Contact Form error : ${error}`);
    res.redirect("/error");
  }
};
/*
  Post By User Page Render
*/ 
const postByUserPage = async (req, res, next) => {
  try {
    const locals = {
      title: "Post By U",
      description: "Welcome to Post By U",
    };
    const posts = await Post.find({ author: req.user._id })
      .populate("author", "username")
      .sort({ createdAt: 1 });
    res.render("admin/userArticle", {
      locals,
      layout: adminLayout,
      user: req.user,
      posts,
    });
  } catch (error) {
    console.log(`Post By User page error : ${error}`);
    res.redirect("/error");
  }
};
/*
  Comments Page Render
*/ 
const commentPage=async(req,res,next)=>{
  try {
    const locals = {
      title: "All Comments",
      description: "Welcome to All Comments",
    };
    const userRole=req.user.role
    let post;
    if(userRole=='ADMIN' || userRole=='SUPERUSER'){
      post= await  Post.find().populate("category", "name").populate("author", "username role").sort({createdAt:1})
    }else{
      post= await  Post.find({author: req.user._id}).populate("category", "name").populate("author", "username").sort({createdAt:1})
    }
    res.render("admin/comments", {
      locals,
      layout: adminLayout,
      user: req.user,
      post
    });
  } catch (error) {
    console.log(`Comment page error : ${error}`);
    res.redirect("/error");
  }
}

/*
  Add Post Page Render
*/ 

const addPostPage = async (req, res, next) => {
  try {
    const locals = {
      title: "Add Post Form",
      description: "Welcome to Add Post Form",
    };
    const categories = await Category.find();
    res.render("admin/form/addPostForm", {
      locals,
      layout: adminLayout,
      user: req.user,
      categories,
    });
  } catch (error) {
    console.log(`Add Post error : ${error}`);
    res.redirect("/error");
  }
};
/*
  Update Post Page Render
*/ 
const updatePostPage=async(req,res,next)=>{
  try {
    const postID=req.params.id;
    if(!postID){
      req.flash("error_msg","Invalid post ID");
      return res.redirect("/dashboard/articles");
    }
    const post=await Post.findById({_id:postID});
    if(!post){
      req.flash("error_msg","Invalid post ID");
      return res.redirect("/dashboard/articles");
    }
    const locals = {
      title: "Update Post Form",
      description: "Welcome to update Post Form",
    };
    const categories = await Category.find();
    res.render("admin/form/updatePostForm", {
      locals,
      layout: adminLayout,
      user: req.user,
      categories,
      post
    });
    
  } catch (error) {
    console.log(`Update Post error : ${error}`);
    res.redirect("/error");
  }
}
/*
  Add Category Page Render
*/ 

const addCategoryPage = async (req, res, next) => {
  try {
    const locals = {
      title: "Add Category Form",
      description: "Welcome to Add Category Form",
    };
    res.render("admin/form/addCategoryForm", {
      locals,
      layout: adminLayout,
      user: req.user,
    });
  } catch (error) {
    console.log(`Add Category error : ${error}`);
    res.redirect("/error");
  }
};
/*
  Update Category Page Render
*/ 
const updateCategoryPage = async (req, res, next) => {
  try {
    const locals = {
      title: "Update Category Form",
      description: "Welcome to Update Category Form",
    };
    const catID = req.params.id;
    if (!catID) {
      req.flash("error_msg", "Invalid category ID");
      return res.redirect("/dashboard/categories");
    }
    const category = await Category.findById(catID);
    if (!category) {
      req.flash("error_msg", "Invalid category ID");
      return res.redirect("/dashboard/categories");
    }
    res.render("admin/form/updateCategoryForm", {
      locals,
      layout: adminLayout,
      user: req.user,
      category,
    });
  } catch (error) {
    console.log(`Update Category error : ${error}`);
    res.redirect("/error");
  }
};

/*
  Update User Page Render
*/ 

const updateUserPage = async (req, res, next) => {
  try {
    const locals = {
      title: "Update User Form",
      description: "Welcome to Update User Form",
    };
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      req.flash("error_msg", "Invalid user ID");
      res.redirect("/dashboard/me");
    }
    res.render("admin/form/updateProfileForm", {
      locals,
      layout: adminLayout,
      user: req.user,
      user,
    });
  } catch (error) {
    console.log(`Update User error : ${error}`);
    res.redirect("/error");
  }
};
/*
  Change Password without using mail Page Render
*/ 
const changePasswordPage=async(req,res,next)=>{
  try {
    const locals = {
      title: "Change Password",
      description: "Welcome to Change Password",
    };
    res.render("admin/form/changePassword", {
      locals,
      layout: adminLayout,
      user: req.user,
    });
    
  } catch (error) {
    console.log(`Change Password without mail error : ${error}`);
    res.redirect("/error");
  }
}
/*
  reply form page render
*/ 

const doReplyPage=async (req,res,next) => {
  try {
    const locals = {
      title: "Do Replay",
      description: "Welcome to Do Reply",
    };
    const {postID,commentID}=req.params;
    res.render("admin/form/reply", {
      locals,
      layout: adminLayout,
      user: req.user,
      commentID,postID
    });
  } catch (error) {
    console.log(`Do Reply error : ${error}`);
    res.redirect("/error");
  }
}
export {
  dashboard,
  articlesPage,
  categoriesPage,
  usersPage,
  userPage,
  contactPage,
  postByUserPage,
  addPostPage,
  addCategoryPage,
  updateCategoryPage,
  updateUserPage,
  changePasswordPage,
  commentPage,
  doReplyPage,
  updatePostPage
};
