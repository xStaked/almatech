"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  Download,
  Eye,
  MoreHorizontal,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  Phone,
  Mail,
  ShoppingCart,
  DollarSign,
  Calendar
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock orders data
const orders = [
  { 
    id: "ALM-001234",
    customer: { name: "Maria Garcia", email: "maria@email.com", phone: "+57 300 111 2222", address: "Calle 123 #45-67, Bogota" },
    affiliate: { name: "Carlos Mendez", id: "AFF-001" },
    products: [
      { name: "Silygran-Pro 120ml", quantity: 2, price: 289900 },
    ],
    subtotal: 579800,
    shipping: 15000,
    total: 594800,
    commission: 89370,
    status: "completado",
    paymentStatus: "pagado",
    date: "2026-03-15T10:30:00",
    trackingNumber: "COL1234567890"
  },
  { 
    id: "ALM-001233",
    customer: { name: "Juan Rodriguez", email: "juan@email.com", phone: "+57 301 222 3333", address: "Carrera 50 #20-30, Medellin" },
    affiliate: { name: "Ana Lopez", id: "AFF-002" },
    products: [
      { name: "Nano-Lyptus 60ml", quantity: 1, price: 79900 },
      { name: "Silygran-Pro 30ml", quantity: 1, price: 89900 },
    ],
    subtotal: 169800,
    shipping: 15000,
    total: 184800,
    commission: 25470,
    status: "procesando",
    paymentStatus: "pagado",
    date: "2026-03-15T09:15:00",
    trackingNumber: null
  },
  { 
    id: "ALM-001232",
    customer: { name: "Laura Martinez", email: "laura@email.com", phone: "+57 302 333 4444", address: "Av. 6 Norte #25N-40, Cali" },
    affiliate: { name: "Pedro Sanchez", id: "AFF-003" },
    products: [
      { name: "Glucopass 30ml", quantity: 3, price: 94900 },
    ],
    subtotal: 284700,
    shipping: 0,
    total: 284700,
    commission: 42705,
    status: "enviado",
    paymentStatus: "pagado",
    date: "2026-03-14T16:45:00",
    trackingNumber: "COL9876543210"
  },
  { 
    id: "ALM-001231",
    customer: { name: "Diego Hernandez", email: "diego@email.com", phone: "+57 303 444 5555", address: "Calle 84 #42-15, Barranquilla" },
    affiliate: { name: "Sofia Torres", id: "AFF-004" },
    products: [
      { name: "Nano-Lyptus 1L", quantity: 1, price: 450000 },
    ],
    subtotal: 450000,
    shipping: 0,
    total: 450000,
    commission: 67500,
    status: "pendiente",
    paymentStatus: "pendiente",
    date: "2026-03-14T14:20:00",
    trackingNumber: null
  },
  { 
    id: "ALM-001230",
    customer: { name: "Carmen Ruiz", email: "carmen@email.com", phone: "+57 304 555 6666", address: "Transversal 39A #71-95, Bogota" },
    affiliate: { name: "Carlos Mendez", id: "AFF-001" },
    products: [
      { name: "Silygran-Pro 30ml", quantity: 2, price: 89900 },
      { name: "Nano-Lyptus 120ml", quantity: 1, price: 149900 },
    ],
    subtotal: 329700,
    shipping: 15000,
    total: 344700,
    commission: 49455,
    status: "cancelado",
    paymentStatus: "reembolsado",
    date: "2026-03-13T11:00:00",
    trackingNumber: null
  },
]

