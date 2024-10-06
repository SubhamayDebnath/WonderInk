import AppError from "../utils/error.utils.js";

// render homepage
const homePage = async (req, res, next) => {
  try {
    const metaData = {
      title: "Home Page",
      description: "Welcome to our home page",
    };
    res.render("index", { metaData });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
// render About Page

const categoryPage = async (req, res, next) => {
  try {
    const metaData = {
      title: "Categories Page",
      description: "Welcome to our categories page",
    };
    res.render("categories", { metaData });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
const aboutPage = async (req, res, next) => {
  try {
    const metaData = {
      title: "About Page",
      description: "Welcome to our about page",
    };
    res.render("about", { metaData });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
const contactPage = async (req, res, next) => {
  try {
    const metaData = {
      title: "About Page",
      description: "Welcome to our about page",
    };
    res.render("contact", { metaData });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export { homePage, categoryPage, aboutPage, contactPage };
