const fourZeroFour = (req, res) => {
  try {
    res.status(404).send(`
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <br>
            <a href="/">Back to Home</a>
        `);
  } catch (error) {
    console.error("Error handling 404:", error);
    res
      .status(500)
      .send("An unexpected error occurred. Please try again later.");
  }
};

export default fourZeroFour;