const stats = [
  { name: "Hoy", value: "$2.4M", count: 12, icon: Calendar },
  { name: "Procesando", value: 3, icon: Clock, color: "text-accent" },
  { name: "Enviados", value: 8, icon: Truck, color: "text-blue-500" },
  { name: "Completados", value: 156, icon: CheckCircle, color: "text-secondary" },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('es-CO', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getStatusBadge(status: string) {
  switch (status) {
    case "pendiente":
      return <Badge className="bg-accent/20 text-bourbon border-accent/30">Pendiente</Badge>
    case "procesando":
      return <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">Procesando</Badge>
    case "enviado":
      return <Badge className="bg-purple-500/20 text-purple-600 border-purple-500/30">Enviado</Badge>
    case "completado":
      return <Badge className="bg-secondary/20 text-secondary border-secondary/30">Completado</Badge>
    case "cancelado":
      return <Badge className="bg-red-500/20 text-red-600 border-red-500/30">Cancelado</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function getPaymentBadge(status: string) {
  switch (status) {
    case "pagado":
      return <Badge variant="outline" className="text-secondary border-secondary/30">Pagado</Badge>
    case "pendiente":
      return <Badge variant="outline" className="text-bourbon border-accent/30">Pendiente</Badge>
    case "reembolsado":
      return <Badge variant="outline" className="text-muted-foreground">Reembolsado</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.affiliate.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pedidos</h1>
          <p className="text-muted-foreground">Gestiona todos los pedidos de la plataforma</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat.color || ''}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.name}</p>
                </div>
                {stat.count && <Badge variant="secondary" className="ml-auto text-xs">{stat.count} pedidos</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por ID, cliente o afiliado..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="procesando">Procesando</SelectItem>
                  <SelectItem value="enviado">Enviado</SelectItem>
                  <SelectItem value="completado">Completado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Pedido</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden md:table-cell">Cliente</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden lg:table-cell">Afiliado</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground">Total</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Estado</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden sm:table-cell">Pago</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="p-4">
                      <p className="font-medium text-foreground">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(order.date)}</p>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <p className="text-sm font-medium">{order.customer.name}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">{order.products.map(p => p.name).join(', ')}</p>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <p className="text-sm">{order.affiliate.name}</p>
                      <p className="text-xs text-muted-foreground">{order.affiliate.id}</p>
                    </td>
                    <td className="p-4 text-right">
                      <p className="font-bold text-foreground">{formatCurrency(order.total)}</p>
                      <p className="text-xs text-secondary">Com: {formatCurrency(order.commission)}</p>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      {getPaymentBadge(order.paymentStatus)}
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { setSelectedOrder(order); setIsDetailOpen(true); }}>
                            <Eye className="h-4 w-4 mr-2" /> Ver detalle
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Package className="h-4 w-4 mr-2" /> Actualizar estado
                          </DropdownMenuItem>
                          {order.trackingNumber && (
                            <DropdownMenuItem>
                              <Truck className="h-4 w-4 mr-2" /> Ver tracking
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <XCircle className="h-4 w-4 mr-2" /> Cancelar pedido
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order detail dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-xl">{selectedOrder.id}</DialogTitle>
                    <DialogDescription>{formatDate(selectedOrder.date)}</DialogDescription>
                  </div>
                  <div className="flex gap-2">
                    {getStatusBadge(selectedOrder.status)}
                    {getPaymentBadge(selectedOrder.paymentStatus)}
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="details" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Detalles</TabsTrigger>
                  <TabsTrigger value="customer">Cliente</TabsTrigger>
                  <TabsTrigger value="tracking">Tracking</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 mt-4">
                  {/* Products */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Productos</p>
                    <div className="space-y-2">
                      {selectedOrder.products.map((product, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                              <Package className="h-5 w-5 text-secondary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{product.name}</p>
                              <p className="text-xs text-muted-foreground">Cantidad: {product.quantity}</p>
                            </div>
                          </div>
                          <p className="font-semibold">{formatCurrency(product.price * product.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="p-4 rounded-xl border">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatCurrency(selectedOrder.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Envio</span>
                        <span>{selectedOrder.shipping === 0 ? 'Gratis' : formatCurrency(selectedOrder.shipping)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-lg">{formatCurrency(selectedOrder.total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Affiliate & Commission */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-secondary/20 text-secondary text-sm">
                          {selectedOrder.affiliate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedOrder.affiliate.name}</p>
                        <p className="text-xs text-muted-foreground">{selectedOrder.affiliate.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Comision (15%)</p>
                      <p className="font-bold text-secondary">{formatCurrency(selectedOrder.commission)}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="customer" className="space-y-4 mt-4">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm font-medium">{selectedOrder.customer.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Telefono</p>
                        <p className="text-sm font-medium">{selectedOrder.customer.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Direccion de envio</p>
                        <p className="text-sm font-medium">{selectedOrder.customer.address}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tracking" className="space-y-4 mt-4">
                  {selectedOrder.trackingNumber ? (
                    <div className="p-4 rounded-xl border">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <Truck className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Numero de guia</p>
                          <p className="text-sm text-muted-foreground">{selectedOrder.trackingNumber}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-secondary" />
                          <div>
                            <p className="text-sm font-medium">Pedido entregado</p>
                            <p className="text-xs text-muted-foreground">15 Mar 2026, 14:30</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-secondary/50" />
                          <div>
                            <p className="text-sm">En camino a destino</p>
                            <p className="text-xs text-muted-foreground">15 Mar 2026, 08:00</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-secondary/50" />
                          <div>
                            <p className="text-sm">Paquete en centro de distribucion</p>
                            <p className="text-xs text-muted-foreground">14 Mar 2026, 16:00</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-secondary/50" />
                          <div>
                            <p className="text-sm">Pedido despachado</p>
                            <p className="text-xs text-muted-foreground">14 Mar 2026, 10:00</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Truck className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                      <p className="text-muted-foreground">Este pedido aun no ha sido enviado</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Cerrar</Button>
                <Button className="bg-secondary hover:bg-secondary/90">
                  Actualizar estado
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
