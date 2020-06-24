var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

const messages = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  io.to(socket.id).emit("savedMessages", messages);

  socket.on("chat message", (msg) => {
    messages.push(msg);
    io.emit("chat message", msg);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
