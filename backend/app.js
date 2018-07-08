const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
// const Post = require('./models/post');

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, FETCH, DELETE, OPTIONS, PUT, HEAD');
  next();
});

// app.post('/api/posts/', (req, res, next) => {
//   // const posts = req.body;
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content
//   });
//   post.save().then(createdPost => {
//     res.status(201).json({
//       message: "Post added successfully",
//       postId: createdPost._id
//     });
//   });

// });

// app.put("/api/posts/:id", (req, res, next) => {
//   const post = new Post({
//     _id: req.body.id,
//     title: req.body.title,
//     content: req.body.content
//   });
//   Post.updateOne({_id: req.params.id}, post).then(result => {
//     console.log(result);
//     res.status(200).json({message: 'Update ' + req.params.id + ' successful'});
//   });
// });

// app.get('/api/posts/:id', (req, res, next) => {
//   Post.findById(req.params.id).then(post => {
//     if (post) {
//       res.status(200).json(post);
//     } else {
//       res.status(404).json({message: 'Post ' + req.params.id + 'not found!'});
//     }
//   });
// });

// app.get('/api/posts/', (req, res, next) => {
//   Post.find()
//   .then(documents => {
//     // console.log(documents);
//     res.status(200).json({
//       messages: 'Posts fetch successfully!',
//       posts: documents
//     });
//   });
//   // const posts = [
//   //   { id: '33a34ba',
//   //     title: 'First server-side post',
//   //     content: 'This first content is from Express'
//   //   },
//   //   { id: '567567a',
//   //     title: 'Second server-side post',
//   //     content: 'This content is from Express'
//   //   }
//   // ];
//   // res.status(200).json({
//   //   messages: 'Posts fetch successfully!',
//   //   posts: posts
//   // });
// });

// // app.delete('/api/posts/:id', (req, res, next) => {
// //   console.log('app.delete: ' + req.params.id);
// //   Post.deleteOne({ _id: req.params.id }).then(result => {
// //     console.log(result);
// //     res.status(200).json({ message: "Post " + req.params.id + " deleted!"});
// //   });
// // });

// app.delete("/api/posts/:id", (req, res, next) => {
//   Post.deleteOne({ _id: req.params.id }).then(result => {
//     console.log(result);
//     res.status(200).json({ message: "Post deleted!" });
//   });
// });

app.use('/api/posts',postsRoutes);
module.exports = app;
