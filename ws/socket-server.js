import { WebSocketServer } from "ws"

const wss = new WebSocketServer({ port: 3100 })

export default wss
