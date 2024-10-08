import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import expressLayout from "express-ejs-layouts";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import session from "express-session";
import flush from "connect-flash";
import MongoStore from "connect-mongo";
config();

import mainRouter from "./server/routes/main.routes.js";
import errorRouter from "./server/routes/error.routes.js";
import authRouter from "./server/routes/auth.routes.js";
import adminRouter from "./server/routes/admin.routes.js";

import DBConnection from "./server/config/DBConnection.js";
import isActiveRoute from "./server/helpers/routesHelper.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB,
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.locals.isActiveRoute = isActiveRoute; 

app.use(express.static("public"));
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use(flush());
app.use(morgan("dev"));
app.use("", mainRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("", errorRouter);

app.listen(PORT, async () => {
  DBConnection();
  console.log(`server is running on port http://localhost:${PORT}`);
});
