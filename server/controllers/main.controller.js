const homePage = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink",
            description: "Welcome to our home page",
        };
        res.render('home/index',{locals})
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
        res.render('home/blogs',{locals})
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
        res.render('home/categories',{locals})
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
        res.render('home/about',{locals})
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
        res.render('home/blog',{locals})
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
        res.status(500).render('error/500',{locals})
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