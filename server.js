const express = require("express");
const app = express();

const path = require("path");

const http = require("http");
const server = http.createServer(app);

const socketIo = require("socket.io");
const io = socketIo(server);

// Utils
const formatMsg = require("./utils/message");
const {
  userJoin,
  // curUser,
  getCurrentOnlineUser,
  userLeave,
} = require("./utils/users");

const chatBot = "Chat Bot";
app.use(express.static(path.join(__dirname, "public")));

// Run when Client Connected
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    //Send current online user(s)
    io.emit("onlineUsers", getCurrentOnlineUser(user.room));

    // Send ONLY to the connected user
    socket.emit(
      "message",
      formatMsg(chatBot, "welcome " + user.username + " Chat")
    );

    // Send to OTHER connected user
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMsg(chatBot, "A " + user.username + " has joined the chat")
      );

    //Catch the message
    socket.on("chatMessage", (msg) => {
      io.to(user.room).emit("message", formatMsg(user.username, msg));
    });
    //Runs when client disconnect
    socket.on("disconnect", () => {
      userLeave(user.id);
      io.emit("onlineUsers", getCurrentOnlineUser(user.room));
      io.to(user.room).emit(
        "message",
        formatMsg(chatBot, "A " + user.username + " has disconnected")
      );
    });
  });

  // Send to ALL the Client
  // io.emit()
});

const PORT = process.env.PORT || 3000;
server.listen(3000, () => console.log(`running on ${PORT}`));
