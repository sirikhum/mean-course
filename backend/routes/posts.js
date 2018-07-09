const express = require("express");
const multer = require("multer");

const Post = require("../models/post");

const router = express.Router();
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
      // console.log('"multer" Found valid mime-type of ' + isValid);
    } else {
      // console.log('"multer" Found invalid mime-type of ' + isValid);
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLocaleLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, Date.now() + "-" + name + "." + ext);
  }
});

// router.get();

router.post(
  "/",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    // const posts = req.body;
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename
    });
    post.save().then(createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id
        }
        // postId: createdPost._id
      });
    });
  }
);

router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    console.log("inside router.put - multer");
    // console.log(req, file);
    console.dir(req.body);
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    // console.log(req, file);
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath
    });
    console.log(post);
    Post.updateOne({ _id: req.params.id }, post).then(result => {
      console.log(result);
      res
        .status(200)
        .json({ message: "Update " + req.params.id + " successful" });
    });
  }
);

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post " + req.params.id + "not found!" });
    }
  });
});

router.get("/", (req, res, next) => {
  Post.find().then(documents => {
    // console.log(documents);
    res.status(200).json({
      messages: "Posts fetch successfully!",
      posts: documents
    });
  });
  // const posts = [
  //   { id: '33a34ba',
  //     title: 'First server-side post',
  //     content: 'This first content is from Express'
  //   },
  //   { id: '567567a',
  //     title: 'Second server-side post',
  //     content: 'This content is from Express'
  //   }
  // ];
  // res.status(200).json({
  //   messages: 'Posts fetch successfully!',
  //   posts: posts
  // });
});

// router.delete('/:id', (req, res, next) => {
//   console.log('router.delete: ' + req.params.id);
//   Post.deleteOne({ _id: req.params.id }).then(result => {
//     console.log(result);
//     res.status(200).json({ message: "Post " + req.params.id + " deleted!"});
//   });
// });

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
