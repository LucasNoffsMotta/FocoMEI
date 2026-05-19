"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Send, 
  Paperclip, 
  Smile, 
  Mic, 
  MoreVertical, 
  Phone, 
  Video, 
  Search,
  Check,
  CheckCheck
} from "lucide-react"
import type { Contact } from "./chat-sidebar"
import { cn } from "@/lib/utils"

export interface Message {
  id: string
  content: string
  timestamp: string
  sent: boolean
  read?: boolean
}

interface ChatWindowProps {
  contact: Contact | null
  messages: Message[]
  onSendMessage: (message: string) => void | Promise<void>
}

export function ChatWindow({ contact, messages, onSendMessage }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (newMessage.trim()) {
      await onSendMessage(newMessage)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!contact) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-muted p-6">
            <Send className="h-12 w-12 text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-light text-foreground">Chat Web</h2>
            <p className="mt-2 text-muted-foreground">
              Envie e receba mensagens diretamente do seu computador.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-1 flex-col bg-background">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback className="bg-muted text-muted-foreground">
              {contact.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-card-foreground">{contact.name}</h3>
            <p className="text-xs text-muted-foreground">
              {contact.online ? "Online" : "Visto por último hoje"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="rounded-full p-2 hover:bg-accent transition-colors">
            <Video className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="rounded-full p-2 hover:bg-accent transition-colors">
            <Phone className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="rounded-full p-2 hover:bg-accent transition-colors">
            <Search className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="rounded-full p-2 hover:bg-accent transition-colors">
            <MoreVertical className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto p-4"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sent ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[65%] rounded-lg px-3 py-2 shadow-sm",
                  message.sent
                    ? "bg-message-sent text-accent-foreground rounded-br-none"
                    : "bg-message-received text-card-foreground rounded-bl-none"
                )}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <div className={cn(
                  "mt-1 flex items-center justify-end gap-1",
                  message.sent ? "text-accent-foreground/70" : "text-muted-foreground"
                )}>
                  <span className="text-[10px]">{message.timestamp}</span>
                  {message.sent && (
                    message.read ? (
                      <CheckCheck className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <Check className="h-3.5 w-3.5" />
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <button className="rounded-full p-2 hover:bg-accent transition-colors">
            <Smile className="h-6 w-6 text-muted-foreground" />
          </button>
          <button className="rounded-full p-2 hover:bg-accent transition-colors">
            <Paperclip className="h-6 w-6 text-muted-foreground" />
          </button>
          <Input
            placeholder="Digite uma mensagem"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-input border-0 focus-visible:ring-1"
          />
          {newMessage.trim() ? (
            <Button
              onClick={handleSend}
              size="icon"
              className="rounded-full bg-primary hover:bg-primary/90"
            >
              <Send className="h-5 w-5" />
            </Button>
          ) : (
            <button className="rounded-full p-2 hover:bg-accent transition-colors">
              <Mic className="h-6 w-6 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
