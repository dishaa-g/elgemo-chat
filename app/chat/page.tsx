// app/(whatever-your-path-is)/chat/page.tsx  (your ChatPage file)
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useSocket } from "@/hooks/use-socket";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";

interface Message {
  _id: string;
  content: string;
  sender: {
    _id: string;
    username: string;
    avatar?: string;
  };
  room?: string;
  messageType: "text" | "image" | "file";
  mediaUrl?: string;
  createdAt: string;
}

export default function ChatPage() {
  const { user, logout } = useAuth();
  const socket = useSocket();

  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms] = useState([
    "general",
    "development",
    "product-updates",
    "engineering",
  ]);
  const [currentRoom, setCurrentRoom] = useState("general");

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket) return;

    socket.emit("join_room", currentRoom);

    const onReceiveMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receive_message", onReceiveMessage);

    return () => {
      socket.off("receive_message", onReceiveMessage);
    };
  }, [socket, currentRoom]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleRoomChange = useCallback((room: string) => {
    setCurrentRoom(room);
    setMessages([]);
  }, []);

  const handleSend = useCallback(
    (content: string, type: "text" | "image" = "text", url?: string) => {
      if (!content.trim() && !url) return;
      if (!socket || !user) return;

      socket.emit("send_message", {
        content,
        sender: user.id,
        room: currentRoom,
        messageType: type,
        mediaUrl: url,
      });
    },
    [socket, user, currentRoom]
  );

  return (
    <div className="flex h-screen bg-background font-sans overflow-hidden">
      <ChatSidebar
        rooms={rooms}
        currentRoom={currentRoom}
        user={user}
        onRoomChange={handleRoomChange}
        onLogout={logout}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-background/50">
        <ChatHeader currentRoom={currentRoom} />
        <ChatMessages
          ref={scrollRef}
          messages={messages}
          currentRoom={currentRoom}
          currentUserId={user?.id}
        />
        <ChatInput currentRoom={currentRoom} onSend={handleSend} />
      </div>
    </div>
  );
}
