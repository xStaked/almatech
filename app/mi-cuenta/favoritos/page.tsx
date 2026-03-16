"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Bell,
  BellOff,
  Star,
  CheckCircle2,
  Package
} from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { products } from "@/lib/products"

// Mock wishlist data - using real products
const initialWishlist = [
  { productId: 1, addedDate: "10 Mar 2026", notify: true },
  { productId: 2, addedDate: "5 Mar 2026", notify: false },
  { productId: 3, addedDate: "28 Feb 2026", notify: true },
]

export default function WishlistPage() {
  const { addItem } = useCart()
  const [wishlist, setWishlist] = useState(initialWishlist)
  const [addedToCart, setAddedToCart] = useState<number[]>([])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const toggleNotify = (productId: number) => {
    setWishlist(wishlist.map(item => 
      item.productId === productId ? { ...item, notify: !item.notify } : item
    ))
  }

  const removeFromWishlist = (productId: number) => {
    setWishlist(wishlist.filter(item => item.productId !== productId))
  }

  const handleAddToCart = (product: typeof products[0]) => {
    addItem(product, product.presentations[0].size, product.presentations[0].price, 1)
    setAddedToCart([...addedToCart, product.id])
    setTimeout(() => {
      setAddedToCart(addedToCart.filter(id => id !== product.id))
    }, 2000)
  }

  const wishlistProducts = wishlist.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!
  })).filter(item => item.product)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mis Favoritos</h1>
          <p className="text-muted-foreground">{wishlist.length} productos guardados</p>
        </div>
        {wishlist.length > 0 && (
          <Button variant="outline" onClick={() => setWishlist([])}>
            <Trash2 className="mr-2 h-4 w-4" />
            Vaciar lista
          </Button>
        )}
      </div>

      {/* Wishlist Items */}
      {wishlistProducts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map(({ product, addedDate, notify }) => (
            <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50">
                {/* Product Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package className="h-16 w-16 text-muted-foreground/30" />
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-accent text-accent-foreground">Nuevo</Badge>
                  )}
                  {product.isBestSeller && (
                    <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-md"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className={`h-9 w-9 rounded-full shadow-md ${notify ? 'bg-accent text-accent-foreground' : 'bg-white/90 hover:bg-white'}`}
                    onClick={() => toggleNotify(product.id)}
                    title={notify ? "Notificaciones activadas" : "Activar notificaciones"}
                  >
                    {notify ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-muted'}`} 
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">(24)</span>
                </div>

                <Link href={`/producto/${product.slug}`}>
                  <h3 className="font-semibold text-foreground hover:text-secondary transition-colors line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {product.tagline}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-lg font-bold text-foreground">
                      {formatCurrency(product.presentations[0].price)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.presentations[0].size}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs text-muted-foreground">
                    Agregado {addedDate}
                  </Badge>
                </div>

                <Button 
                  className={`w-full transition-all ${
                    addedToCart.includes(product.id)
                      ? 'bg-green-600 hover:bg-green-600 text-white'
                      : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  }`}
                  onClick={() => handleAddToCart(product)}
                >
                  {addedToCart.includes(product.id) ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Agregado al Carrito
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Agregar al Carrito
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Tu lista esta vacia</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Guarda tus productos favoritos para comprarlos mas tarde. Activa las notificaciones para recibir alertas de ofertas.
          </p>
          <Link href="/">
            <Button size="lg">
              Explorar productos
            </Button>
          </Link>
        </div>
      )}

      {/* Tips Section */}
      {wishlistProducts.length > 0 && (
        <Card className="bg-gradient-to-r from-secondary/5 to-accent/5 border-secondary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Bell className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Activa las notificaciones</h4>
                <p className="text-sm text-muted-foreground">
                  Cuando activas la campana en un producto, te avisaremos cuando tenga descuento o promocion especial. 
                  Nunca te pierdas una oferta en tus productos favoritos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
