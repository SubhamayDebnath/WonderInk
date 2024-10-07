const utilsLayout = "../views/layouts/utils";
/* 

 Error Page

*/
const fourZeroFour = (req, res) => {
  try {
    const metaData = {
      title: "ERROR 404 - WonderInk",
      description: "ERROR 404 - WonderInk",
    };
    res.status(404).render("utils/FourZeroFour", { metaData, layout: utilsLayout });
  } catch (error) {
    console.error("Error handling 404:", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

/* 

 Activation Page

*/
const accountActivation = (req, res) => {
  try {
    const metaData = {
      title: "Account Activation Required - WonderInk",
      description: "Account Activation Required - WonderInk",
    };
    res.status(401).render("utils/activation", { metaData, layout: utilsLayout });
  } catch (error) {
    console.error("Account Activation: ", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export { fourZeroFour, accountActivation };
