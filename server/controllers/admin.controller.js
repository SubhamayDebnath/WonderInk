import User from '../models/user.model.js'
import Category from '../models/category.model.js'
const adminLayout = "../views/layouts/admin";
const dashboard = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Dashboard",
            description: "Welcome to our dashboard page",
        };
        const users = await User.find().sort({ createdAt: -1 });
        const userCount = await User.countDocuments();
        const categoryCount = await Category.countDocuments();
        res.render('admin/index',{layout:adminLayout,locals,isAdmin:req.user.isAdmin,users,userCount,categoryCount})
    } catch (error) {
        console.log(`Dashboard page error : ${error}`);
        res.redirect('/error')
    }
}
const adminBlogsPage = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Dashboard - Blog",
            description: "Welcome to our dashboard blog page",
        };
        res.render('admin/blog',{layout:adminLayout,locals,isAdmin:req.user.isAdmin})
    } catch (error) {
        console.log(`Admin Blog page error : ${error}`);
        res.redirect('/error')
    }
}
const adminCategoryPage = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Dashboard - Category",
            description: "Welcome to our dashboard category page",
        };
        const categories = await Category.find().sort({ createdAt: -1 });

        res.render('admin/category',{layout:adminLayout,locals,isAdmin:req.user.isAdmin,categories})
    } catch (error) {
        console.log(`Admin Category page error : ${error}`);
        res.redirect('/error')
    }
}
const adminUsersPage = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Dashboard - User",
            description: "Welcome to our dashboard User page",
        };
        const users = await User.find().sort({ createdAt: -1 });
        res.render('admin/user',{layout:adminLayout,locals,isAdmin:req.user.isAdmin,users})
    } catch (error) {
        console.log(`Admin User page error : ${error}`);
        res.redirect('/error')
    }
}
const adminUpdateWebsitePage = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Dashboard - Update Website",
            description: "Welcome to our dashboard About page",
        };
        res.render('admin/website',{layout:adminLayout,locals,isAdmin:req.user.isAdmin})
    } catch (error) {
        console.log(`Admin Update Website page error : ${error}`);
        res.redirect('/error')
    }
}
const adminSettingPage = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Dashboard - Setting",
            description: "Welcome to our dashboard About page",
        };
        res.render('admin/settings',{layout:adminLayout,locals,isAdmin:req.user.isAdmin})
    } catch (error) {
        console.log(`Admin Update Website page error : ${error}`);
        res.redirect('/error')
    }
}
const adminProfilePage = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Dashboard - Profile",
            description: "Welcome to our dashboard Profile page",
        };
        const user = await User.findById(req.user._id);
        res.render('admin/profile',{layout:adminLayout,locals,isAdmin:req.user.isAdmin,user})
    } catch (error) {
        console.log(`Admin Update Website page error : ${error}`);
        res.redirect('/error')
    }
}

 const addCategoryPage = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Add - Category",
            description: "Welcome to our dashboard Profile page",
        };
        res.render('form/addCategory',{layout:adminLayout,locals,isAdmin:req.user.isAdmin})
        
    } catch (error) {
        console.log(`Add category page error : ${error}`);
        res.redirect('/error')
    }
 }

 const addCategory = async (req,res) => {
    try {
        const {name} = req.body;
        if(!name){
            req.flash("error_msg", "Please enter category name");
            return res.redirect('/admin/category/add');
        }
        const category = await Category.create({name});
        if(!category){
            req.flash("error_msg", "Category not created");
            return res.redirect('/admin/category/add');
        }
        req.flash("success_msg", "Category created");
        res.redirect('/admin/category/add');
        
    } catch (error) {
        console.log(`Add category error : ${error}`);
        res.redirect('/error')
    }
 }

 const updateProfile = async (req,res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        
    } catch (error) {
        console.log(`Update Profile error : ${error}`);
        res.redirect('/error')
    }
 }

export{
    dashboard,
    adminBlogsPage,
    adminCategoryPage,
    adminUsersPage,
    adminUpdateWebsitePage,
    adminProfilePage,
    adminSettingPage,
    addCategoryPage,
    addCategory,
    updateProfile
}