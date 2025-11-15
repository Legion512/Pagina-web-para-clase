"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const staticDeals = [
  { title: "Auriculares Inalámbricos Sony WH-1000XM5", price: 279.99, discount: 30, category: "Electrónica" },
  { title: "Smart Watch Xiaomi Band 8", price: 34.99, discount: 42, category: "Wearables" },
  { title: "Cafetera Express De'Longhi Dedica", price: 149.99, discount: 25, category: "Hogar" },
  { title: "Teclado Mecánico Gaming RGB", price: 79.99, discount: 38, category: "Gaming" },
  { title: "Aspiradora Robot Roomba i7", price: 399.99, discount: 33, category: "Hogar" },
  { title: 'Monitor Gaming 27" 144Hz QHD', price: 249.99, discount: 29, category: "Gaming" },
  { title: "Air Fryer Philips 4.1L", price: 89.99, discount: 36, category: "Hogar" },
  { title: "Zapatillas Running Nike Air Zoom", price: 69.99, discount: 42, category: "Deportes" },
  { title: "Tablet Samsung Galaxy Tab S9", price: 549.99, discount: 21, category: "Electrónica" },
  { title: "Juego PS5: Spider-Man 2", price: 49.99, discount: 38, category: "Gaming" },
  { title: 'Mochila Portátil 15.6" Impermeable', price: 29.99, discount: 40, category: "Accesorios" },
  { title: "Set de Sartenes Tefal 3 Piezas", price: 54.99, discount: 39, category: "Hogar" },
]

function generateResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes("hola") || lowerMessage.includes("buenos") || lowerMessage.includes("saludos")) {
    return "Hola! Soy tu asistente de compras en ChollosNet. Estoy aquí para ayudarte a encontrar las mejores ofertas. ¿Qué tipo de producto estás buscando?"
  }

  if (lowerMessage.includes("gaming") || lowerMessage.includes("videojuego") || lowerMessage.includes("juego")) {
    const gamingDeals = staticDeals.filter((d) => d.category === "Gaming")
    return `Tenemos estas increíbles ofertas de gaming:\n\n${gamingDeals.map((d) => `- ${d.title}: ${d.price}€ (${d.discount}% descuento)`).join("\n")}\n\n¿Te interesa alguna?`
  }

  if (lowerMessage.includes("hogar") || lowerMessage.includes("casa") || lowerMessage.includes("cocina")) {
    const hogarDeals = staticDeals.filter((d) => d.category === "Hogar")
    return `Para el hogar tenemos estas fantásticas ofertas:\n\n${hogarDeals.map((d) => `- ${d.title}: ${d.price}€ (${d.discount}% descuento)`).join("\n")}\n\n¿Necesitas más información sobre alguna?`
  }

  if (
    lowerMessage.includes("electrónica") ||
    lowerMessage.includes("electronica") ||
    lowerMessage.includes("auricular") ||
    lowerMessage.includes("tablet")
  ) {
    const electronicDeals = staticDeals.filter((d) => d.category === "Electrónica")
    return `En electrónica tenemos estas ofertas:\n\n${electronicDeals.map((d) => `- ${d.title}: ${d.price}€ (${d.discount}% descuento)`).join("\n")}\n\nTodos con grandes descuentos!`
  }

  if (lowerMessage.includes("deporte") || lowerMessage.includes("running") || lowerMessage.includes("zapatilla")) {
    const sportDeals = staticDeals.filter((d) => d.category === "Deportes")
    return `Para deportes te recomiendo:\n\n${sportDeals.map((d) => `- ${d.title}: ${d.price}€ (${d.discount}% descuento)`).join("\n")}\n\nPerfectas para mantenerte en forma!`
  }

  if (lowerMessage.includes("barato") || lowerMessage.includes("económico") || lowerMessage.includes("precio")) {
    const cheapest = [...staticDeals].sort((a, b) => a.price - b.price).slice(0, 3)
    return `Las ofertas más económicas son:\n\n${cheapest.map((d) => `- ${d.title}: ${d.price}€`).join("\n")}\n\nTodas con excelente calidad!`
  }

  if (lowerMessage.includes("descuento") || lowerMessage.includes("oferta") || lowerMessage.includes("rebaja")) {
    const bestDiscounts = [...staticDeals].sort((a, b) => b.discount - a.discount).slice(0, 3)
    return `Los mayores descuentos son:\n\n${bestDiscounts.map((d) => `- ${d.title}: ${d.discount}% de descuento (${d.price}€)`).join("\n")}\n\nNo te los pierdas!`
  }

  if (lowerMessage.includes("recomendar") || lowerMessage.includes("recomendación") || lowerMessage.includes("mejor")) {
    return `Te recomiendo nuestras ofertas más populares:\n\n- Aspiradora Robot Roomba i7: 399.99€ (33% desc)\n- Smart Watch Xiaomi Band 8: 34.99€ (42% desc)\n- Zapatillas Nike Air Zoom: 69.99€ (42% desc)\n\n¿Cuál te llama más la atención?`
  }

  if (lowerMessage.includes("gracias") || lowerMessage.includes("thank")) {
    return "De nada! Estoy aquí para ayudarte a encontrar las mejores ofertas. Si necesitas algo más, solo pregúntame!"
  }

  return `Claro! Tenemos ${staticDeals.length} ofertas increíbles disponibles. ¿Te interesa alguna categoría en particular? Tenemos Gaming, Hogar, Electrónica, Deportes y más. También puedo mostrarte los mejores descuentos o las ofertas más económicas.`
}

export function ShoppingAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = (e.target as any).message.value
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    ;(e.target as any).message.value = ""

    setIsTyping(true)
    setTimeout(() => {
      const response = generateResponse(input)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 800)
  }

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-orange-500 shadow-lg hover:bg-orange-600 hover:shadow-xl transition-all"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 h-[500px] shadow-2xl border-2 border-orange-500/20 flex flex-col">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <CardTitle className="text-lg">Asistente de Compras</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-white/90 mt-1">Te ayudo a encontrar las mejores ofertas</p>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-8">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 text-orange-500/50" />
                <p className="font-medium mb-2">Hola, soy tu asistente de compras</p>
                <p className="text-xs">Pregúntame sobre las ofertas o dime qué estás buscando</p>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    message.role === "user" ? "bg-orange-500 text-white" : "bg-muted text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <CardFooter className="flex-shrink-0 border-t p-3">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input name="message" placeholder="Escribe tu mensaje..." disabled={isTyping} className="flex-1" />
              <Button type="submit" size="icon" disabled={isTyping} className="bg-orange-500 hover:bg-orange-600">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
