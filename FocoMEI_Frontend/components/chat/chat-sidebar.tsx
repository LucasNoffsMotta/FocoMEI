"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, MoreVertical, MessageCirclePlus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Contact {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  time: string
  unread?: number
  online?: boolean
}

interface ChatSidebarProps {
  contacts: Contact[]
  selectedContact: Contact | null
  onSelectContact: (contact: Contact) => void
}

export function ChatSidebar({ contacts, selectedContact, onSelectContact }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-full w-full flex-col border-r border-border bg-sidebar">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-user.jpg" alt="Você" />
            <AvatarFallback className="bg-primary text-primary-foreground">EU</AvatarFallback>
          </Avatar>
          <span className="font-medium text-sidebar-foreground">Meu Perfil</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full p-2 hover:bg-sidebar-accent transition-colors">
            <MessageCirclePlus className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="rounded-full p-2 hover:bg-sidebar-accent transition-colors">
            <MoreVertical className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Pesquisar ou começar nova conversa"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-0 focus-visible:ring-1"
          />
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={cn(
              "flex w-full items-center gap-3 px-4 py-3 transition-colors hover:bg-sidebar-accent",
              selectedContact?.id === contact.id && "bg-sidebar-accent"
            )}
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {contact.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {contact.online && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-sidebar bg-primary" />
              )}
            </div>
            <div className="flex flex-1 flex-col items-start overflow-hidden">
              <div className="flex w-full items-center justify-between">
                <span className="font-medium text-sidebar-foreground">{contact.name}</span>
                <span className="text-xs text-muted-foreground">{contact.time}</span>
              </div>
              <div className="flex w-full items-center justify-between">
                <span className="truncate text-sm text-muted-foreground">{contact.lastMessage}</span>
                {contact.unread && contact.unread > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
                    {contact.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
