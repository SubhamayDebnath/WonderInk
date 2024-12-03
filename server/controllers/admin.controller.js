import User from "../models/user.model.js";
import Category from "../models/category.model.js";
import Setting from "../models/setting.model.js";
import Post from '../models/post.model.js'
import Contact from '../models/contact.model.js'
import Newsletter from '../models/newsletter.model.js'
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
    const postLikes = await Post.find();
    const totalLikes = postLikes.reduce((sum, post) => sum + post.likes, 0)
    const userCount = await User.countDocuments();
    const categoryCount = await Category.countDocuments();
    const postCount = await Post.countDocuments();
    const userPostCount = (await Post.find({author:req.user._id})).length;
    const userPost = await Post.find({author:req.user._id}).sort({ createdAt: -1 }).limit(5); 
    const userPostLikes = await Post.find({ author: req.user._id }).sort({ createdAt: -1 });
    const totalLikesUserPost=userPostLikes.reduce((sum, post) => sum + post.likes, 0);
    return res.render("admin/index", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
      users,
      posts,
      userCount,
      categoryCount,
      postCount,
      totalLikes,
      userPostCount,
      userPost,
      totalLikesUserPost
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
    const posts = await Post.find()
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
    });
  } catch (error) {
    console.log(`Admin Blog page error : ${error}`);
    return res.redirect("/error");
  }
};
const adminUserBlogsPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Dashboard - Blog",
      description: "Welcome to our dashboard blog page",
    };
    const setting = await Setting.findOne();
    let perPage = setting.dashboard.postNumber || 6;
    let page = req.query.page || 1;
  
    const posts = await Post.find({author:req.user._id })
    .populate("category", "name")
    .populate("author", "name")
    .sort({ createdAt: -1 })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();
    const postCount = (await await Post.find({isPublish: true,author:req.user._id })).length;
    const count = postCount;
    const totalPages = Math.ceil(count / perPage);
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const prevPage = page > 1 ? page - 1 : null;
    return res.render("admin/userBlogs", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
      posts,
      postCount,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prevPage,
      totalPages,
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
      categoryCount
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
      userCount
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
      setting
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
      categories
    });
  } catch (error) {
    console.log(`Add Post page error : ${error}`);
    return res.redirect("/error");
  }
};
const editPostPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Edit - Post",
      description: "Welcome to our dashboard Profile page",
    };
    const postID = req.params.id;
    if(!postID){
      return res.redirect("/admin/dashboard")
    }
    const post = await Post.findById(postID).populate("category", "name");
    if(!post){
      return res.redirect("/admin/dashboard")
    }
    const categories = await Category.find();
    return res.render("form/editPost", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
      categories,
      post
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
    let uncategorizedCategory = await Category.findOne({ name: "uncategorized" });
    if (!uncategorizedCategory) {
      uncategorizedCategory = await Category.create({ name: "uncategorized" });
    }
    await Post.updateMany({ category: categoryID }, { category: uncategorizedCategory._id });
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
const updatePost = async (req,res) => {
  try {
    const {postID,title,category,tags,isPublish,description,content}=req.body;
    if(!title || !category || !tags || !isPublish || !description || !content){
      req.flash("error_msg", "Please fill all fields");
      return res.redirect(`/admin/post/edit/${postID}`)
    }
    const post = await Post.findById({ _id: postID });
    if(!post){
      return res.redirect("/admin/dashboard");
    }
    let slug=post.slug;
    if(title != post.title ){
      slug = slugify(title, {
        lower: true,
        strict: true,
        replacement: "-",
      });
      const existingPost = await Post.findOne({
        slug: slug,
        _id: { $ne: postID },
      });
      if (!existingPost) {
        slug = `${slug}-${Date.now()}`;
      }
    }
    let image = post.image.secure_url;
    let public_id = post.image.public_id;
    if (req.file) {
      await cloudinary.uploader.destroy(public_id);
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
      await fs.rm(req.file.path);
    }
    post.image = {
      public_id:public_id,
      secure_url: image,
    };
    post.title = title
    post.category = category
    post.tags=tags.split(",").map(tag => tag.trim());
    post.isPublish=isPublish == 'true'
    post.slug=slug
    post.description = description
    post.content=content
    post.save();
    req.flash("success_msg", "Post updated successfully");
    return res.redirect(`/admin/post/edit/${postID}`);

  } catch (error) {
    console.log(`Update Post page error : ${error}`);
    return res.redirect("/error");
  }
}
const deletePost = async (req,res) => {
  try {
    const postID = req.params.id;
    const {page} = req.body;
    if(!postID){
      if(page == 'all'){
        req.flash("error_msg", "Post id not found");
        return res.redirect('/admin/blogs');
      }
      if(page == 'user'){
        req.flash("error_msg", "Post id not found");
        return res.redirect('/admin/blog');
      }
    }
    const post = await Post.findById(postID);
    if(!post){
      if(page == 'all'){
        req.flash("error_msg", "Post not found");
        return res.redirect('/admin/blogs');
      }
      if(page == 'user'){
        req.flash("error_msg", "Post not found");
        return res.redirect('/admin/blog');
      }
    }
    let public_id = post.image.public_id;
    console.log(public_id);
    await cloudinary.uploader.destroy(public_id);
    await Post.findByIdAndDelete(postID);
    if(page == 'all'){
      req.flash("success_msg", "Post delete successfully");
      return res.redirect('/admin/blogs');
    }
    if(page == 'user'){
      req.flash("success_msg", "Post delete successfully");
      return res.redirect('/admin/blog');
    }
  } catch (error) {
    console.log(`Delete Post page error : ${error}`);
    return res.redirect("/error");
  }
}
const disablePost = async (req,res) => {
  try {
    const { postSlug, id } = req.params;
    const {status} = req.body;
    if(!id){
      if(postSlug == 'all'){
        req.flash("error_msg", "Invalid post ID");
        return res.redirect("/admin/blogs");
      }
      if(postSlug == 'user'){
        req.flash("error_msg", "Invalid post ID");
        return res.redirect("/admin/blog");
      }
    }
    const post = await Post.findById(id);
    if(!post){
      if(postSlug == 'all'){
        req.flash("error_msg", "Invalid post ID");
        return res.redirect("/admin/blog");
      }
      if(postSlug == 'user'){
        req.flash("error_msg", "Invalid post ID");
        return res.redirect("/admin/blogs");
      }
    }
    post.isPublish = status == "false";
    await post.save()
    if(postSlug == 'all'){
      if(post.isPublish){
        req.flash("success_msg", "Category enabled");
        return res.redirect("/admin/blog");
      }else{
        req.flash("success_msg", "Category disabled");
        return res.redirect("/admin/blog");
      }
    }
    if(postSlug == 'user'){
      if(post.isPublish){
        req.flash("success_msg", "Category enabled");
        return res.redirect("/admin/blogs");
      }else{
        req.flash("success_msg", "Category disabled");
        return res.redirect("/admin/blogs");
      }
    }
  } catch (error) {
    console.log(`Disable Post error : ${error}`);
    return res.redirect("/error");
  }
}
const contactPage = async(req,res)=>{
  try {
    const locals = {
      title: "Wonderink - Add - Contact",
      description: "Welcome to our dashboard Profile page",
    };
    const contact = await Contact.find().sort({ createdAt: -1 });
    const contactCount = await Contact.countDocuments();

    return res.render("admin/contact", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
      contact,
      contactCount
    });
  } catch (error) {
    console.log(`Admin Contact Page error : ${error}`);
    return res.redirect("/error");
  }
}
const addContactMessage = async (req, res) => {
  try {
    const {name,email,message}=req.body;
    if(!name || !email || !message){
      req.flash("error_msg", "Please fill all fields");
      return res.redirect("/contact");
    }
    const contact = await Contact.create({name,email,message});
    if(!contact){
      req.flash("error_msg", "Failed to send message")
      return res.redirect("/contact");
    }
    req.flash("success_msg", "Message sent successfully");
    return res.redirect("/contact");
    
  } catch (error) {
    console.log(`Add Contact Message error : ${error}`);
    return res.redirect("/error");
  }
}
const newsletterPage = async (req,res) => {
  try {
    const locals = {
      title: "Wonderink - Add - Newsletter",
      description: "Welcome to our dashboard Profile page",
    };
    return res.render("admin/newsletter", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
    });
  } catch (error) {
    console.log(`Admin Newsletter Page error : ${error}`);
    return res.redirect("/error");
  }
}
const addNewsletter = async (req,res) => {
  try {
    const {email }= req.body;
    if(!email){
      req.flash("error_msg", "Please fill email");
      return res.redirect("/subscribe");
    }
    const newsletter = await Newsletter.create({email});
    if(!newsletter){
      req.flash("error_msg", "Failed to subscribe")
      return res.redirect("/subscribe")
    }
    req.flash("success_msg", "Email submitted successfully! Thank you");
    return res.redirect("/subscribe")
  } catch (error) {
    console.log(`Add Newsletter Message error : ${error}`);
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
  addPost,
  addContactMessage,
  addNewsletter,
  contactPage,
  newsletterPage,
  adminUserBlogsPage ,
  disablePost,
  editPostPage,
  updatePost,
  deletePost
};
