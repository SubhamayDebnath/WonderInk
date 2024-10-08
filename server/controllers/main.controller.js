import Post from "../models/post.model.js";
import Category from "../models/category.model.js";
/* 

 Homepage

*/
const homePage = async (req, res, next) => {
  try {
    const locals = {
      title: "Home Page",
      description: "Welcome to our home page",
    };
    const categories = await Category.find();
    let perPage = 1;
    let page = req.query.page || 1;
    const posts = await Post.find()
      .populate("postCategory", "name")
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
      const count = await Post.countDocuments({});
      const totalPages = Math.ceil(count / perPage);
      const nextPage = parseInt(page) + 1;
      const hasNextPage = nextPage <= Math.ceil(count / perPage);
      const prevPage = page > 1 ? page - 1 : null;

    res.render("index", {
      locals,
      posts,
      categories,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prevPage,
      totalPages,
      currentRoute: '/'
    });
  } catch (error) {
    console.error("Homepage: ", error);
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
    const locals = {
      title: "Categories Page",
      description: "Welcome to our categories page",
    };
    const categories = await Category.find();
    res.render("categories", { locals, categories, currentRoute: '/categories'});
  } catch (error) {
    console.error("Category Page: ", error);
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
    const locals = {
      title: "About Page",
      description: "Welcome to our about page",
    };
    res.render("about", { locals, currentRoute: '/about' });
  } catch (error) {
    console.error("About page: ", error);
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
    const locals = {
      title: "Contact Page",
      description: "Welcome to our about page",
    };
    res.render("contact", { locals , currentRoute: '/contact'});
  } catch (error) {
    console.error("Contact page: ", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
export { homePage, categoryPage, aboutPage, contactPage };
