const homePage = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink",
            description: "Welcome to our home page",
        };
        res.render('home/index',{locals})
    } catch (error) {
        console.log(`Home page error : ${error}`);
    }
}
const blogsPage=async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Blogs",
            description: "Welcome to our Blogs page",
        };
        res.render('home/blogs',{locals})
    } catch (error) {
        console.log(`Blogs page error : ${error}`);
    }
}

const categoriesPage = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Categories",
            description: "Welcome to our Blogs page",
        };
        res.render('home/categories',{locals})
    } catch (error) {
        console.log(`Categories page error : ${error}`);
    }
}
const aboutPage = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - About",
            description: "Welcome to our Blogs page",
        };
        res.render('home/about',{locals})
    } catch (error) {
        console.log(`About page error : ${error}`);
    }
}
const blogPage=async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Blog",
            description: "Welcome to our Blogs page",
        };
        res.render('home/blog',{locals})
    } catch (error) {
        console.log(`Blog page error : ${error}`);
    }
}


export{
    homePage,
    blogsPage,
    categoriesPage,
    aboutPage,
    blogPage
}