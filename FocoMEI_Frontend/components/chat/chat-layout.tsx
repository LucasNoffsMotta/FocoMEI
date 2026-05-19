"use client"

import { useState } from "react"
import { ChatSidebar, type Contact } from "./chat-sidebar"
import { ChatWindow, type Message } from "./chat-window"
import { getProducts, createSale, getSalesByUserId, createProduct } from "@/lib/api"


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


function isGreeting(message: string): boolean {
  const text = message.toLowerCase().trim()
  return text === "oi" || text === "oi!" || text === "olá" || text === "olá!"
}

function isTotalSales(message: string): boolean {
  const text = message.toLowerCase().trim()
  return text === "total vendas"
}

function isListProducts(message: string): boolean {
  const text = message.toLowerCase().trim()
  return text === "produtos"
}

function isCreateProduct(message: string): { description: string; value: number } | null {
  // Padrão: "cadastrar produto nome, valor: x"
  const pattern = /cadastrar\s+produto\s+(.+?),\s*valor:\s*(\d+(?:,\d+)?)/i
  const match = message.match(pattern)
  
  if (match) {
    const description = match[1].trim()
    const value = parseFloat(match[2].replace(",", "."))
    return { description, value }
  }
  
  return null
}

function isSaleMessage(message: string): { productId: number; quantidade: number } | null {
  // Padrão: "Vendi 5 do produto 1"
  const patterns = [
    /vendi\s+(\d+)\s+do\s+produto\s+(\d+)/i,
    /vendi\s+(\d+)\s+(?:un|unidade|unidades)?\s+(?:do\s+)?produto\s+(\d+)/i,
    /venda\s+de\s+(\d+)\s+(?:un|unidade|unidades)?\s+(?:do\s+)?produto\s+(\d+)/i,
  ]

  const text = message.trim()
  
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      const quantidade = parseInt(match[1], 10)
      const productId = parseInt(match[2], 10)
      return { productId, quantidade }
    }
  }

  return null
}

function getHelpMessage(): string {
  return "❓ Opções disponíveis:\n\n" +
         "• Digite `total vendas` para ver todas as suas vendas\n" +
         "• Digite `cadastrar produto nome, valor: x` para cadastrar um novo produto\n" +
         "• Digite `produtos` para ver todos os produtos\n" +
         "• Digite `Vendi X do produto Y` para registrar uma venda"
}

async function getMockBotResponse(message: string, productsCache: any[] = []) {
  const text = message.toLowerCase()

  // Greeting - show products
  if (isGreeting(message)) {
    try {
      const products = await getProducts()
      
      let response = "👋 Olá! Bem-vindo ao FocoMEI!\n\n"
      response += "📦 Produtos cadastrados:\n"
      response += "─".repeat(50) + "\n\n"
      
      products.forEach((product: any) => {
        const nome = product.description || product.nome || "Produto"
        const valor = product.value || product.valor || 0
        response += `🔹 ID: ${product.id} - ${nome}\n`
        response += `   💵 R$ ${valor.toFixed(2)}\n`
        response += "─".repeat(50) + "\n"
      })
      
      response += "\n" + getHelpMessage()
      return response
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
      return "❌ Erro ao carregar produtos. Tente novamente."
    }
  }

  // List products
  if (isListProducts(message)) {
    try {
      const products = await getProducts()
      
      let response = "📦 Todos os produtos cadastrados:\n"
      response += "─".repeat(50) + "\n\n"
      
      products.forEach((product: any) => {
        const nome = product.description || product.nome || "Produto"
        const valor = product.value || product.valor || 0
        response += `🔹 ID: ${product.id} - ${nome}\n`
        response += `   💵 R$ ${valor.toFixed(2)}\n`
        response += "─".repeat(50) + "\n"
      })
      
      response += "\n" + getHelpMessage()
      return response
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
      return "❌ Erro ao carregar produtos. Tente novamente."
    }
  }

  // Create product
  const productData = isCreateProduct(message)
  if (productData) {
    try {
      await createProduct({
        description: productData.description,
        value: productData.value,
      })

      let response = `✅ Produto cadastrado com sucesso! 📦\n\n`
      response += `─`.repeat(50) + "\n"
      response += `📦 Nome: ${productData.description}\n`
      response += `💵 Valor: R$ ${productData.value.toFixed(2)}\n`
      response += `─`.repeat(50) + "\n\n"
      response += getHelpMessage()

      return response
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error)
      return "❌ Erro ao cadastrar produto. Verifique o formato: \"cadastrar produto nome, valor: x\""
    }
  }

  // Total sales
  if (isTotalSales(message)) {
    try {
      const sales = await getSalesByUserId(1)
      
      if (sales.length === 0) {
        let response = "📊 Você ainda não tem vendas registradas.\n\n"
        response += getHelpMessage()
        return response
      }

      let response = "📊 Total de vendas:\n"
      response += "─".repeat(50) + "\n\n"
      
      let totalGeral = 0
      sales.forEach((sale: any, index: number) => {
        const nome = sale.itemDescription || "Produto desconhecido"
        response += `${index + 1}. ${nome}\n`
        response += `   📦 Quantidade: ${sale.quantidade} unidades\n`
        response += `   💵 Total: R$ ${sale.total.toFixed(2)}\n`
        response += "─".repeat(50) + "\n"
        totalGeral += sale.total
      })
      
      response += `\n💰 Total geral vendido: R$ ${totalGeral.toFixed(2)}\n\n`
      response += getHelpMessage()
      return response
    } catch (error) {
      console.error("Erro ao buscar vendas:", error)
      return "❌ Erro ao buscar vendas. Tente novamente."
    }
  }

  // Sale message
  const saleData = isSaleMessage(message)
  if (saleData) {
    try {
      // Buscar produtos para pegar o preço
      const products = await getProducts()
      const product = products.find((p: any) => p.id === saleData.productId)

      if (!product) {
        return `❌ Produto ID ${saleData.productId} não encontrado. Verifique o ID.`
      }

      const valor = product.value || product.valor || 0
      const nome = product.description || product.nome || "Produto"
      const total = valor * saleData.quantidade

      // Criar venda
      await createSale({
        userId: 1,
        total,
        productId: saleData.productId,
        quantidade: saleData.quantidade,
      })

      let response = `✅ Venda registrada com sucesso! 💰\n\n`
      response += `─`.repeat(50) + "\n"
      response += `📦 Produto: ${nome}\n`
      response += `📊 Quantidade: ${saleData.quantidade} unidades\n`
      response += `💵 Valor unitário: R$ ${valor.toFixed(2)}\n`
      response += `💰 Total: R$ ${total.toFixed(2)}\n`
      response += `─`.repeat(50) + "\n\n"
      response += getHelpMessage()

      return response
    } catch (error) {
      console.error("Erro ao registrar venda:", error)
      return "❌ Erro ao registrar venda. Tente novamente."
    }
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

  return getHelpMessage()
}

export function ChatLayout() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages)

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact)
  }

const handleSendMessage = async (content: string) => {
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

  // Add user message immediately
  setMessages((prev) => ({
    ...prev,
    [selectedContact.id]: [
      ...(prev[selectedContact.id] || []),
      userMessage,
    ],
  }))

  // Get bot response (async for sales)
  const botContent = await getMockBotResponse(content)

  const botMessage: Message = {
    id: (Date.now() + 1).toString(),
    content: botContent,
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
