"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Send, ImageIcon, Smile, Mic, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import dynamic from "next/dynamic"

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false })

interface ChatInputProps {
  currentRoom: string
  onSend: (content: string, type?: "text" | "image", url?: string) => void
}

export function ChatInput({ currentRoom, onSend }: ChatInputProps) {
  const [content, setContent] = useState("")
  const [showEmoji, setShowEmoji] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!content.trim()) return
    onSend(content)
    setContent("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="p-6 pt-2 bg-background/50 border-t">
      <div className="max-w-4xl mx-auto relative">
        {showEmoji && (
          <div className="absolute bottom-full right-0 mb-4 z-50">
            <EmojiPicker
              onEmojiClick={(emojiData) => {
                setContent((prev) => prev + emojiData.emoji)
                setShowEmoji(false)
              }}
              autoFocusSearch={false}
              theme="light"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:bg-muted"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message #${currentRoom}`}
            className="min-h-[52px] w-full resize-none rounded-2xl bg-muted/50 border-border/50 pl-12 pr-32 py-4 text-sm focus-visible:ring-primary/20 focus-visible:bg-background transition-all"
            rows={1}
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:bg-muted"
              onClick={() => setShowEmoji(!showEmoji)}
            >
              <Smile className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:bg-muted"
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:bg-muted"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button
              type="submit"
              size="icon"
              disabled={!content.trim()}
              className="h-8 w-8 rounded-full ml-1 shadow-lg shadow-primary/20 disabled:opacity-50 transition-all"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>

        <p className="mt-3 text-[10px] text-center text-muted-foreground font-medium uppercase tracking-[0.1em] opacity-50">
          Press Enter to send &middot; Shift + Enter for new line
        </p>
      </div>
    </div>
  )
}
