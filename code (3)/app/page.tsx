"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Tag, TrendingUp, Clock, ExternalLink, Flame, ThumbsUp, ThumbsDown, LogOut, Info } from "lucide-react"
import { ShoppingAssistant } from "@/components/shopping-assistant"
import Link from "next/link"

interface Deal {
  id: string
  title: string
  description: string
  originalPrice: number
  discountPrice: number
  discount: number
  image: string
  category: string
  store: string
  url: string
  expiresIn: string
  heat: number
  votes: { up: number; down: number }
}

const staticDeals: Deal[] = [
  {
    id: "1",
    title: "Auriculares Inalámbricos Sony WH-1000XM5",
    description: "Cancelación de ruido líder en la industria, 30h de batería, sonido premium",
    originalPrice: 399.99,
    discountPrice: 279.99,
    discount: 30,
    image: "/sony-wireless-headphones-black.jpg",
    category: "Electrónica",
    store: "Amazon",
    url: "#",
    expiresIn: "2 días",
    heat: 85,
    votes: { up: 142, down: 12 },
  },
  {
    id: "2",
    title: "Smart Watch Xiaomi Band 8",
    description: "Monitor de frecuencia cardíaca, 150+ modos deportivos, resistente al agua",
    originalPrice: 59.99,
    discountPrice: 34.99,
    discount: 42,
    image: "/xiaomi-smart-watch-fitness-band.jpg",
    category: "Wearables",
    store: "MediaMarkt",
    url: "#",
    expiresIn: "5 horas",
    heat: 92,
    votes: { up: 234, down: 8 },
  },
  {
    id: "3",
    title: "Cafetera Express De'Longhi Dedica",
    description: "Espresso profesional, diseño compacto, bomba de 15 bares",
    originalPrice: 199.99,
    discountPrice: 149.99,
    discount: 25,
    image: "/delonghi-espresso-coffee-machine-silver.jpg",
    category: "Hogar",
    store: "El Corte Inglés",
    url: "#",
    expiresIn: "1 día",
    heat: 78,
    votes: { up: 98, down: 15 },
  },
  {
    id: "4",
    title: "Teclado Mecánico Gaming RGB",
    description: "Switches Cherry MX, retroiluminación RGB personalizable, reposamuñecas",
    originalPrice: 129.99,
    discountPrice: 79.99,
    discount: 38,
    image: "/mechanical-gaming-keyboard-rgb-lights.jpg",
    category: "Gaming",
    store: "PcComponentes",
    url: "#",
    expiresIn: "3 días",
    heat: 88,
    votes: { up: 176, down: 9 },
  },
  {
    id: "5",
    title: "Aspiradora Robot Roomba i7",
    description: "Mapeo inteligente, vaciado automático, compatible con Alexa",
    originalPrice: 599.99,
    discountPrice: 399.99,
    discount: 33,
    image: "/roomba-robot-vacuum-cleaner-black.jpg",
    category: "Hogar",
    store: "Amazon",
    url: "#",
    expiresIn: "4 horas",
    heat: 95,
    votes: { up: 287, down: 5 },
  },
  {
    id: "6",
    title: 'Monitor Gaming 27" 144Hz QHD',
    description: "Panel IPS, 1ms de respuesta, FreeSync Premium, HDR10",
    originalPrice: 349.99,
    discountPrice: 249.99,
    discount: 29,
    image: "/gaming-monitor-27-inch-curved-display.jpg",
    category: "Gaming",
    store: "PcComponentes",
    url: "#",
    expiresIn: "2 días",
    heat: 81,
    votes: { up: 124, down: 11 },
  },
  {
    id: "7",
    title: "Air Fryer Philips 4.1L",
    description: "Tecnología Rapid Air, 7 programas preconfigurados, fácil limpieza",
    originalPrice: 139.99,
    discountPrice: 89.99,
    discount: 36,
    image: "/philips-air-fryer-black-kitchen-appliance.jpg",
    category: "Hogar",
    store: "MediaMarkt",
    url: "#",
    expiresIn: "6 horas",
    heat: 89,
    votes: { up: 203, down: 14 },
  },
  {
    id: "8",
    title: "Zapatillas Running Nike Air Zoom",
    description: "Amortiguación reactiva, diseño transpirable, suela de alta tracción",
    originalPrice: 119.99,
    discountPrice: 69.99,
    discount: 42,
    image: "/nike-running-shoes-white-blue-athletic.jpg",
    category: "Deportes",
    store: "Nike Store",
    url: "#",
    expiresIn: "1 día",
    heat: 90,
    votes: { up: 189, down: 7 },
  },
  {
    id: "9",
    title: "Tablet Samsung Galaxy Tab S9",
    description: 'Pantalla AMOLED 11", S Pen incluido, 8GB RAM, 5G',
    originalPrice: 699.99,
    discountPrice: 549.99,
    discount: 21,
    image: "/samsung-tablet-galaxy-modern-stylus.jpg",
    category: "Electrónica",
    store: "Amazon",
    url: "#",
    expiresIn: "3 días",
    heat: 72,
    votes: { up: 87, down: 18 },
  },
  {
    id: "10",
    title: "Juego PS5: Spider-Man 2",
    description: "Aventura exclusiva de PlayStation, gráficos de última generación",
    originalPrice: 79.99,
    discountPrice: 49.99,
    discount: 38,
    image: "/spiderman-video-game-cover-playstation.jpg",
    category: "Gaming",
    store: "Game",
    url: "#",
    expiresIn: "2 días",
    heat: 86,
    votes: { up: 156, down: 10 },
  },
  {
    id: "11",
    title: 'Mochila Portátil 15.6" Impermeable',
    description: "Puerto USB, compartimento para laptop, diseño antirrobo",
    originalPrice: 49.99,
    discountPrice: 29.99,
    discount: 40,
    image: "/laptop-backpack-black-modern-usb-port.jpg",
    category: "Accesorios",
    store: "Amazon",
    url: "#",
    expiresIn: "5 días",
    heat: 83,
    votes: { up: 145, down: 13 },
  },
  {
    id: "12",
    title: "Set de Sartenes Tefal 3 Piezas",
    description: "Antiadherente titanium, aptas para inducción, sin PFOA",
    originalPrice: 89.99,
    discountPrice: 54.99,
    discount: 39,
    image: "/tefal-frying-pan-set-kitchen-cookware.jpg",
    category: "Hogar",
    store: "El Corte Inglés",
    url: "#",
    expiresIn: "1 día",
    heat: 87,
    votes: { up: 167, down: 11 },
  },
]

