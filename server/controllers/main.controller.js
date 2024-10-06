// render homepage
const homePage = async (req, res, next) => {
  try {
    const metaData = {
      title: "Home Page",
      description: "Welcome to our home page",
    };
    res.render("index", { metaData });
  } catch (error) {
    console.error("Error handling 404:", error);
    res
      .status(500)
      .send("An unexpected error occurred. Please try again later.");
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
    console.error("Error handling 404:", error);
    res
      .status(500)
      .send("An unexpected error occurred. Please try again later.");
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
    console.error("Error handling 404:", error);
    res
      .status(500)
      .send("An unexpected error occurred. Please try again later.");
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
    console.error("Error handling 404:", error);
    res
      .status(500)
      .send("An unexpected error occurred. Please try again later.");
  }
};
export { homePage, categoryPage, aboutPage, contactPage };
