import User from "../models/user.model.js";
const adminLayout = "../views/layouts/admin";
/* 
    Dashboard
*/
const dashboard = async (req, res, next) => {
  try {
    const metaData = {
      title: "Dashboard - WonderInk",
      description: "Welcome to Dashboard",
    };
    if (!req.cookies.token) {
      res.redirect("/auth/login");
    } else {
      res.render("admin/index", { metaData, layout: adminLayout });
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
    const users = await  User.find();
    if (!req.cookies.token) {
      res.redirect("/auth/login");
    } else {
      res.render("admin/user", { metaData, layout: adminLayout,users });
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
const categoryPage=(req,res,next)=>{
    try {
        
    } catch (error) {
        console.error("Category Page: ", error);
        res.status(500).json({
          message: "An unexpected error occurred. Please try again later.",
        });
    }
}

export { dashboard, getAllUsers };
