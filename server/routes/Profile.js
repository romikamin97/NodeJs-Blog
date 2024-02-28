const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

const identifyUser = require('../middleware/IdentifyUser')

const loginController = require("../controllers/login")

/**
 * GET /
 * User Profile
*/
router.get('', identifyUser, async (req, res) => {
  try {
      const locals = {
        title: ' My Profile',
        description: 'My Simple Blog....'
      }
      const data = await Post.user.find();
      
      res.render('Profile', {
        locals,
        data,
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });

/**
 * GET /
 * User - Create New Post
*/
router.get('postController/add-post', async (req, res) => {
  try {
    const locals = {
      title: 'Add Post',
      description: 'Write a new post'
    }

    const data = await Post.find();
    res.render('postController/add-post', {
      locals
    });

  } catch (error) {
    console.log(error);
  }

});


// /**
//  * POST /
//  * User - Create New Post
// */
// router.post('postController/add-post', async (req, res) => {
//   try {
//     try {
//       const newPost = new Post({
//         title: req.body.title,
//         body: req.body.body
//       });

//       await Post.create(newPost);
//       res.redirect('/Profile');
//     } catch (error) {
//       console.log(error);
//     }

//   } catch (error) {
//     console.log(error);
//   }
// });


// /**
//  * GET /
//  * User - Edit Post
// */
// router.get('/edit-post/:id', async (req, res) => {
//   try {

//     const locals = {
//       title: "Edit Post",
//       description: "Free NodeJs User Management System",
//     };

//     const data = await Post.findOne({ _id: req.params.id });

//     res.render('admin/edit-post', {
//       locals,
//       data,
//       layout: adminLayout
//     })

//   } catch (error) {
//     console.log(error);
//   }

// });


// /**
//  * PUT /
//  * User - Edit Post
// */
// router.put('/edit-post/:id', async (req, res) => {
//   try {

//     await Post.findByIdAndUpdate(req.params.id, {
//       title: req.body.title,
//       body: req.body.body,
//       updatedAt: Date.now()
//     });

//     res.redirect(`/edit-post/${req.params.id}`);

//   } catch (error) {
//     console.log(error);
//   }

// });


// /**
//  * DELETE /
//  * User - Delete Post
// */
// router.delete('/delete-post/:id', async (req, res) => {

//   try {
//     await Post.deleteOne( { _id: req.params.id } );
//     res.redirect('/dashboard');
//   } catch (error) {
//     console.log(error);
//   }

// });


module.exports = router;

