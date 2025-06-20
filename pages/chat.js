import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function Chat() {
  const socketRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const router = useRouter();
  const { name } = router.query;

  // 클라이언트가 연결
  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3100");

    // 서버에서 메세지를 받고 클라이언트에게 보냄 text: 서버가 보낸 메세지
    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
      console.log(event.data);
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  function createMessage() {
    const message = {
      text: input,
      from: name,
    };
    return message;
  }

  function sendMessage(event) {
    event.preventDefault();
    socketRef.current.send(JSON.stringify(createMessage()));
    setInput("");
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4 text-center">Live Chat</h1>

      <div className="h-64 overflow-y-auto border rounded mb-4 p-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-2 rounded text-sm ${
              msg.from === "me"
                ? "bg-blue-500 text-white self-end ml-auto max-w-xs"
                : "bg-gray-200 text-gray-900 self-start mr-auto max-w-xs"
            }`}
          >
            {msg.from + ": " + msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-grow border px-3 py-2 rounded"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}
