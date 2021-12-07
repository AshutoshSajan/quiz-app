require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const indexRouter = require("./server/routes");

const app = express();

const mongoURI =
  process.env.NODE_ENV === "development"
    ? process.env.LOCAL_MONGO_URI
    : process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
}

connectDB();

app.use(cors());

// view engine setup
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "./server/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
}

if (process.env.NODE_ENV === "development") {
  const webpack = require("webpack");
  const webpackConfig = require("./webpack.config");
  const compiler = webpack(webpackConfig);

  app.use(express.static("./server/views/index.ejs"));

  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    }),
  );

  app.use(require("webpack-hot-middleware")(compiler));
}

app.use("/api/v1", indexRouter);

app.use("*", (req, res) =>
  res.status(200).render("index", {
    title: "Express React Quiz App",
  }),
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
