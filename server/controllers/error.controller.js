const utilsLayout = "../views/layouts/utils";
const fourZeroFour = (req, res) => {
  try {
    const metaData = {
      title: "ERROR 404 - WonderInk",
      description: "ERROR 404 - WonderInk",
    };
    res.render("utils/FourZeroFour", { metaData, layout: utilsLayout });
  } catch (error) {
    console.error("Error handling 404:", error);
    res.status(500).json({message:"An unexpected error occurred. Please try again later."});
  }
};
const accountActivation=(req,res)=>{
  try {
    const metaData = {
      title: "Account Activation Required - WonderInk",
      description: "Account Activation Required - WonderInk",
    };
    res.render("utils/activation", { metaData, layout: utilsLayout });
  } catch (error) {
    console.error("Error handling 404:", error);
    res.status(500).json({message:"An unexpected error occurred. Please try again later."});
  }
}

export {fourZeroFour,accountActivation};
