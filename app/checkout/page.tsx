"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ChevronLeft, 
  Truck, 
  CreditCard, 
  Building2, 
  Smartphone,
  ShieldCheck,
  Lock,
  Droplets,
  CheckCircle2,
  Minus,
  Plus,
  Trash2,
  PawPrint,
  Gift
} from "lucide-react"

const FREE_SHIPPING_THRESHOLD = 150000

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart()
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [shippingData, setShippingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    department: '',
    postalCode: '',
    notes: '',
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15000
  const discount = couponApplied ? subtotal * 0.1 : 0
  const total = subtotal + shippingCost - discount

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    setStep('confirmation')
    clearCart()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'ALMATECH10') {
      setCouponApplied(true)
    }
  }

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Droplets className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Tu carrito esta vacio</h1>
            <p className="text-muted-foreground mb-8">
              Agrega productos para continuar con tu compra
            </p>
            <Button asChild className="bg-secondary hover:bg-secondary/90">
              <Link href="/#productos">Ver Productos</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Pedido Confirmado
            </h1>
            <p className="text-muted-foreground mb-2">
              Gracias por tu compra. Hemos enviado un correo de confirmacion a{' '}
              <strong className="text-foreground">{shippingData.email}</strong>
            </p>
            <p className="text-muted-foreground mb-8">
              Numero de pedido: <strong className="text-foreground">ALM-{Date.now().toString().slice(-8)}</strong>
            </p>
            
            <Card className="mb-8 text-left">
              <CardHeader>
                <CardTitle className="text-lg">Detalles de envio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Nombre:</span> {shippingData.fullName}</p>
                <p><span className="text-muted-foreground">Direccion:</span> {shippingData.address}</p>
                <p><span className="text-muted-foreground">Ciudad:</span> {shippingData.city}, {shippingData.department}</p>
                <p><span className="text-muted-foreground">Telefono:</span> {shippingData.phone}</p>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href="/">Volver al Inicio</Link>
              </Button>
              <Button asChild className="bg-secondary hover:bg-secondary/90">
                <Link href="/#productos">Seguir Comprando</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <PawPrint className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Almatech</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              Pago Seguro
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Link */}
        <Link 
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-secondary mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a la tienda
        </Link>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step === 'shipping' ? 'bg-secondary text-secondary-foreground' : 'bg-green-600 text-white'
            }`}>
              {step === 'shipping' ? '1' : <CheckCircle2 className="h-5 w-5" />}
            </div>
            <span className="text-sm font-medium">Envio</span>
          </div>
          <div className={`w-16 h-0.5 mx-2 ${step === 'payment' ? 'bg-secondary' : 'bg-border'}`} />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step === 'payment' ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
            <span className="text-sm font-medium text-muted-foreground">Pago</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'shipping' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-secondary" />
                    Informacion de Envio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nombre completo *</Label>
                        <Input
                          id="fullName"
                          value={shippingData.fullName}
                          onChange={(e) => setShippingData({...shippingData, fullName: e.target.value})}
                          required
                          placeholder="Juan Perez"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefono *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={shippingData.phone}
                          onChange={(e) => setShippingData({...shippingData, phone: e.target.value})}
                          required
                          placeholder="300 123 4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electronico *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingData.email}
                        onChange={(e) => setShippingData({...shippingData, email: e.target.value})}
                        required
                        placeholder="correo@ejemplo.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Direccion *</Label>
                      <Input
                        id="address"
                        value={shippingData.address}
                        onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                        required
                        placeholder="Calle 123 # 45-67, Apt 101"
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ciudad *</Label>
                        <Input
                          id="city"
                          value={shippingData.city}
                          onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                          required
                          placeholder="Bogota"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Departamento *</Label>
                        <Input
                          id="department"
                          value={shippingData.department}
                          onChange={(e) => setShippingData({...shippingData, department: e.target.value})}
                          required
                          placeholder="Cundinamarca"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Codigo Postal</Label>
                        <Input
                          id="postalCode"
                          value={shippingData.postalCode}
                          onChange={(e) => setShippingData({...shippingData, postalCode: e.target.value})}
                          placeholder="110111"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notas de entrega (opcional)</Label>
                      <Input
                        id="notes"
                        value={shippingData.notes}
                        onChange={(e) => setShippingData({...shippingData, notes: e.target.value})}
                        placeholder="Instrucciones especiales para la entrega"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 h-12 text-base">
                      Continuar al Pago
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === 'payment' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-secondary" />
                    Metodo de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                        paymentMethod === 'card' ? 'border-secondary bg-secondary/5' : 'border-border hover:border-muted-foreground'
                      }`}>
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Tarjeta de Credito/Debito</p>
                            <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                          </div>
                        </Label>
                      </div>

                      <div className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                        paymentMethod === 'pse' ? 'border-secondary bg-secondary/5' : 'border-border hover:border-muted-foreground'
                      }`}>
                        <RadioGroupItem value="pse" id="pse" />
                        <Label htmlFor="pse" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Building2 className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">PSE - Debito Bancario</p>
                            <p className="text-sm text-muted-foreground">Transferencia desde tu banco</p>
                          </div>
                        </Label>
                      </div>

                      <div className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                        paymentMethod === 'nequi' ? 'border-secondary bg-secondary/5' : 'border-border hover:border-muted-foreground'
                      }`}>
                        <RadioGroupItem value="nequi" id="nequi" />
                        <Label htmlFor="nequi" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Nequi / Daviplata</p>
                            <p className="text-sm text-muted-foreground">Pago desde tu billetera digital</p>
                          </div>
                        </Label>
                      </div>

                      <div className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                        paymentMethod === 'cash' ? 'border-secondary bg-secondary/5' : 'border-border hover:border-muted-foreground'
                      }`}>
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Gift className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Pago Contra Entrega</p>
                            <p className="text-sm text-muted-foreground">Paga cuando recibas tu pedido</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4 p-4 bg-muted/50 rounded-xl">
                        <div className="space-y-2">
                          <Label>Numero de tarjeta</Label>
                          <Input placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Fecha de expiracion</Label>
                            <Input placeholder="MM/AA" />
                          </div>
                          <div className="space-y-2">
                            <Label>CVV</Label>
                            <Input placeholder="123" type="password" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Nombre en la tarjeta</Label>
                          <Input placeholder="JUAN PEREZ" />
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setStep('shipping')}
                        className="flex-1"
                      >
                        Volver
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-secondary hover:bg-secondary/90 h-12"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin mr-2" />
                            Procesando...
                          </>
                        ) : (
                          <>Pagar {formatPrice(total)}</>
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <ShieldCheck className="h-4 w-4" />
                      Tus datos estan protegidos con encriptacion SSL
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div 
                      key={`${item.productId}-${item.presentation}`}
                      className="flex gap-3 p-2 bg-muted/50 rounded-lg"
                    >
                      <div className="relative w-14 h-14 bg-background rounded-lg overflow-hidden flex-shrink-0">
                        {item.image.startsWith("http") ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Droplets className="h-6 w-6 text-secondary" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.presentation}</p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => updateQuantity(item.productId, item.presentation, item.quantity - 1)}
                              className="w-5 h-5 rounded bg-background flex items-center justify-center text-muted-foreground hover:text-foreground"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs w-5 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.productId, item.presentation, item.quantity + 1)}
                              className="w-5 h-5 rounded bg-background flex items-center justify-center text-muted-foreground hover:text-foreground"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="font-semibold text-sm">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeItem(item.productId, item.presentation)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Coupon */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Codigo de descuento"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                  />
                  <Button 
                    variant="outline" 
                    onClick={applyCoupon}
                    disabled={couponApplied || !couponCode}
                  >
                    {couponApplied ? 'Aplicado' : 'Aplicar'}
                  </Button>
                </div>
                {couponApplied && (
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    Descuento del 10% aplicado
                  </p>
                )}

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Descuento</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envio</span>
                    <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                      {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4 text-secondary" />
                    Envio gratis en compras +{formatPrice(FREE_SHIPPING_THRESHOLD)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-secondary" />
                    Pago 100% seguro
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
