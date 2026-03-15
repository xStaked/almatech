"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  ChevronLeft, 
  Dog, 
  Cat, 
  Shield, 
  Leaf, 
  Droplets,
  AlertTriangle,
  Package,
  CheckCircle2,
  Minus,
  Plus
} from "lucide-react"
import { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart()
  const [selectedPresentation, setSelectedPresentation] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    const presentation = product.presentations[selectedPresentation]
    addItem(product, presentation.size, presentation.price, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const currentPrice = product.presentations[selectedPresentation].price

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link 
            href="/#productos" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-secondary transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver a productos
          </Link>
        </nav>

        {/* Product Main Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden">
              {product.image.startsWith("http") ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                      <Droplets className="h-16 w-16 text-secondary" />
                    </div>
                    <p className="text-lg text-muted-foreground">{product.category}</p>
                  </div>
                </div>
              )}
              
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground font-semibold px-3 py-1">
                  {product.badge}
                </Badge>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-card/90 hover:bg-card shadow-md h-10 w-10"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart 
                  className={`h-5 w-5 transition-colors ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                  }`} 
                />
              </Button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-muted/50 rounded-lg p-3 text-center">
                <Shield className="h-5 w-5 mx-auto text-secondary mb-1" />
                <p className="text-xs text-muted-foreground">Registro ICA</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 text-center">
                <Leaf className="h-5 w-5 mx-auto text-secondary mb-1" />
                <p className="text-xs text-muted-foreground">Natural</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 text-center">
                <Package className="h-5 w-5 mx-auto text-secondary mb-1" />
                <p className="text-xs text-muted-foreground">Envio gratis</p>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Rating */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="text-secondary border-secondary">
                {product.category}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews} resenas)</span>
              </div>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                {product.registro}
              </span>
            </div>

            {/* Title & Description */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-secondary font-medium mb-3">
                {product.tagline}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {product.longDescription}
              </p>
            </div>

            {/* Pets */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Para:</span>
              <div className="flex gap-2">
                {product.pets.includes("perro") && (
                  <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
                    <Dog className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Perros</span>
                  </div>
                )}
                {product.pets.includes("gato") && (
                  <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
                    <Cat className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Gatos</span>
                  </div>
                )}
              </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-2">
              {product.benefits.map((benefit, index) => (
                <span 
                  key={index}
                  className="text-sm bg-secondary/10 text-secondary px-3 py-1 rounded-full font-medium"
                >
                  {benefit}
                </span>
              ))}
            </div>

            {/* Presentation Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Presentacion:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.presentations.map((pres, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPresentation(index)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedPresentation === index
                        ? 'border-secondary bg-secondary/10 text-secondary'
                        : 'border-border hover:border-secondary/50'
                    }`}
                  >
                    <span className="font-medium">{pres.size}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {formatPrice(pres.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Quantity */}
            <div className="bg-muted/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold text-foreground">
                    {formatPrice(currentPrice)}
                  </span>
                  {product.originalPrice && selectedPresentation === 0 && (
                    <span className="text-lg text-muted-foreground line-through ml-2">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                
                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Cantidad:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className={`flex-1 h-12 text-base transition-all ${
                    addedToCart 
                      ? 'bg-green-600 hover:bg-green-600 text-white' 
                      : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  }`}
                  onClick={handleAddToCart}
                >
                  {addedToCart ? (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Agregado al Carrito
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Agregar al Carrito
                    </>
                  )}
                </Button>
                <Button variant="secondary" className="h-12 px-6 text-base">
                  Comprar Ahora
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                Envio gratis en pedidos mayores a $150.000 COP
              </p>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="ingredientes" className="mb-12">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-6">
            <TabsTrigger 
              value="ingredientes"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:bg-transparent px-6 py-3"
            >
              Ingredientes
            </TabsTrigger>
            <TabsTrigger 
              value="dosificacion"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:bg-transparent px-6 py-3"
            >
              Dosificacion
            </TabsTrigger>
            <TabsTrigger 
              value="uso"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:bg-transparent px-6 py-3"
            >
              Modo de Uso
            </TabsTrigger>
            <TabsTrigger 
              value="advertencias"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:bg-transparent px-6 py-3"
            >
              Advertencias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ingredientes" className="mt-0">
            <div className="grid md:grid-cols-2 gap-4">
              {product.ingredients.map((ingredient, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                      {ingredient.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {ingredient.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dosificacion" className="mt-0">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-secondary" />
                  Tabla de Dosificacion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold">Peso de la Mascota</th>
                        <th className="text-left py-3 px-4 font-semibold">Dosis Recomendada</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.dosage.map((dose, index) => (
                        <tr key={index} className="border-b border-border/50 hover:bg-muted/50">
                          <td className="py-3 px-4">{dose.weight}</td>
                          <td className="py-3 px-4 text-secondary font-medium">{dose.dose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="uso" className="mt-0">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-secondary" />
                  Instrucciones de Uso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {product.usage.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-secondary/20 text-secondary rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{instruction}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Almacenamiento</h4>
                  <p className="text-sm text-muted-foreground">{product.storage}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advertencias" className="mt-0">
            <Card className="border-amber-200 bg-amber-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700">
                  <AlertTriangle className="h-5 w-5" />
                  Precauciones y Advertencias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {product.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-amber-800">{warning}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products CTA */}
        <div className="text-center py-8 border-t border-border">
          <h3 className="text-xl font-semibold text-foreground mb-3">
            Conoce toda nuestra linea de productos veterinarios
          </h3>
          <Link href="/#productos">
            <Button variant="outline" size="lg">
              Ver todos los productos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
