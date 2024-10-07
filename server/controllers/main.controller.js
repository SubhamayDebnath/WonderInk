/* 

 Homepage

*/
const homePage = async (req, res, next) => {
  try {
    const metaData = {
      title: "Home Page",
      description: "Welcome to our home page",
    };
    res.render("index", { metaData });
  } catch (error) {
    console.error("Error handling 404:", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

/* 

 Category Page

*/

const categoryPage = async (req, res, next) => {
  try {
    const metaData = {
      title: "Categories Page",
      description: "Welcome to our categories page",
    };
    res.render("categories", { metaData });
  } catch (error) {
    console.error("Error handling 404:", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

/* 

 About Page

*/

const aboutPage = async (req, res, next) => {
  try {
    const metaData = {
      title: "About Page",
      description: "Welcome to our about page",
    };
    res.render("about", { metaData });
  } catch (error) {
    console.error("Error handling 404:", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

/* 

 Contact Page

*/

const contactPage = async (req, res, next) => {
  try {
    const metaData = {
      title: "About Page",
      description: "Welcome to our about page",
    };
    res.render("contact", { metaData });
  } catch (error) {
    console.error("Error handling 404:", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
export { homePage, categoryPage, aboutPage, contactPage };
