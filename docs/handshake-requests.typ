#set page(width: 280pt, height: 180pt, margin: 4pt, fill: rgb("#fffbf7"))

_Example Client HTTP Request:_

```http
GET ws://localhost:3100/ HTTP/1.1
Host: localhost:3100
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: vLqHAGmM80G+pWUHg4HwiQ==
```

_Example Server HTTP Response:_

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: LvXUeQUEjAv+1DJ59E2sSmhnQDY=
```

