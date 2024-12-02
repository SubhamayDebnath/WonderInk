import Setting from "../models/setting.model.js";
import Post from "../models/post.model.js";
import Category from "../models/category.model.js";
import User from "../models/user.model.js";

const homePage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink",
      description: "Welcome to our home page",
    };
    const setting = await Setting.findOne();
    const postLimit = setting.post.latestPostNumber || 6;
    const categoryLimit = setting.side.categoryNumber || 6;
    const tagsLimit = setting.side.tagNumber || 6;
    const posts = await Post.find({ isPublish: true })
      .sort({ createdAt: -1 })
      .limit(postLimit)
      .populate("category", "name");
    const categories = await Category.find({ isPublish: true })
      .sort({ createdAt: -1 })
      .limit(categoryLimit);
      const uniqueTagsData = await Post.aggregate([
        { $unwind: "$tags" }, 
        { $group: { _id: null, uniqueTags: { $addToSet: "$tags" } } }, 
        { $project: { _id: 0, tags: { $slice: ["$uniqueTags", { $toInt: tagsLimit}] } } }, 
        { $sort: { tags: 1 } } 
    ]);
    let uniqueTags=[];
    if(uniqueTagsData.length){
      uniqueTags = [...new Set(uniqueTagsData[0].tags.map(tag => tag.trim()))];
    }else{
      uniqueTags=[];
    }
   
    res.render("home/index", { locals, user: req.user, posts, categories,uniqueTags });
  } catch (error) {
    console.log(`Home page error : ${error}`);
    res.redirect("/error");
  }
};
const blogsPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Blogs",
      description: "Welcome to our Blogs page",
    };
    const setting = await Setting.findOne();
    const tagsLimit = setting.side.tagNumber || 6;
    let perPage = setting.post.postNumber || 6;
    let page = req.query.page || 1;
    const posts = await Post.find({ isPublish: true })
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Post.countDocuments({});
    const totalPages = Math.ceil(count / perPage);
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const prevPage = page > 1 ? page - 1 : null;

    const categoryLimit = setting.side.categoryNumber || 6;
    const categories = await Category.find({ isPublish: true })
      .sort({ createdAt: -1 })
      .limit(categoryLimit);
    const uniqueTagsData = await Post.aggregate([
        { $unwind: "$tags" }, 
        { $group: { _id: null, uniqueTags: { $addToSet: "$tags" } } }, 
        { $project: { _id: 0, tags: { $slice: ["$uniqueTags", { $toInt: tagsLimit}] } } }, 
        { $sort: { tags: 1 } } 
    ]);
    let uniqueTags=[];
    if(uniqueTagsData.length){
      uniqueTags = [...new Set(uniqueTagsData[0].tags.map(tag => tag.trim()))];
    }else{
      uniqueTags=[];
    }
    res.render("home/blogs", {
      locals,
      user: req.user,
      posts,
      categories,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prevPage,
      totalPages,
      uniqueTags
    });
  } catch (error) {
    console.log(`Blogs page error : ${error}`);
    res.redirect("/error");
  }
};
const addLink = async (req, res) => {
  try {
    const postID = req.params.id;
    const post = await Post.findById(postID);
    if (!post) {
      return res.redirect("/");
    }
    post.likes += 1;
    await post.save();
    res.json({ success: true, likes: post.likes });
  } catch (error) {
    console.log(`Add Link error : ${error}`);
    res.redirect("/error");
  }
};

const categoriesPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Categories",
      description: "Welcome to our Blogs page",
    };
    const categories = await Category.find({ isPublish: true }).sort({
      createdAt: -1,
    });
    res.render("home/categories", { locals, user: req.user, categories });
  } catch (error) {
    console.log(`Categories page error : ${error}`);
    res.redirect("/error");
  }
};
const contactPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Contact",
      description: "Welcome to our Blogs page",
    };
    res.render("home/contact", { locals, user: req.user });
  } catch (error) {
    console.log(`About page error : ${error}`);
    res.redirect("/error");
  }
};
const blogPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Blog",
      description: "Welcome to our Blogs page",
    };
    const slug = req.params.slug;
    if (!slug) {
      return res.redirect("/");
    }
    const singlePost = await Post.findOne({ slug: slug,isPublish: true })
      .populate("category", "name")
      .populate(
        "author",
        "name avatar description socialLinks isSocialLinksVisible"
      );
    const setting = await Setting.findOne();
    const categoryLimit = setting.side.categoryNumber || 6;
    const categories = await Category.find({isPublish: true})
      .sort({ createdAt: -1 })
      .limit(categoryLimit);
    if (!singlePost) {
      return res.redirect("/");
    }
    const postID = singlePost.id;
    const post = await Post.find();
    const currentPostIndex = post.findIndex((p) => p._id.toString() === postID);
    let previousPost = null;
    let nextPost = null;
    if (post.length >= 3) {
      if (currentPostIndex === 0) {
        previousPost = post[post.length - 1];
        nextPost = post[1];
      } else if (currentPostIndex === post.length - 1) {
        previousPost = post[post.length - 2];
        nextPost = post[0];
      } else {
        previousPost = post[currentPostIndex - 1];
        nextPost = post[currentPostIndex + 1];
      }
    }
    if (post.length < 3) {
      previousPost = null;
      nextPost = null;
    }
    const tagsLimit = setting.side.tagNumber || 6;
    const uniqueTagsData = await Post.aggregate([
      { $unwind: "$tags" }, 
      { $group: { _id: null, uniqueTags: { $addToSet: "$tags" } } }, 
      { $project: { _id: 0, tags: { $slice: ["$uniqueTags", { $toInt: tagsLimit}] } } }, 
      { $sort: { tags: 1 } } 
  ]);
  let uniqueTags=[];
  if(uniqueTagsData.length){
    uniqueTags = [...new Set(uniqueTagsData[0].tags.map(tag => tag.trim()))];
  }else{
    uniqueTags=[];
  }

    res.render("home/blog", {
      locals,
      user: req.user,
      singlePost,
      categories,
      previousPost,
      nextPost,
      uniqueTags
    });
  } catch (error) {
    console.log(`Blog page error : ${error}`);
    res.redirect("/error");
  }
};
const categoryBasedPost = async (req,res) => {
  try {
    const locals = {
      title: "Wonderink - Blog",
      description: "Welcome to our Blogs page",
    };
    const categoryName=req.params.slug;
    if(!categoryName){
      return res.redirect("/");
    }
    const category = await Category.findOne({ name: categoryName});
    const categoryID=category._id;
    if (!category) {
      return res.redirect("/");
    }
    const setting = await Setting.findOne();
    let perPage = setting.post.postNumber || 6;
    let page = req.query.page || 1;
    const posts = await Post.find({ isPublish: true, category: categoryID })
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();
    const count = await Post.countDocuments({ isPublish: true, category: categoryID });
    const totalPages = Math.ceil(count / perPage);
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const prevPage = page > 1 ? page - 1 : null;
    res.render('home/categoryBasedBlogs',{
      locals,
      user: req.user,
      categoryName,
      posts,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prevPage,
      totalPages,
    })
  } catch (error) {
    console.log(`Category Based Blogs page error : ${error}`);
    res.redirect("/error");
  }
}
const tagBasedPost = async (req,res) => {
  try {
    const locals = {
      title: "Wonderink - Blog",
      description: "Welcome to our Blogs page",
    };
    const tagName=req.params.slug;
    if(!tagName){
      return res.redirect("/");
    }
    const setting = await Setting.findOne();
    let perPage = setting.post.postNumber || 6;
    let page = req.query.page || 1;
    const posts = await Post.find({
      isPublish: true,
      tags: { $in: tagName }
    }).populate("category", "name")
    .sort({ createdAt: -1 })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();
    const count = await Post.countDocuments({ isPublish: true,tags: { $in: tagName } });
    const totalPages = Math.ceil(count / perPage);
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const prevPage = page > 1 ? page - 1 : null;
    res.render('home/tagBasedBlogs',{
      locals,
      user: req.user,
      tagName,
      posts,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prevPage,
      totalPages,
    })
  } catch (error) {
    console.log(`Tag Based Blogs page error : ${error}`);
    res.redirect("/error");
  }
}
const errorPage = async (req, res) => {
  try {
    const locals = {
      title: "Wonderink - Error",
      description: "Welcome to our Error page",
    };
    
    res.status(500).render("error/500", { locals, user: req.user });
  } catch (error) {
    console.log(`Blog page error : ${error}`);
    res.redirect("/error");
  }
};

const subscribePage = async (req,res) => {
  try {
    const locals = {
      title: "Wonderink - subscribe",
      description: "Welcome to our Error page",
    };

    res.render("home/subscribe", { locals, user: req.user });
  } catch (error) {
    console.log(`Blog page error : ${error}`);
    res.redirect("/error");
  }
}

const searchPage = async (req,res) => {
  try {
    const locals = {
      title: "Wonderink - subscribe",
      description: "Welcome to our Error page",
    };
    const query = req.query.q || '';
    const setting = await Setting.findOne();
    let perPage = setting.post.postNumber || 6;
    let page = req.query.page || 1;
    const regexQuery = new RegExp(`\\b${query}\\b`, 'i'); 
    const matchingCategories = await Category.find({
      name: regexQuery,
    });
    const categoryIds = matchingCategories.map(category => category._id);
    const matchingAuthors = await User.find({
      name: regexQuery,
    });
    const authorIds = matchingAuthors.map(author => author._id);
    const queryFilter = {
      $or: [
        { title: regexQuery },
        { description: regexQuery },
        { content: regexQuery },
        { tags: { $in: [regexQuery] } },
        { category: { $in: categoryIds } },
        { author: { $in: authorIds } },
      ],
      isPublish: true,
    };
    const posts = await Post.find(queryFilter)
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();
    const count = await Post.countDocuments(queryFilter);
    const totalPages = Math.ceil(count / perPage);
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const prevPage = page > 1 ? page - 1 : null;
    res.render("home/search", { 
      locals, 
      user: req.user ,
      posts,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prevPage,
      totalPages,
      query
    });
  } catch (error) {
    console.log(`Search page error : ${error}`);
    res.redirect("/error");
  }
}

export {
  homePage,
  blogsPage,
  categoriesPage,
  contactPage,
  blogPage,
  errorPage,
  addLink,
  categoryBasedPost,
  tagBasedPost,
  subscribePage,
  searchPage
};
