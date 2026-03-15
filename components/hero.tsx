"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Sparkles, PawPrint } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Background Pattern with paw prints */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='22' cy='22' r='2.5'/%3E%3Ccircle cx='38' cy='22' r='2.5'/%3E%3Ccircle cx='20' cy='32' r='2.5'/%3E%3Ccircle cx='40' cy='32' r='2.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
              <PawPrint className="h-4 w-4" />
              Nanotecnologia para mascotas
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight text-balance">
              Cuida a quien te{" "}
              <span className="relative">
                ama sin condicion
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 150 2 298 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-secondary"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Productos veterinarios con nanotecnologia avanzada para la salud y bienestar 
              de tus perros y gatos. Formulados con amor y ciencia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8"
              >
                Ver Productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Convertirte en Afiliado
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 justify-center lg:justify-start pt-4 flex-wrap">
              <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                <PawPrint className="h-4 w-4 fill-current" />
                <span>+5,000 mascotas felices</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                <Sparkles className="h-4 w-4" />
                <span>Registro ICA</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 bg-secondary/20 rounded-full scale-90 animate-pulse" />
              <div className="absolute inset-4 bg-secondary/10 rounded-full" />
              
              {/* Main image */}
              <div className="absolute inset-8 rounded-3xl shadow-2xl overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qZ5vrkfp0EUWuOKo5QtjotiCGEWkh3.png"
                  alt="Nano-Lyptus - Producto veterinario con nanotecnologia para perros y gatos"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating badges */}
              <div className="absolute top-12 -left-4 bg-card rounded-xl p-3 shadow-lg animate-bounce">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Nanotecnologia</p>
                    <p className="text-xs text-muted-foreground">Mayor absorcion</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-12 -right-4 bg-card rounded-xl p-3 shadow-lg animate-bounce delay-150">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-secondary fill-secondary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">100% Natural</p>
                    <p className="text-xs text-muted-foreground">Sin quimicos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
