import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Define a type for our message object for better type safety
interface Message {
  content: string;
  sender: string;
  timestamp: string;
}

// The custom hook definition
export const useSocket = (roomId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Establish a connection to the Socket.IO server.
    // The io() function will connect to the server that serves the page.
    const newSocket = io();

    // Event listener for when the connection is successfully established
    newSocket.on('connect', () => {
      console.log('Successfully connected to socket server with ID:', newSocket.id);
      // Once connected, join the specific chat room
      newSocket.emit('join-room', roomId);
    });

    // Event listener for receiving the initial chat history for the room
    newSocket.on('chat-history', (history: Message[]) => {
      setMessages(history);
    });

    // Event listener for receiving a new message from the server
    newSocket.on('receive-message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      // Simple Notification Logic: Change the tab title if the window is not active
      if (document.hidden) {
        document.title = 'New Message!';
      }
    });

    // Save the socket instance to state
    setSocket(newSocket);

    // Function to reset the document title when the user focuses on the tab
    const onFocus = () => {
      document.title = 'Second Opinion'; // Your original app title
    };

    window.addEventListener('focus', onFocus);

    // Cleanup function that runs when the component unmounts or the roomId changes
    return () => {
      console.log('Disconnecting socket...');
      newSocket.disconnect();
      window.removeEventListener('focus', onFocus);
    };
  }, [roomId]); // This effect re-runs if the roomId changes

  /**
   * Function to send a message to the server.
   * @param messageContent The text content of the message.
   * @param sender A string identifying who sent the message (e.g., 'doctor' or 'patient').
   */
  const sendMessage = (messageContent: string, sender: string) => {
    // Ensure the socket is connected before trying to send a message
    if (socket) {
      const message: Message = {
        content: messageContent,
        sender: sender,
        timestamp: new Date().toISOString(),
      };
      // Emit the 'send-message' event to the server with the room and message data
      socket.emit('send-message', { roomId, message });
    } else {
      console.error('Socket not connected. Cannot send message.');
    }
  };

  // Return the messages and the sendMessage function to be used in the component
  return { messages, sendMessage };
};