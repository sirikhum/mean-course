const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb://localhost:27017/mean')
  .then(() => {
    console.log('Connected to Mongo DB!');
})
  .catch(() => {
    console.log('Connection failed!');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, FETCH, DELETE, OPTIONS, HEAD');
  next();
});

app.post('/api/posts/', (req, res, next) => {
  // const posts = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });

});

app.get('/api/posts/', (req, res, next) => {
  Post.find()
  .then(documents => {
    // console.log(documents);
    res.status(200).json({
      messages: 'Posts fetch successfully!',
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

// app.delete('/api/posts/:id', (req, res, next) => {
//   console.log('app.delete: ' + req.params.id);
//   Post.deleteOne({ _id: req.params.id }).then(result => {
//     console.log(result);
//     res.status(200).json({ message: "Post " + req.params.id + " deleted!"});
//   });
// });

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = app;
