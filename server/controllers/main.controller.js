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

export{
    homePage
}