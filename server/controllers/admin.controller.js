/* 
  
    Dashboard

*/
const dashboard=async (req,res,next) => {
    try {
        // const metaData = {
        //   title: "Home Page",
        //   description: "Welcome to our home page",
        // };
        // res.render("admin/index", { metaData });
       res.send("hello")
    } catch (error) {
        console.error("Dashboard: ", error);
        res.status(500).json({
          message: "An unexpected error occurred. Please try again later.",
        });
    }
}
const getAllUsers=async (req,res,next) => {
    try {
        // const metaData = {
        //   title: "Home Page",
        //   description: "Welcome to our home page",
        // };
        // res.render("admin/index", { metaData });
       res.send("hello")
    } catch (error) {
        console.error("Get all users: ", error);
        res.status(500).json({
          message: "An unexpected error occurred. Please try again later.",
        });
    }
}

export { dashboard ,getAllUsers}