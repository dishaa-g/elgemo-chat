"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type SenderObj = {
  _id?: string;
  id?: string;
  username?: string;
  avatar?: string;
} | null;

type Message = {
  _id?: string;
  content?: string;
  sender?: SenderObj | string;
  room?: string;
  messageType?: "text" | "image" | "file";
  mediaUrl?: string;
  createdAt?: string;
};

type Props = {
  messages: Message[];
  currentRoom: string;
  currentUserId?: string;
};

function getSenderId(sender: Message["sender"]): string {
  if (!sender) return "";
  if (typeof sender === "string") return sender;
  return sender._id || sender.id || "";
}

function getSenderName(sender: Message["sender"]): string {
  if (!sender) return "Unknown";
  if (typeof sender === "string") return "Unknown";
  return sender.username || "Unknown";
}

function getSenderAvatar(sender: Message["sender"]): string {
  if (!sender || typeof sender === "string") return "";
  return sender.avatar || "";
}

export const ChatMessages = React.forwardRef<HTMLDivElement, Props>(
  ({ messages, currentUserId }, ref) => {
    return (
      <div ref={ref} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, index) => {
          const senderId = getSenderId(msg.sender);
          const isMe = !!currentUserId && senderId === currentUserId;

          const prev = index > 0 ? messages[index - 1] : null;
          const prevSenderId = prev ? getSenderId(prev.sender) : "";
          const showAvatar = !prev || prevSenderId !== senderId;

          const senderName = getSenderName(msg.sender);
          const avatarUrl = getSenderAvatar(msg.sender);

          const hasMedia =
            !!msg.mediaUrl &&
            (msg.messageType === "image" || msg.messageType === "file");
          const text = msg.content || "";

          return (
            <div
              key={msg._id || `${senderId || "unknown"}-${index}`}
              className={`flex items-end gap-2 ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              {!isMe && (
                <div className="w-8">
                  {showAvatar ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={avatarUrl || "/placeholder.svg"} />
                      <AvatarFallback>
                        {senderName?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-8 w-8" />
                  )}
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-2xl px-3 py-2 ${
                  isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {!isMe && showAvatar && (
                  <div className="text-[11px] font-semibold opacity-80 mb-1">
                    {senderName}
                  </div>
                )}

                {hasMedia ? (
                  msg.messageType === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={msg.mediaUrl}
                      alt="uploaded"
                      className="max-h-64 rounded-lg border"
                    />
                  ) : (
                    <a
                      href={msg.mediaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm underline break-all"
                    >
                      Open file
                    </a>
                  )
                ) : (
                  <div className="text-sm whitespace-pre-wrap break-words">
                    {text}
                  </div>
                )}
              </div>

              {isMe && <div className="w-8" />}
            </div>
          );
        })}
      </div>
    );
  }
);

ChatMessages.displayName = "ChatMessages";
