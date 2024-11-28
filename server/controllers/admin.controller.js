const adminLayout = "../views/layouts/admin";
const dashboard = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Dashboard",
            description: "Welcome to our dashboard page",
        };
        res.render('admin/index',{layout:adminLayout,locals})
    } catch (error) {
        console.log(`Dashboard page error : ${error}`);
    }
}
const adminBlogsPage = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Dashboard - Blog",
            description: "Welcome to our dashboard blog page",
        };
        res.render('admin/blog',{layout:adminLayout,locals})
    } catch (error) {
        console.log(`Admin Blog page error : ${error}`);
    }
}
const adminCategoryPage = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Dashboard - Category",
            description: "Welcome to our dashboard category page",
        };
        res.render('admin/category',{layout:adminLayout,locals})
    } catch (error) {
        console.log(`Admin Category page error : ${error}`);
    }
}
const adminUsersPage = async (req,res) => {
    try {
        const locals = {
            title: "Wonderink - Dashboard - User",
            description: "Welcome to our dashboard User page",
        };
        res.render('admin/user',{layout:adminLayout,locals})
    } catch (error) {
        console.log(`Admin User page error : ${error}`);
    }
}
export{
    dashboard,
    adminBlogsPage,
    adminCategoryPage,
    adminUsersPage
}