export default function ChollosPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todas")
  const [deals, setDeals] = useState<Deal[]>(staticDeals)
  const [userVotes, setUserVotes] = useState<Record<string, "up" | "down">>({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authenticated = localStorage.getItem("user_authenticated")
    if (!authenticated) {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }

    const savedVotes = localStorage.getItem("user_votes")
    if (savedVotes) {
      setUserVotes(JSON.parse(savedVotes))
    }
  }, [router])

  const handleVote = (dealId: string, voteType: "up" | "down") => {
    setDeals((prevDeals) =>
      prevDeals.map((deal) => {
        if (deal.id !== dealId) return deal

        const currentVote = userVotes[dealId]
        const newVotes = { ...deal.votes }
        let newHeat = deal.heat

        if (currentVote === voteType) {
          if (voteType === "up") newVotes.up--
          else newVotes.down--
          newHeat = voteType === "up" ? newHeat - 1 : newHeat + 1

          const newUserVotes = { ...userVotes }
          delete newUserVotes[dealId]
          setUserVotes(newUserVotes)
          localStorage.setItem("user_votes", JSON.stringify(newUserVotes))
        } else {
          if (currentVote) {
            if (currentVote === "up") {
              newVotes.up--
              newHeat--
            } else {
              newVotes.down--
              newHeat++
            }
          }

          if (voteType === "up") {
            newVotes.up++
            newHeat++
          } else {
            newVotes.down++
            newHeat--
          }

          const newUserVotes = { ...userVotes, [dealId]: voteType }
          setUserVotes(newUserVotes)
          localStorage.setItem("user_votes", JSON.stringify(newUserVotes))
        }

        return { ...deal, votes: newVotes, heat: Math.max(0, Math.min(100, newHeat)) }
      }),
    )
  }

  const handleLogout = () => {
    localStorage.removeItem("user_authenticated")
    router.push("/login")
  }

  const categories = ["todas", ...Array.from(new Set(staticDeals.map((deal) => deal.category)))]

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "todas" || deal.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const topDeals = [...deals].sort((a, b) => b.heat - a.heat).slice(0, 3)

  const getHeatColor = (heat: number) => {
    if (heat >= 90) return "text-red-500"
    if (heat >= 75) return "text-orange-500"
    if (heat >= 50) return "text-yellow-500"
    return "text-gray-400"
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="h-8 w-8 text-orange-500" />
              <h1 className="text-2xl font-bold text-foreground">
                <span className="text-orange-500">Chollos</span>Net
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-1">
                <TrendingUp className="h-3 w-3" />
                {staticDeals.length} ofertas activas
              </Badge>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-transparent">
                <LogOut className="h-4 w-4" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl text-balance">
            Los Mejores <span className="text-orange-500">Chollos</span> del Día
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground text-pretty">
            Encuentra las mejores ofertas en tecnología, hogar, gaming y mucho más. Actualizamos diariamente para
            traerte los descuentos más increíbles.
          </p>

          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar ofertas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-6 text-lg"
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <Flame className="h-6 w-6 text-red-500" />
            <h3 className="text-2xl font-bold text-foreground">Más Calientes</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {topDeals.map((deal) => (
              <Card
                key={deal.id}
                className="overflow-hidden border-2 border-orange-500/20 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-950/20 dark:to-red-950/20"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <Badge className="absolute right-2 top-2 bg-orange-500 text-white">-{deal.discount}%</Badge>
                  <div className="absolute left-2 top-2 flex items-center gap-1 bg-background/90 px-2 py-1 rounded-full">
                    <Flame className={`h-4 w-4 ${getHeatColor(deal.heat)}`} />
                    <span className={`font-bold text-sm ${getHeatColor(deal.heat)}`}>{deal.heat}°</span>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="line-clamp-2 text-lg">{deal.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3 space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-orange-500">{deal.discountPrice.toFixed(2)}€</span>
                    <span className="text-sm text-muted-foreground line-through">{deal.originalPrice.toFixed(2)}€</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`flex-1 ${userVotes[deal.id] === "up" ? "bg-green-500 text-white border-green-500" : ""}`}
                      onClick={() => handleVote(deal.id, "up")}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {deal.votes.up}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`flex-1 ${userVotes[deal.id] === "down" ? "bg-red-500 text-white border-red-500" : ""}`}
                      onClick={() => handleVote(deal.id, "down")}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      {deal.votes.down}
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Ver Oferta
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="w-full flex-wrap justify-start h-auto gap-2 bg-transparent">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </section>

        <section>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-foreground">Todas las Ofertas ({filteredDeals.length})</h3>
          </div>

          {filteredDeals.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <Search className="h-12 w-12 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">No se encontraron ofertas con esos criterios</p>
              </div>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDeals.map((deal) => (
                <Card key={deal.id} className="group overflow-hidden transition-shadow hover:shadow-xl">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img
                      src={deal.image || "/placeholder.svg"}
                      alt={deal.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <Badge className="absolute left-2 top-2 bg-background/90 text-foreground">{deal.category}</Badge>
                    <Badge className="absolute right-2 top-2 bg-orange-500 text-white text-lg font-bold">
                      -{deal.discount}%
                    </Badge>
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs">
                      <Clock className="h-3 w-3 text-orange-500" />
                      <span className="font-medium">{deal.expiresIn}</span>
                    </div>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1">
                      <Flame className={`h-4 w-4 ${getHeatColor(deal.heat)}`} />
                      <span className={`font-bold text-sm ${getHeatColor(deal.heat)}`}>{deal.heat}°</span>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-base group-hover:text-orange-500 transition-colors">
                      {deal.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{deal.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-orange-500">{deal.discountPrice.toFixed(2)}€</span>
                      <span className="text-sm text-muted-foreground line-through">
                        {deal.originalPrice.toFixed(2)}€
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-medium">{deal.store}</span>
                      <span>Ahorras {(deal.originalPrice - deal.discountPrice).toFixed(2)}€</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`flex-1 ${userVotes[deal.id] === "up" ? "bg-green-500 text-white border-green-500" : ""}`}
                        onClick={() => handleVote(deal.id, "up")}
                      >
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {deal.votes.up}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`flex-1 ${userVotes[deal.id] === "down" ? "bg-red-500 text-white border-red-500" : ""}`}
                        onClick={() => handleVote(deal.id, "down")}
                      >
                        <ThumbsDown className="h-3 w-3 mr-1" />
                        {deal.votes.down}
                      </Button>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 group-hover:shadow-lg transition-all"
                      asChild
                    >
                      <a href={deal.url} target="_blank" rel="noopener noreferrer">
                        Ver Oferta
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="mt-16 border-t border-border bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            <Button variant="outline" asChild className="gap-2 bg-transparent">
              <Link href="/about">
                <Info className="h-4 w-4" />
                Sobre Nosotros
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">© 2025 ChollosNet. Encuentra las mejores ofertas cada día.</p>
            <p className="text-xs text-muted-foreground">
              Los precios y disponibilidad pueden variar. Comprueba siempre en la tienda oficial.
            </p>
          </div>
        </div>
      </footer>

      <ShoppingAssistant />
    </div>
  )
}
