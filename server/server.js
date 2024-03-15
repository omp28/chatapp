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
  console.log("ID: ", socket.id);

  // broadcast socket id to all the users
  socket.broadcast.emit("userName", socket.id);

  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    console.log(`${socket.id} joined room: ${roomName}`);
  });

  socket.on("chat", (payload) => {
    const { message, userName, roomName } = payload;
    io.to(roomName).emit("chat", payload);
  });

  // handle user disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
    console.log("ID: ", socket.id);
    socket.broadcast.emit("disconnectd user", `om patel,${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("server is running on port 3000...");
});
