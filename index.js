// const express = require('express')
// require("dotenv").config();
const port = process.env.PORT || 3333;

const server = require("./server.js");
const secret = process.env.SECRET || "foo";
console.log(port, secret);

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
