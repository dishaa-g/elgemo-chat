"use client"

import { useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Auto-detect protocol
    const protocol = window.location.protocol === "https:" ? "wss" : "ws"
const host = process.env.NEXT_PUBLIC_SOCKET_HOST ?? "localhost";
const port = process.env.NEXT_PUBLIC_SOCKET_PORT ?? "3001";
const socketUrl = host.startsWith("http") ? host : `http://${host}:${port}`;


    const socketInstance = io(socketUrl, {
      secure: protocol === "wss",
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })
io(socketUrl, { transports: ["polling", "websocket"], withCredentials: true });

    socketInstance.on("connect", () => {
      console.log("[socket] connected:", socketUrl)
    })

    socketInstance.on("connect_error", (err) => {
      console.error("[socket] connection error:", err.message)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return socket
}
