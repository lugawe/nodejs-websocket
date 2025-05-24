import { WebSocketServer, WebSocket } from "ws"

const wss = new WebSocketServer({ port: 3000 })

let id: number = 0

const sockets: Map<number, WebSocket> = new Map()

function logInfo(wsId: number, message: any) {
  console.log(`INFO  ID-${wsId}:`, message)
}

function logError(wsId: number, message: any) {
  console.error(`ERROR ID-${wsId}:`, message)
}

function addSocket(wsId: number, ws: WebSocket) {
  sockets.set(wsId, ws)
  logInfo(wsId, "add")
}

function removeSocket(wsId: number) {
  sockets.delete(wsId)
  logInfo(wsId, "remove")
}

wss.on("connection", (ws: WebSocket) => {
  // create unique websocket id
  const wsId: number = ++id

  addSocket(wsId, ws)

  ws.on("error", (error: Error) => {
    logError(wsId, error)
  })

  ws.on("close", () => {
    removeSocket(wsId)
  })

  ws.on("message", (message: WebSocket.RawData) => {
    sendToAll(wsId, message.toString())
  })
})

function sendToAll(sender: number, message: string) {
  const data = JSON.stringify({ sender, message })
  for (const [key, socket] of sockets) {
    if (key !== sender) {
      try {
        socket.send(data)
      } catch (err) {
        logError(sender, err)
      }
    }
  }
}
