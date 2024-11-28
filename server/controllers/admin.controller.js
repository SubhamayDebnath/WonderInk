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
        console.log(`Dashboard page error : ${error}`);
    }
}
export{
    dashboard,
    adminBlogsPage
}