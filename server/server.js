// check data base adapter for saving the data to the database

const express = require("express");
const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  // options go here
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  //   console.log("what is socket", socket);
  //   console.log("active to be connected");
  socket.on("chat", (payload) => {
    console.log("what is payload", payload);

    io.emit("chat", payload);
  });
  socket.on("user", (payload) => {
    console.log("what is payload of user", payload);
    io.emit("user", payload);
  });
});

// app.listen(3000, () => {
//   console.log("server is running on port 3000");
// }

server.listen(3000, () => {
  console.log("server is running on port 3000...");
});
