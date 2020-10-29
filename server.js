const express = require("express");

const postRouter = require("./posts/postRouter.js");
const userRouter = require("./users/userRouter.js");

const server = express();

//custom middleware
function logger(req, res, next) {
  console.log(
    "Req Method:",
    req.method,
    ",  Req URL:",
    req.url,
    ",  Req Timestamp:",
    new Date().toString()
  );
  next();
}

server.use(express.json());
server.use(logger);
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// server.use((err, req, res) => {
//   res.status(500).json({ message: "Something big broke: ", err });
// });

module.exports = server;
