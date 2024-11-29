const registerPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Register",
      description: "Welcome to our home page",
    };
    res.render("auth/register", { locals });
  } catch (error) {
    console.log(`Register page error : ${error}`);
    res.redirect('/error')
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
      res.redirect('/error')
    }
}


// register logic

const register = async (req,res) => {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
      req.flash("error_msg", "Please fill in all fields");
      return res.redirect("/auth/register");
    }
  } catch (error) {
    console.log(`Register error : ${error}`);
    res.redirect('/error')
  }
}

export { registerPage, loginPage,register };
