// src/components/ui/ChatWindow.tsx
import React, { useState } from 'react';
import { useSocket } from '@/hooks/useSocket'; // CORRECTED IMPORT PATH

interface ChatWindowProps {
  chatId: string;
  currentUser: 'doctor' | 'patient'; // To identify who is sending
}

export default function ChatWindow({ chatId, currentUser }: ChatWindowProps) {
  // This uses our custom hook to get messages and the send function
  const { messages, sendMessage } = useSocket(chatId);
  const [newMessage, setNewMessage] = useState('');

  // This function is called when the form is submitted
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading
    if (newMessage.trim()) {
      sendMessage(newMessage, currentUser);
      setNewMessage(''); // Clear the input box after sending
    }
  };

  // This is the JSX that renders the component
  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      {/* Message display area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-3 ${
              msg.sender === currentUser ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-lg shadow-md ${
                msg.sender === currentUser
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-black'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs text-right opacity-70 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message input form */}
      <form onSubmit={handleSendMessage} className="p-4 flex items-center border-t bg-white">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border-2 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          autoComplete="off"
        />
        <button
          type="submit"
          className="ml-4 bg-blue-600 text-white rounded-full p-3 flex-shrink-0 hover:bg-blue-700 transition"
        >
          {/* A simple send icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </form>
    </div>
  );
}