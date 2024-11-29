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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,26})/;
    if(!name || !email || !password) {
      req.flash("error_msg", "Please fill in all fields");
      return res.redirect("/auth/register");
    }
    if(name.length < 3 || name.length > 30) {
      req.flash("error_msg", "Name must be between 3 and 30 characters");
      return res.redirect("/auth/register");
    }
    if(!emailRegex.test(email)){
      req.flash("error_msg", "Invalid email");
      return res.redirect("/auth/register");
    }
    if(!passwordRegex.test(password)){
      req.flash("error_msg", "Password must be 6-26 characters long, contain at least one uppercase letter, one special character, and one number");
      return res.redirect("/auth/register");
    }
    
  } catch (error) {
    console.log(`Register error : ${error}`);
    res.redirect('/error')
  }
}

export { registerPage, loginPage,register };
