"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dog, Cat, Stethoscope, Pill, ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Perros",
    description: "Suplementos y tratamientos especializados para caninos de todas las edades",
    icon: Dog,
    color: "bg-secondary/20",
    productCount: 8,
  },
  {
    name: "Gatos",
    description: "Formulas delicadas y efectivas para el cuidado felino",
    icon: Cat,
    color: "bg-accent/20",
    productCount: 8,
  },
  {
    name: "Salud Hepatica",
    description: "Proteccion y regeneracion del higado con extractos naturales",
    icon: Stethoscope,
    color: "bg-secondary/20",
    productCount: 3,
  },
  {
    name: "Sistema Respiratorio",
    description: "Soluciones para problemas respiratorios y fortalecimiento inmune",
    icon: Pill,
    color: "bg-accent/20",
    productCount: 4,
  },
]

export function Categories() {
  return (
    <section id="categorias" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Nuestras Categorias
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Soluciones con Nanotecnologia
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Productos veterinarios desarrollados con nanotecnologia de nanoencapsulacion 
            para una mayor absorcion y efectividad en tus mascotas.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.name}
              className="group cursor-pointer border-border/50 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card"
            >
              <CardContent className="p-6">
                <div className={`${category.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {category.productCount} productos
                  </span>
                  <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary/80 p-0 h-auto font-medium">
                    Ver mas
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
