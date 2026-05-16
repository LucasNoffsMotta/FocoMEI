"use client"

import { useEffect, useState } from "react"
import { ChatSidebar, type Contact } from "./chat-sidebar"
import { ChatWindow, type Message } from "./chat-window"
import { getProducts, getSales } from "@/lib/api"


const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Maria Silva",
    lastMessage: "Oi! Tudo bem com você?",
    time: "14:32",
    unread: 2,
    online: true,
  },
    {
    id: "focomei",
    name: "FocoMEI Assistente",
    lastMessage: "Olá! Sou seu assistente financeiro MEI.",
    time: "Agora",
    unread: 0,
    online: true,
  },
  {
    id: "2",
    name: "João Pedro",
    lastMessage: "Vamos marcar aquela reunião?",
    time: "13:15",
    online: true,
  },
  {
    id: "3",
    name: "Ana Costa",
    lastMessage: "Obrigada pela ajuda!",
    time: "12:45",
    unread: 1,
  },
  {
    id: "4",
    name: "Carlos Mendes",
    lastMessage: "Enviei o documento por email",
    time: "11:30",
  },
  {
    id: "5",
    name: "Fernanda Lima",
    lastMessage: "Que legal! Adorei a ideia",
    time: "Ontem",
    online: true,
  },
  {
    id: "6",
    name: "Ricardo Santos",
    lastMessage: "Pode me ligar mais tarde?",
    time: "Ontem",
  },
  {
    id: "7",
    name: "Grupo da Família",
    lastMessage: "Pai: Bom dia a todos!",
    time: "Ontem",
    unread: 5,
  },
  {
    id: "8",
    name: "Lucas Oliveira",
    lastMessage: "Vou verificar e te aviso",
    time: "Segunda",
  },
]

const mockMessages: Record<string, Message[]> = {
  "1": [
    { id: "1", content: "Oi Maria! Tudo ótimo e com você?", timestamp: "14:25", sent: true, read: true },
    { id: "2", content: "Oi! Tudo bem com você?", timestamp: "14:32", sent: false },
    { id: "3", content: "Estava pensando em você!", timestamp: "14:32", sent: false },
  ],
  "2": [
    { id: "1", content: "Bom dia João!", timestamp: "13:00", sent: true, read: true },
    { id: "2", content: "Bom dia! Como vai?", timestamp: "13:05", sent: false },
    { id: "3", content: "Muito bem! Precisamos conversar sobre o projeto", timestamp: "13:10", sent: true, read: true },
    { id: "4", content: "Vamos marcar aquela reunião?", timestamp: "13:15", sent: false },
  ],
  "3": [
    { id: "1", content: "Ana, consegui resolver aquele problema", timestamp: "12:30", sent: true, read: true },
    { id: "2", content: "Sério? Que bom!", timestamp: "12:35", sent: false },
    { id: "3", content: "Sim! Era só reiniciar o sistema", timestamp: "12:40", sent: true, read: true },
    { id: "4", content: "Obrigada pela ajuda!", timestamp: "12:45", sent: false },
  ],
  focomei: [
    {
      id: "1",
      content: "Olá! Eu sou o FocoMEI. Posso te ajudar a registrar vendas, despesas e consultar seu resumo financeiro.",
      timestamp: "09:00",
      sent: false,
    },
  ],
}


function getMockBotResponse(message: string) {
  const text = message.toLowerCase()

  if (text.includes("vendi") || text.includes("recebi")) {
    return "Venda registrada com sucesso! Receita adicionada ao seu fluxo de caixa. 💰"
  }

  if (text.includes("gastei") || text.includes("paguei")) {
    return "Despesa registrada com sucesso. Vou considerar isso no cálculo do seu lucro. 📉"
  }

  if (text.includes("das") || text.includes("mei")) {
    return "O DAS-MEI vence todo dia 20. Manter esse pagamento em dia ajuda a evitar inadimplência."
  }

  if (text.includes("resumo") || text.includes("mês") || text.includes("relatório")) {
    return "Resumo do mês: receitas R$ 1.250,00, despesas R$ 430,00 e lucro estimado de R$ 820,00."
  }

  return "Entendi. Você pode me enviar mensagens como: 'vendi 3 marmitas por 45 reais' ou 'gastei 20 reais com combustível'."
}

export function ChatLayout() {
  const testarBackend = async () => {
  const products = await getProducts()
  const sales = await getSales()

  console.log("Produtos:", products)
  console.log("Vendas:", sales)
}


useEffect(() => {
  async function carregarDados() {
    try {
      const products = await getProducts()
      const sales = await getSales()

      console.log("Produtos:", products)
      console.log("Vendas:", sales)
    } catch (error) {
      console.error("Erro ao conectar com backend:", error)
    }
  }

  carregarDados()
}, [])

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages)

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact)
  }

const handleSendMessage = (content: string) => {
  if (!selectedContact) return

  const userMessage: Message = {
    id: Date.now().toString(),
    content,
    timestamp: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    sent: true,
    read: true,
  }

  const botMessage: Message = {
    id: (Date.now() + 1).toString(),
    content: getMockBotResponse(content),
    timestamp: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    sent: false,
  }

  setMessages((prev) => ({
    ...prev,
    [selectedContact.id]: [
      ...(prev[selectedContact.id] || []),
      userMessage,
      botMessage,
    ],
  }))
}

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar - Fixed width on desktop, full width on mobile when no chat selected */}
      <div className={`
        ${selectedContact ? 'hidden md:flex' : 'flex'} 
        w-full md:w-[380px] lg:w-[420px] flex-shrink-0
      `}>
        <ChatSidebar
          contacts={mockContacts}
          selectedContact={selectedContact}
          onSelectContact={handleSelectContact}
        />
      </div>

      {/* Chat Window - Hidden on mobile when no chat selected */}
      <div className={`
        ${selectedContact ? 'flex' : 'hidden md:flex'} 
        flex-1
      `}>
        <ChatWindow
          contact={selectedContact}
          messages={selectedContact ? messages[selectedContact.id] || [] : []}
          onSendMessage={handleSendMessage}
        />
      </div>

      {/* Mobile back button overlay */}
      {selectedContact && (
        <button
          onClick={() => setSelectedContact(null)}
          className="fixed left-4 top-4 z-50 rounded-full bg-card p-2 shadow-md md:hidden"
          aria-label="Voltar para lista de conversas"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
      )}
    </div>
  )
}
