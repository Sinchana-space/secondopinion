// src/components/layout/ChatSideBar.tsx
import React from 'react';

// More realistic mock data
export const allConversations = [
  { 
    id: 'chat_doc1_pat1', // A unique ID for this specific chat
    participants: {
      doctor: { id: 'doc1', name: 'Dr. Smith' },
      patient: { id: 'pat1', name: 'John Doe' },
    }
  },
  { 
    id: 'chat_doc2_pat2',
    participants: {
      doctor: { id: 'doc2', name: 'Dr. Jones' },
      patient: { id: 'pat2', name: 'Jane Roe' },
    }
  },
];

interface ChatSideBarProps {
  conversations: any[]; // We'll pass filtered conversations
  onSelectChat: (chatId: string) => void;
  activeChatId: string | null;
  currentUserRole: 'doctor' | 'patient';
}

export default function ChatSideBar({ conversations, onSelectChat, activeChatId, currentUserRole }: ChatSideBarProps) {
  return (
    <div className="w-1/3 border-r-2 bg-gray-50 overflow-y-auto">
      <h2 className="p-4 text-xl font-semibold border-b">Conversations</h2>
      <ul>
        {conversations.map((convo) => {
          // Show the name of the OTHER person in the chat
          const otherPerson = currentUserRole === 'doctor' ? convo.participants.patient : convo.participants.doctor;

          return (
            <li
              key={convo.id}
              className={`p-4 cursor-pointer hover:bg-gray-200 ${
                activeChatId === convo.id ? 'bg-gray-200 font-bold' : ''
              }`}
              onClick={() => onSelectChat(convo.id)}
            >
              {otherPerson.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}