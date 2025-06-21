import { WebSocketServer } from "ws";

const port = 3100;

const wss = new WebSocketServer({ port: port });
console.log("WebSocketServer is running on port " + port);

wss.on("connection", (socket) => {
  console.log("new client connected");

  socket.on("message", (message) => {
    console.log("received message: ", message.toString());
    sendToAll(message);
  });
});

function sendToAll(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message.toString());
    }
  });
}

export default wss;
