const http = require("http");
const Server = require("socket.io").Server;
const chokidar = require("chokidar");
const path = require("path");
const PORT = 4293;
const EXTENSION_DIRECTORY = path.resolve(__dirname, "app");
const WebSocket = require("ws");
const wsServer = new WebSocket.Server({
  port: PORT,
});

let sockets = [];

function debounce(func, timeout = 400) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

chokidar
  .watch(EXTENSION_DIRECTORY, {
    ignoreInitial: true,
  })
  .on(
    "all",
    debounce((event, path) => {
      const message = `${event} ${path}`;
      const isBackground = path.includes("backgroundServices");
      const fileScope = isBackground ? "background" : "contentScript";

      console.log(message);
      if (sockets.length) {
        sockets[0].send(
          JSON.stringify({
            type: "reload-tab",
            data: {
              file: {
                scop: fileScope,
              },
            },
          })
        );
      }
    })
  );

wsServer.on("connection", function (socket) {
  sockets.push(socket);
  console.log("got connection");
  socket.on("close", function () {
    console.log("Client has disconnected.");
    sockets = sockets.filter((s) => s !== socket);
  });
});
