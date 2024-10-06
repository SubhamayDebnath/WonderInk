const authenticationLayout = "../views/layouts/authentication";
//register
const registerPage = async (req, res) => {
  try {
    const metaData = {
      title: "Create account - WonderInk",
      description: "Welcome to Register - WonderInk",
    };
    res.render("auth/register", { metaData, layout: authenticationLayout });
  } catch (error) {
    console.error("Error handling 404:", error);
    res
      .status(500)
      .send("An unexpected error occurred. Please try again later.");
  }
};
const register=async(req,res,next)=>{
    try {
        console.log(req.body);
        
    } catch (error) {
        console.error("Error handling 404:", error);
        res.status(500).send("An unexpected error occurred. Please try again later.");
    }
}
// login
const loginPage = async (req, res) => {
  try {
    const metaData = {
      title: "Login account - WonderInk",
      description: "Welcome to Login - WonderInk",
    };
    res.render("auth/login", { metaData, layout: authenticationLayout });
  } catch (error) {
    console.error("Error handling 404:", error);
    res
      .status(500)
      .send("An unexpected error occurred. Please try again later.");
  }
};
export { registerPage, loginPage ,register};
