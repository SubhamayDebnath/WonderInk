import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
config();

const app=express();
const PORT=process.env.PORT;


app.use(morgan("dev"));
app.use("*", (req, res) => {
    res.status(404).send("OOPS ! 404 page not found :(");
});
app.listen(PORT, async () => {
    console.log(`server is running on port http://localhost:${PORT}`);
});
  