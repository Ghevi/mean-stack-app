const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();

mongoose
  .connect(
    "mongodb+srv://ghevi:kB08uTSVy1d0jkqH@cluster0-agcui.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// To allow cors access
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("api/posts", (req, res, next) => {
  // const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id,
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: documents,
    });
  });

  // const posts = [
  //   {
  //     id: "fnnfas1223",
  //     title: "First server-side post",
  //     content: "This is coming from the server",
  //   },
  //   {
  //     id: "sgdahl2352",
  //     title: "Second server-side post",
  //     content: "This is coming from the server!",
  //   },
  // ];
});

app.delete("/api/posts/:id", (req, resp, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted" });
  });
});

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

// kB08uTSVy1d0jkqH
