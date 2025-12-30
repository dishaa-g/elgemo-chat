import { forwardRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "./chat-message"

interface ChatMessagesProps {
  messages: any[]
  currentRoom: string
  currentUserId?: string
}

export const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(
  ({ messages, currentRoom, currentUserId }, ref) => {
    return (
      <ScrollArea ref={ref} className="flex-1 px-6">
        <div className="py-8 space-y-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center py-10 space-y-3 opacity-50 select-none">
            <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
              <span className="text-2xl">👋</span>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-bold tracking-tight">Welcome to #{currentRoom}</h3>
              <p className="text-[11px] uppercase tracking-widest font-semibold text-muted-foreground">
                This is the start of the conversation
              </p>
            </div>
          </div>

          {messages.map((msg, index) => {
            const isMe = msg.sender._id === currentUserId
            const prevMsg = messages[index - 1]
            const showAvatar = !prevMsg || prevMsg.sender._id !== msg.sender._id

            return (
              <ChatMessage key={msg._id || index} msg={msg} user={msg.sender} isMe={isMe} showAvatar={showAvatar} />
            )
          })}
        </div>
      </ScrollArea>
    )
  },
)

ChatMessages.displayName = "ChatMessages"
