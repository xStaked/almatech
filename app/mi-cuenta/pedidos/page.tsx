"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Package, 
  Search, 
  ChevronRight, 
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  RefreshCw,
  Eye,
  Star,
  X
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock orders data
const orders = [
  { 
    id: "ALM-001234", 
    date: "12 Mar 2026", 
    status: "delivered", 
    total: 89900, 
    pointsEarned: 90,
    items: [
      { name: "Silygran-Pro 500ml", quantity: 1, price: 89900, image: null }
    ],
    shipping: {
      address: "Calle 123 #45-67, Bogota",
      carrier: "Servientrega",
      trackingNumber: "1234567890",
      deliveredDate: "14 Mar 2026"
    }
  },
  { 
    id: "ALM-001198", 
    date: "28 Feb 2026", 
    status: "shipped", 
    total: 156000, 
    pointsEarned: 156,
    items: [
      { name: "Nano-Lyptus 1L", quantity: 1, price: 75000, image: null },
      { name: "Silygran-Pro 250ml", quantity: 1, price: 49900, image: null },
      { name: "Glucopass 500ml", quantity: 1, price: 31100, image: null }
    ],
    shipping: {
      address: "Calle 123 #45-67, Bogota",
      carrier: "Coordinadora",
      trackingNumber: "9876543210",
      estimatedDelivery: "2 Mar 2026"
    }
  },
  { 
    id: "ALM-001156", 
    date: "15 Feb 2026", 
    status: "delivered", 
    total: 67500, 
    pointsEarned: 68,
    items: [
      { name: "Glucopass 1L", quantity: 1, price: 67500, image: null }
    ],
    shipping: {
      address: "Calle 123 #45-67, Bogota",
      carrier: "Servientrega",
      trackingNumber: "5555555555",
      deliveredDate: "18 Feb 2026"
    }
  },
  { 
    id: "ALM-001098", 
    date: "1 Feb 2026", 
    status: "delivered", 
    total: 179800, 
    pointsEarned: 180,
    items: [
      { name: "Silygran-Pro 500ml", quantity: 2, price: 179800, image: null }
    ],
    shipping: {
      address: "Calle 123 #45-67, Bogota",
      carrier: "Servientrega",
      trackingNumber: "1111111111",
      deliveredDate: "4 Feb 2026"
    }
  },
]

const trackingSteps = [
  { status: "confirmed", label: "Pedido confirmado", icon: CheckCircle2 },
  { status: "processing", label: "En preparacion", icon: Package },
  { status: "shipped", label: "Enviado", icon: Truck },
  { status: "delivered", label: "Entregado", icon: MapPin },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const getStatusConfig = (status: string) => {
    switch(status) {
      case "delivered":
        return { 
          label: "Entregado", 
          color: "bg-green-100 text-green-700 border-green-200",
          icon: CheckCircle2,
          step: 4
        }
      case "shipped":
        return { 
          label: "En camino", 
          color: "bg-blue-100 text-blue-700 border-blue-200",
          icon: Truck,
          step: 3
        }
      case "processing":
        return { 
          label: "Procesando", 
          color: "bg-yellow-100 text-yellow-700 border-yellow-200",
          icon: Clock,
          step: 2
        }
      case "confirmed":
        return { 
          label: "Confirmado", 
          color: "bg-purple-100 text-purple-700 border-purple-200",
          icon: CheckCircle2,
          step: 1
        }
      default:
        return { 
          label: status, 
          color: "bg-gray-100 text-gray-700 border-gray-200",
          icon: Package,
          step: 0
        }
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mis Pedidos</h1>
        <p className="text-muted-foreground">Historial y seguimiento de tus compras</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por numero de pedido..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Todos los estados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="delivered">Entregados</SelectItem>
            <SelectItem value="shipped">En camino</SelectItem>
            <SelectItem value="processing">Procesando</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const statusConfig = getStatusConfig(order.status)
          const StatusIcon = statusConfig.icon

          return (
            <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-muted/30 border-b border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{order.id}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {order.date}
                        <span className="text-accent">+{order.pointsEarned} pts</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`${statusConfig.color} border`}>
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {statusConfig.label}
                    </Badge>
                    <p className="font-bold text-foreground">{formatCurrency(order.total)}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                          <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-foreground">{formatCurrency(item.price)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Quick Tracking */}
                  {order.status === "shipped" && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-blue-700">
                            Tu pedido esta en camino - Entrega estimada: {order.shipping.estimatedDelivery}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Detalles
                    </Button>
                    {order.status === "delivered" && (
                      <>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Repetir Pedido
                        </Button>
                        <Button variant="outline" size="sm">
                          <Star className="mr-2 h-4 w-4" />
                          Dejar Resena
                        </Button>
                      </>
                    )}
                    {order.status === "shipped" && (
                      <Button variant="outline" size="sm">
                        <Truck className="mr-2 h-4 w-4" />
                        Rastrear Envio
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No se encontraron pedidos</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "Intenta con otra busqueda" : "Aun no has realizado ninguna compra"}
          </p>
          <Link href="/">
            <Button>Ir a la tienda</Button>
          </Link>
        </div>
      )}

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Pedido {selectedOrder?.id}</span>
              <Badge className={`${getStatusConfig(selectedOrder?.status || "").color} border`}>
                {getStatusConfig(selectedOrder?.status || "").label}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Tracking Timeline */}
              <div className="relative">
                <div className="flex justify-between">
                  {trackingSteps.map((step, index) => {
                    const statusConfig = getStatusConfig(selectedOrder.status)
                    const isCompleted = index < statusConfig.step
                    const isCurrent = index === statusConfig.step - 1
                    const StepIcon = step.icon

                    return (
                      <div key={step.status} className="flex flex-col items-center relative z-10">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center
                          ${isCompleted || isCurrent ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                        `}>
                          <StepIcon className="h-5 w-5" />
                        </div>
                        <span className={`text-xs mt-2 text-center ${isCompleted || isCurrent ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                          {step.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
                {/* Progress line */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-0">
                  <div 
                    className="h-full bg-primary transition-all"
                    style={{ width: `${((getStatusConfig(selectedOrder.status).step - 1) / 3) * 100}%` }}
                  />
                </div>
              </div>

              {/* Shipping Info */}
              <div className="p-4 bg-muted/30 rounded-xl space-y-3">
                <h4 className="font-semibold text-foreground">Informacion de Envio</h4>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Direccion:</span>
                    <span className="text-foreground">{selectedOrder.shipping.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transportadora:</span>
                    <span className="text-foreground">{selectedOrder.shipping.carrier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Guia:</span>
                    <span className="text-foreground font-mono">{selectedOrder.shipping.trackingNumber}</span>
                  </div>
                  {selectedOrder.shipping.deliveredDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Entregado:</span>
                      <span className="text-green-600 font-medium">{selectedOrder.shipping.deliveredDate}</span>
                    </div>
                  )}
                  {selectedOrder.shipping.estimatedDelivery && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Entrega estimada:</span>
                      <span className="text-foreground">{selectedOrder.shipping.estimatedDelivery}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Productos</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-xl">
                      <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-foreground">{formatCurrency(item.price)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl">
                <div>
                  <p className="text-sm text-muted-foreground">Total del pedido</p>
                  <p className="text-sm text-accent">+{selectedOrder.pointsEarned} AlmaPuntos ganados</p>
                </div>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(selectedOrder.total)}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
