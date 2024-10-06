import AppError from "../utils/error.utils.js";
const fourZeroFour=(req,res)=>{
    try {
        // res.render('FourZeroFour');
        res.send('error <br> <a href="/">Back to home</a>')
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

export default  fourZeroFour;
