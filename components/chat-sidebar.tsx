"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Hash, LogOut, Plus, MessageSquare } from "lucide-react"

interface ChatSidebarProps {
  user: any
  rooms: string[]
  currentRoom: string
  setCurrentRoom: (room: string) => void
  logout: () => void
}

export function ChatSidebar({ user, rooms, currentRoom, setCurrentRoom, logout }: ChatSidebarProps) {
  return (
    <div className="hidden md:flex w-72 flex-col border-r bg-muted/10">
      <div className="p-6 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground">
            <MessageSquare className="h-4 w-4" />
          </div>
          <h1 className="font-bold text-lg tracking-tight">elgemo</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={logout}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div className="px-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Channels</h2>
              <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="space-y-0.5">
              {rooms.map((room) => (
                <Button
                  key={room}
                  variant={currentRoom === room ? "secondary" : "ghost"}
                  className={`w-full justify-start h-9 px-3 rounded-md transition-all ${
                    currentRoom === room
                      ? "bg-primary/5 text-primary font-semibold border-l-2 border-primary rounded-l-none"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setCurrentRoom(room)}
                >
                  <Hash
                    className={`mr-2 h-3.5 w-3.5 ${currentRoom === room ? "text-primary" : "text-muted-foreground/50"}`}
                  />
                  <span className="text-sm tracking-tight">{room}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="px-2">
            <h2 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em] mb-3">
              Direct Messages
            </h2>
            <div className="space-y-0.5">
              <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-accent/50 mb-1 border border-accent">
                <div className="relative">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-background bg-emerald-500" />
                </div>
                <span className="text-xs font-medium">System Bot</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 m-4 rounded-xl border bg-card/50 flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-10 w-10 border-2 border-background">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-primary/5 text-primary font-bold">
              {user?.username?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-bold tracking-tight truncate">{user?.username}</p>
          <p className="text-[10px] text-muted-foreground truncate uppercase tracking-tighter">Active Now</p>
        </div>
      </div>
    </div>
  )
}
