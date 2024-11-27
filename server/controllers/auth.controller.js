const registerPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Register",
      description: "Welcome to our home page",
    };
    res.render("auth/register", { locals });
  } catch (error) {
    console.log(`Register page error : ${error}`);
  }
}
const loginPage = async (req, res) => {
    try {
      const locals = {
        title: "Wonderink - Login",
        description: "Welcome to our home page",
      };
      res.render("auth/login", { locals });
    } catch (error) {
      console.log(`Register page error : ${error}`);
    }
  }
export { registerPage, loginPage };
