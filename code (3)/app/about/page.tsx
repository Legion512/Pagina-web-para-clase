import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tag, ArrowLeft, GraduationCap, Code, Users } from "lucide-react"

export default function AboutPage() {
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
            <Button variant="outline" asChild>
              <Link href="/" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Sobre <span className="text-orange-500">Nosotros</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">Conoce más sobre este proyecto educativo</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-orange-500" />
                Proyecto Educativo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                ChollosNet es un proyecto desarrollado para la asignatura de <strong>Lenguaje de Marcas</strong>. Este
                sitio web ha sido creado con fines educativos para demostrar el uso de tecnologías web modernas y buenas
                prácticas de desarrollo.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-orange-500" />
                Funcionalidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Sistema de autenticación (simulado para fines educativos)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Catálogo de ofertas con búsqueda y filtros por categoría</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Sistema de votación y calor tipo Chollometro</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Asistente de compras con chatbot interactivo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Diseño responsive adaptado a móviles y tablets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Persistencia de datos en localStorage</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-500/20">
            <CardContent className="pt-6">
              <p className="text-center text-sm text-muted-foreground leading-relaxed">
                Este proyecto es únicamente con <strong>fines educativos</strong> y no representa una plataforma
                comercial real. Todos los productos, precios y tiendas son ficticios y creados exclusivamente para
                demostrar las capacidades técnicas aprendidas en el curso.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
            <Link href="/">Volver a las Ofertas</Link>
          </Button>
        </div>
      </main>

      <footer className="mt-16 border-t border-border bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">© 2025 ChollosNet - Proyecto Educativo</p>
          <p className="mt-2 text-xs text-muted-foreground">Asignatura: Lenguaje de Marcas</p>
        </div>
      </footer>
    </div>
  )
}
