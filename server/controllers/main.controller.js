import Setting from "../models/setting.model.js";
import Post from '../models/post.model.js'
import Category from '../models/category.model.js'

const homePage = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink",
            description: "Welcome to our home page",
        };
        const setting = await Setting.findOne();
        const postLimit = setting.post.latestPostNumber || 6;
        const categoryLimit = setting.side.categoryNumber || 6;
        const posts = await Post.find().sort({ createdAt: -1 }).limit(postLimit).populate('category', 'name');
        const categories = await Category.find().sort({ createdAt: -1 }).limit(categoryLimit);
        res.render('home/index',{locals,user:req.user,posts,categories})
    } catch (error) {
        console.log(`Home page error : ${error}`);
        res.redirect('/error')
    }
}
const blogsPage=async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Blogs",
            description: "Welcome to our Blogs page",
        };
        res.render('home/blogs',{locals,user:req.user})
    } catch (error) {
        console.log(`Blogs page error : ${error}`);
        res.redirect('/error')
    }
}

const categoriesPage = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Categories",
            description: "Welcome to our Blogs page",
        };
        res.render('home/categories',{locals,user:req.user})
    } catch (error) {
        console.log(`Categories page error : ${error}`);
        res.redirect('/error')
    }
}
const aboutPage = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - About",
            description: "Welcome to our Blogs page",
        };
        res.render('home/about',{locals,user:req.user})
    } catch (error) {
        console.log(`About page error : ${error}`);
        res.redirect('/error')
    }
}
const blogPage=async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Blog",
            description: "Welcome to our Blogs page",
        };
        res.render('home/blog',{locals,user:req.user})
    } catch (error) {
        console.log(`Blog page error : ${error}`);
        res.redirect('/error')
    }
}
const errorPage=async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Error",
            description: "Welcome to our Error page",
        };
        res.status(500).render('error/500',{locals,user:req.user})
    } catch (error) {
        console.log(`Blog page error : ${error}`);
        res.redirect('/error')
    }
}


export{
    homePage,
    blogsPage,
    categoriesPage,
    aboutPage,
    blogPage,
    errorPage
}