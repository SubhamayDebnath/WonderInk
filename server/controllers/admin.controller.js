import User from "../models/user.model.js";
import Category from "../models/category.model.js";
import cloudinary from "../utils/cloudinary.js"
import fs from "fs/promises";
const adminLayout = "../views/layouts/admin";
const dashboard = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Dashboard",
      description: "Welcome to our dashboard page",
    };
    const users = await User.find().sort({ createdAt: -1 });
    const userCount = await User.countDocuments();
    const categoryCount = await Category.countDocuments();
    return res.render("admin/index", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
      users,
      userCount,
      categoryCount,
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
    return res.render("admin/blog", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
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

    return res.render("admin/category", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
      categories,
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
    return res.render("admin/user", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
      users,
    });
  } catch (error) {
    console.log(`Admin User page error : ${error}`);
    return res.redirect("/error");
  }
};
const adminUpdateWebsitePage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Dashboard - Update Website",
      description: "Welcome to our dashboard About page",
    };
    return res.render("admin/website", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
    });
  } catch (error) {
    console.log(`Admin Update Website page error : ${error}`);
    return res.redirect("/error");
  }
};
const adminSettingPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Dashboard - Setting",
      description: "Welcome to our dashboard About page",
    };
    return res.render("admin/settings", {
      layout: adminLayout,
      locals,
      isAdmin: req.user.isAdmin,
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

const postSetting = async (req,res) => {
  try {
    console.log(req.body);
    
  } catch (error) {
    console.log(`Post Setting error : ${error}`);
    return res.redirect("/error");
  }
}

export {
  dashboard,
  adminBlogsPage,
  adminCategoryPage,
  adminUsersPage,
  adminUpdateWebsitePage,
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
  postSetting
};
