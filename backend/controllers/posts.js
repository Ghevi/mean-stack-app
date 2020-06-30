const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  // const post = req.body;
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId, // We get this from the decoded token in check-auth
  });
  // console.log(req.userData); These two lines log the userData to the node terminal
  // return res.status(200).json({});
  post
    .save()
    .then((createdPost) => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost, // by using this spread operator we lose the way Moongose save this object wrapped in a more complex object.
          id: createdPost._id,
        },
        // postId: createdPost._id,
        // post: {
        //   id: createdPost._id,
        //   title: createdPost.title,
        //   content: createdPost.content,
        //   imagePath: createdPost.imagePath,
        // },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to create a post",
      });
    });
};

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  } else {
  }
  const post = new Post({
    _id: req.body.id, // needed to reuse the exsistent id
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId,
  });
  // console.log(post);
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then((result) => {
      // console.log(result); usefull to check result properties like n
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't update post",
      });
    });
};

exports.getPosts = (req, res, next) => {
  // console.log(req.query); .pageSize and .page are up to us
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1)) // skip n elements to get to the nth page and so on
      .limit(pageSize); // return n elements
    // This approach is fine untill the number of elements gets very high
    // https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js
  }
  postQuery
    .then((documents) => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: fetchedPosts,
        maxPosts: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching posts failed",
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
}

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  })
  .catch((error) => {
    res.status(500).json({
      message: "Fetching post failed",
    });
  });;
}

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    (result) => {
      // console.log(result); usefull to check result properties like n
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    }
  )
  .catch((error) => {
    res.status(500).json({
      message: "Fetching post failed",
    });
  });
}
