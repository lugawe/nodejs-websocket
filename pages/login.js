import { useEffect, useRef, useState } from "react"
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState("");
  function joinChat(event){
    event.preventDefault();
    router.push({
      pathname: '/chat',
      query: { name: name},
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">WebSocket Chat</h2>
        <form onSubmit={joinChat}>
          <input
            type="text"
            placeholder="Username"
            value = {name}
            onChange={(e) => setName(e.target.value)}

            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
}


