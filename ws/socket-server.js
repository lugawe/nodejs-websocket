import { handleClientScriptLoad } from "next/script";
import { WebSocketServer } from "ws";

// 서버인스턴스 만들고, 3100포트에서 클라이언트 연결 기다림
const wss = new WebSocketServer({ port: 3100 });
console.log("Server is running. port: 3100");

// 클라이언트가 서버에 연결할때 발생
wss.on("connection", (socket) => {
  console.log("Client connected");

  // 클라이언트가 서버에 메세지 보낼때 발생
  socket.on("message", (message) => {
    console.log("Received message:", message.toString());
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
