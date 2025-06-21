import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function Chat() {
  const router = useRouter();
  const { name } = router.query;

  const socketRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3100");

    socketRef.current.onerror = (error) => {
      alert("failed to connect to WebSocketServer");
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  function createMessage() {
    const message = {
      text: input,
      from: name
    };
    return message;
  }

  function sendMessage(event) {
    event.preventDefault();
    const message = createMessage();
    socketRef.current.send(JSON.stringify(message));
    setInput("");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Live Chat</h2>

        <div className="h-120 overflow-y-auto border border-gray-300 rounded mb-6 p-4 bg-gray-50 flex flex-col space-y-4">
          {messages.map((msg, idx) => {
            const isMe = msg.from === name;
            return (
              <div key={idx} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                <div className="text-sm font-semibold text-gray-700 mb-1">
                  {msg.from}
                </div>
                <div
                  className={`p-3 rounded text-base max-w-[75%] ${
                    isMe
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-200 text-gray-900 self-start"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={sendMessage} className="flex space-x-3">
          <input
            className="flex-grow px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-3 rounded hover:bg-blue-600 transition-colors text-base"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
