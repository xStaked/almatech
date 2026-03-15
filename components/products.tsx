"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star, ArrowRight, Dog, Cat, Droplets, CheckCircle2 } from "lucide-react"
import { products } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

export function Products() {
  const { addItem } = useCart()
  const [favorites, setFavorites] = useState<number[]>([])
  const [addedIds, setAddedIds] = useState<number[]>([])

  const handleQuickAdd = (product: typeof products[0]) => {
    addItem(product, product.presentations[0].size, product.presentations[0].price, 1)
    setAddedIds(prev => [...prev, product.id])
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== product.id))
    }, 2000)
  }

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <section id="productos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Productos Destacados
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              Cuida a Tu Mejor Amigo
            </h2>
          </div>
          <Button variant="outline" className="w-fit">
            Ver todos los productos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group overflow-hidden border-border/50 hover:border-secondary/50 transition-all duration-300 hover:shadow-xl bg-card"
            >
              {/* Image */}
              <Link href={`/producto/${product.slug}`}>
                <div className="relative aspect-square bg-muted overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-20 h-20 mx-auto bg-secondary/20 rounded-full flex items-center justify-center mb-2">
                        <Droplets className="h-8 w-8 text-secondary" />
                      </div>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <div className="flex justify-center gap-2 mt-2">
                        {product.pets.includes("perro") && (
                          <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center">
                            <Dog className="h-3 w-3 text-secondary" />
                          </div>
                        )}
                        {product.pets.includes("gato") && (
                          <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center">
                            <Cat className="h-3 w-3 text-secondary" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Badge */}
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground font-semibold">
                      {product.badge}
                    </Badge>
                  )}
                  
                  {/* Favorite button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-card/80 hover:bg-card shadow-sm z-10"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleFavorite(product.id)
                    }}
                  >
                    <Heart 
                      className={`h-5 w-5 transition-colors ${
                        favorites.includes(product.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-muted-foreground'
                      }`} 
                    />
                  </Button>

                  {/* Quick add overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-card/90 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button 
                      className={`w-full transition-all ${
                        addedIds.includes(product.id)
                          ? 'bg-green-600 hover:bg-green-600 text-white'
                          : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleQuickAdd(product)
                      }}
                    >
                      {addedIds.includes(product.id) ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Agregado
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Agregar al Carrito
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Link>

              <CardContent className="p-5">
                {/* Rating & Registro */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-foreground">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{product.registro}</span>
                </div>

                {/* Title & Description */}
                <Link href={`/producto/${product.slug}`}>
                  <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors mb-1 cursor-pointer hover:underline">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Benefits */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.benefits.slice(0, 3).map((benefit, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>

                {/* Presentations */}
                <div className="flex gap-2 mb-3">
                  {product.presentations.map((pres, index) => (
                    <span 
                      key={index}
                      className="text-xs border border-border px-2 py-0.5 rounded text-muted-foreground"
                    >
                      {pres.size}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
