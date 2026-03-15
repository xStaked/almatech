"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag, 
  ArrowRight,
  Truck,
  ShieldCheck,
  Droplets
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const FREE_SHIPPING_THRESHOLD = 150000

export function CartSidebar() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    subtotal,
    totalItems,
    clearCart 
  } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15000
  const total = subtotal + shippingCost
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-secondary" />
              Tu Carrito
              {totalItems > 0 && (
                <span className="ml-2 bg-secondary text-secondary-foreground text-sm px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={closeCart} className="h-8 w-8">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Tu carrito esta vacio
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              Agrega productos para comenzar tu compra
            </p>
            <Button onClick={closeCart} className="bg-secondary hover:bg-secondary/90">
              <Link href="/#productos" className="flex items-center gap-2">
                Ver Productos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress */}
            {remainingForFreeShipping > 0 && (
              <div className="px-6 py-3 bg-accent/10 border-b border-border">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <Truck className="h-4 w-4 text-secondary" />
                  <span className="text-foreground">
                    Te faltan <strong className="text-secondary">{formatPrice(remainingForFreeShipping)}</strong> para envio gratis
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-secondary rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {remainingForFreeShipping <= 0 && (
              <div className="px-6 py-3 bg-secondary/10 border-b border-border">
                <div className="flex items-center gap-2 text-sm text-secondary font-medium">
                  <Truck className="h-4 w-4" />
                  Tienes envio gratis en este pedido
                </div>
              </div>
            )}

            {/* Cart Items */}
            <ScrollArea className="flex-1 px-6">
              <div className="py-4 space-y-4">
                {items.map((item) => (
                  <div 
                    key={`${item.productId}-${item.presentation}`}
                    className="flex gap-4 p-3 bg-card rounded-xl border border-border"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      {item.image.startsWith("http") ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary/20 to-accent/20">
                          <Droplets className="h-8 w-8 text-secondary" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link 
                        href={`/producto/${item.slug}`}
                        className="font-semibold text-foreground hover:text-secondary transition-colors line-clamp-1"
                        onClick={closeCart}
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.presentation}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-background"
                            onClick={() => updateQuantity(item.productId, item.presentation, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-background"
                            onClick={() => updateQuantity(item.productId, item.presentation, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Price */}
                        <p className="font-bold text-foreground">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                      onClick={() => removeItem(item.productId, item.presentation)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Cart Footer */}
            <SheetFooter className="px-6 py-4 border-t border-border bg-muted/30 flex-col gap-4">
              {/* Summary */}
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envio</span>
                  <span className={`font-medium ${shippingCost === 0 ? 'text-secondary' : 'text-foreground'}`}>
                    {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-xl text-foreground">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="w-full space-y-2">
                <Button 
                  className="w-full h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-base"
                  asChild
                >
                  <Link href="/checkout" onClick={closeCart}>
                    Finalizar Compra
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={closeCart}
                >
                  Seguir Comprando
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="w-full flex items-center justify-center gap-4 pt-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-secondary" />
                  Pago Seguro
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Truck className="h-4 w-4 text-secondary" />
                  Envio Asegurado
                </div>
              </div>

              {/* Clear Cart */}
              <Button 
                variant="ghost" 
                size="sm"
                className="text-muted-foreground hover:text-destructive"
                onClick={clearCart}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Vaciar Carrito
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
