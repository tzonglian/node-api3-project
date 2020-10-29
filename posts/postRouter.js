const express = require("express");
const Posts = require("./postDb.js");
const router = express.Router();

// custom middleware

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({
      message: "message: missing post data",
    });
  } else if (!req.body.text) {
    res.status(400).json({
      message: "message: missing required text field",
    });
  } else {
    next();
  }
}
// Posts.insert(req.body)
//   .then((data) => {
//     if (!req.body) {
//       res.status(400).json({
//         message: "message: missing post data",
//       });
//     } else if (!req.body.text) {
//       res.status(400).json({
//         message: "message: missing required text field",
//       });
//     } else {
//       req.post = data;
//       next();
//     }
//   })
//   .catch((error) => {
//     console.log(error.message);
//     // res.status(500).json({ message: 'something bad happened' })
//     next({ code: 500, message: "Crashed on validating post" });
//   });

function validatePostId(req, res, next) {
  // AWAIT???
  Posts.getById(req.params.id)
    .then(console.log("hi"))
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .json({ message: "Post with specified ID does not exist." });
      } else {
        res.post = data;
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      next({ code: 500, message: "Crashed on validating post ID" });
    });
}

// Endpoints

// WORKS
router.get("/", (req, res, next) => {
  // do your magic!
  Posts.get(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      next({ code: 500, message: "Crashed on getting posts" });
    });
});

// WORKS (sometimes?)
router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  // AWAIT??
  Posts.getById(req.params.id).then(res.status(200).json(res.post));
});

// WORKS (sometimes?)
router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  Posts.remove(req.params.id).then((numDeleted) =>
    res.status(200).json({
      message: `Posts nuked, Number of Deleted Posts: ${numDeleted}`,
    })
  );
});

router.put("/:id", validatePost, validatePostId, (req, res) => {
  // do your magic!
  Posts.update(req.params.id, req.body).then((numChanged) => {
    res.status(200).json({
      message: `Post updated, Number of Changed Posts: ${numChanged}`,
    });
  });
});

// Error middleware
router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = router;
