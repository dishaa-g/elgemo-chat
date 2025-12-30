"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { memo } from "react"

interface MessageProps {
  msg: any
  user: any
  isMe: boolean
  showAvatar: boolean
}

export const ChatMessage = memo(({ msg, user, isMe, showAvatar }: MessageProps) => {
  return (
    <div className={`flex gap-4 ${isMe ? "flex-row-reverse" : ""} group animate-in fade-in duration-300`}>
      <div className="shrink-0 w-10">
        {showAvatar && (
          <Avatar className="h-10 w-10 ring-2 ring-background shadow-sm">
            <AvatarImage src={msg.sender.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-[10px] font-bold">
              {msg.sender.username?.[0]?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      <div className={`flex flex-col max-w-[70%] ${isMe ? "items-end" : "items-start"}`}>
        {showAvatar && (
          <div className={`flex items-center gap-2 mb-1.5 ${isMe ? "flex-row-reverse" : ""}`}>
            <span className="text-[13px] font-bold tracking-tight">{msg.sender.username}</span>
            <span className="text-[10px] text-muted-foreground font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {format(new Date(msg.createdAt), "h:mm a")}
            </span>
          </div>
        )}
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm transition-all ${
            isMe
              ? "bg-primary text-primary-foreground rounded-tr-none hover:shadow-primary/20"
              : "bg-muted rounded-tl-none border border-border/50 hover:bg-muted/80"
          }`}
        >
          {msg.messageType === "image" && msg.mediaUrl ? (
            <div className="space-y-3">
              <img
                src={msg.mediaUrl || "/placeholder.svg"}
                alt="Shared media"
                className="max-w-full rounded-xl h-auto max-h-[400px] object-cover cursor-pointer hover:brightness-110 transition-all shadow-lg"
              />
              {msg.content && msg.content !== "Sent an image" && <p className="font-medium">{msg.content}</p>}
            </div>
          ) : (
            msg.content
          )}
        </div>
      </div>
    </div>
  )
})

ChatMessage.displayName = "ChatMessage"
