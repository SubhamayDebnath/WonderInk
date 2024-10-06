import AppError from "../utils/error.utils.js";

// render homepage
const homepage = async (req, res, next) => {
    try {
        const metaData={
            title: "Home Page",
            description: "Welcome to our home page",
        }
        res.render('index',{metaData});
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

export { homepage };
