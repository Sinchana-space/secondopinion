// src/app/chat/page.tsx
'use client';

import React, { useState } from 'react';
import ChatSideBar, { allConversations } from '@/components/layout/ChatSideBar';
import ChatWindow from '@/components/ui/ChatWindow';

// --- FIX: STEP 1 ---
// Define the specific types for User and Role.
type UserRole = 'doctor' | 'patient';

interface User {
  id: string;
  role: UserRole;
}

// --- FIX: STEP 2 ---
// Apply the User type to your user objects.
const doctorUser: User = { id: 'doc1', role: 'doctor' };
const patientUser: User = { id: 'pat1', role: 'patient' };

export default function ChatPage() {
  // --- FIX: STEP 3 ---
  // Apply the User type to the useState hook.
  // Now TypeScript knows that currentUser.role can only be 'doctor' or 'patient'.
  const [currentUser, setCurrentUser] = useState<User>(doctorUser);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const conversationsForCurrentUser = allConversations.filter(convo =>
    convo.participants.doctor.id === currentUser.id ||
    convo.participants.patient.id === currentUser.id
  );

  return (
    <div className="flex h-screen bg-white flex-col">
      <div className="p-2 bg-gray-800 text-white text-center">
        You are logged in as: <strong className="uppercase">{currentUser.role}</strong>
        <button
          onClick={() => setCurrentUser(currentUser.role === 'doctor' ? patientUser : doctorUser)}
          className="ml-4 bg-blue-500 px-3 py-1 rounded text-sm"
        >
          Switch User
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ChatSideBar
          conversations={conversationsForCurrentUser}
          onSelectChat={setSelectedChatId}
          activeChatId={selectedChatId}
          currentUserRole={currentUser.role} // <-- This will no longer have an error
        />
        <main className="flex-1 flex flex-col">
          {selectedChatId ? (
            <ChatWindow
              chatId={selectedChatId}
              currentUser={currentUser.role} // <-- This will no longer have an error
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}