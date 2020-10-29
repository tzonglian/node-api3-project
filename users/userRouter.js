const express = require("express");
const Users = require("./userDb.js");
const router = express.Router();

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!

  next();
}

function validateUser(req, res, next) {
  // do your magic!
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  next();
}

// Endpoints

router.post("/", validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body).then(res.status(201).json(res.body)); //??
});

router.post("/:id/posts", validatePost, validateUserId, (req, res) => {
  // do your magic!
  Users.insert(req.body).then(res.status(201).json(res.body)); //????
});

// WORKS
router.get("/", (req, res, next) => {
  // do your magic!
  Users.get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      next({ code: 500, message: "Crash on getting users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id).then(res.status(200).json(res.id)); // wrong res?
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  Users.getUsersPosts(req.query) // ??
    .then(res.status(200).json(res.id.posts)); // wrong res?
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id).then(
    res.status(200).json({ message: "User nuked!" }) // how to return length??
  );
});

router.put("/:id", validateUser, validateUserId, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body).then(
    res.status(200).json({ message: "User updated" })
  );
});

router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = router;
