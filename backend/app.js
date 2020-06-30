const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(
    // `mongodb+srv://ghevi:${process.env.MONGO_ATLAS_PW}@cluster0-agcui.mongodb.net/node-angular?retryWrites=true&w=majority`
    "mongodb+srv://ghevi:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0-agcui.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

// To allow cors access
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;

// const express = require("express");

// const app = express();

// app.use((req, res, next) => {
//   console.log('First middleware');
//   next(); // let continue the request
// });

// app.use((req, res, next) => {
//   res.send('Hello from express lol');
// });

// module.exports = app;
