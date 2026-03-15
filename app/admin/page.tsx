"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  TrendingDown,
  ArrowRight,
  MoreHorizontal,
  Eye
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

// Mock data for dashboard
const stats = [
  {
    name: "Ventas Totales",
    value: "$45,231,000",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    color: "bg-secondary"
  },
  {
    name: "Afiliados Activos",
    value: "2,350",
    change: "+180",
    trend: "up",
    icon: Users,
    color: "bg-accent"
  },
  {
    name: "Pedidos del Mes",
    value: "1,234",
    change: "+12.5%",
    trend: "up",
    icon: ShoppingCart,
    color: "bg-bourbon"
  },
  {
    name: "Comisiones Pendientes",
    value: "$12,450,000",
    change: "48 afiliados",
    trend: "neutral",
    icon: Package,
    color: "bg-primary"
  },
]

const recentOrders = [
  { id: "ALM-001234", customer: "Maria Garcia", affiliate: "Carlos Mendez", product: "Silygran-Pro 120ml", amount: 289900, status: "completado", date: "Hace 5 min" },
  { id: "ALM-001233", customer: "Juan Rodriguez", affiliate: "Ana Lopez", product: "Nano-Lyptus 60ml", amount: 79900, status: "procesando", date: "Hace 15 min" },
  { id: "ALM-001232", customer: "Laura Martinez", affiliate: "Pedro Sanchez", product: "Glucopass 30ml", amount: 94900, status: "completado", date: "Hace 1 hora" },
  { id: "ALM-001231", customer: "Diego Hernandez", affiliate: "Sofia Torres", product: "Nano-Lyptus 1L", amount: 450000, status: "enviado", date: "Hace 2 horas" },
  { id: "ALM-001230", customer: "Carmen Ruiz", affiliate: "Carlos Mendez", product: "Silygran-Pro 30ml", amount: 89900, status: "completado", date: "Hace 3 horas" },
]

const topAffiliates = [
  { name: "Carlos Mendez", sales: 45, commission: 2340000, avatar: "CM" },
  { name: "Ana Lopez", sales: 38, commission: 1980000, avatar: "AL" },
  { name: "Pedro Sanchez", sales: 32, commission: 1650000, avatar: "PS" },
  { name: "Sofia Torres", sales: 28, commission: 1420000, avatar: "ST" },
  { name: "Miguel Diaz", sales: 25, commission: 1280000, avatar: "MD" },
]

const pendingLiquidations = [
  { affiliate: "Carlos Mendez", amount: 2340000, orders: 45, requestDate: "12 Mar 2026" },
  { affiliate: "Ana Lopez", amount: 1980000, orders: 38, requestDate: "11 Mar 2026" },
  { affiliate: "Pedro Sanchez", amount: 1650000, orders: 32, requestDate: "10 Mar 2026" },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Resumen general de la operacion</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Exportar</Button>
          <Button size="sm" className="bg-secondary hover:bg-secondary/90">
            Ver reportes
          </Button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                {stat.trend !== "neutral" && (
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-secondary" : "text-destructive"
                  }`}>
                    {stat.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {stat.change}
                  </div>
                )}
                {stat.trend === "neutral" && (
                  <Badge variant="secondary" className="text-xs">{stat.change}</Badge>
                )}
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent orders - takes 2 columns */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Pedidos Recientes</CardTitle>
              <CardDescription>Ultimas transacciones de la plataforma</CardDescription>
            </div>
            <Link href="/admin/pedidos">
              <Button variant="ghost" size="sm" className="gap-1">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 text-xs font-medium text-muted-foreground">Pedido</th>
                    <th className="pb-3 text-xs font-medium text-muted-foreground">Cliente</th>
                    <th className="pb-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">Afiliado</th>
                    <th className="pb-3 text-xs font-medium text-muted-foreground text-right">Monto</th>
                    <th className="pb-3 text-xs font-medium text-muted-foreground">Estado</th>
                    <th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-3">
                        <p className="font-medium text-sm">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </td>
                      <td className="py-3">
                        <p className="text-sm">{order.customer}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[120px]">{order.product}</p>
                      </td>
                      <td className="py-3 hidden sm:table-cell">
                        <p className="text-sm text-muted-foreground">{order.affiliate}</p>
                      </td>
                      <td className="py-3 text-right">
                        <p className="font-medium text-sm">{formatCurrency(order.amount)}</p>
                      </td>
                      <td className="py-3">
                        <Badge variant={
                          order.status === "completado" ? "default" :
                          order.status === "procesando" ? "secondary" :
                          "outline"
                        } className={
                          order.status === "completado" ? "bg-secondary/20 text-secondary border-secondary/30" :
                          order.status === "enviado" ? "bg-accent/20 text-bourbon border-accent/30" :
                          ""
                        }>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> Ver detalle</DropdownMenuItem>
                            <DropdownMenuItem>Editar estado</DropdownMenuItem>
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

        {/* Top affiliates */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Top Afiliados</CardTitle>
              <CardDescription>Mejores vendedores del mes</CardDescription>
            </div>
            <Link href="/admin/afiliados">
              <Button variant="ghost" size="sm" className="gap-1">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topAffiliates.map((affiliate, index) => (
                <div key={affiliate.name} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-bold">
                    {index + 1}
                  </div>
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-secondary/20 text-secondary text-xs">{affiliate.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{affiliate.name}</p>
                    <p className="text-xs text-muted-foreground">{affiliate.sales} ventas</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-secondary">{formatCurrency(affiliate.commission)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending liquidations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg">Liquidaciones Pendientes</CardTitle>
            <CardDescription>Solicitudes de pago de comisiones por aprobar</CardDescription>
          </div>
          <Link href="/admin/liquidaciones">
            <Button variant="ghost" size="sm" className="gap-1">
              Ver todas <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pendingLiquidations.map((item) => (
              <div key={item.affiliate} className="p-4 rounded-xl border border-border bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-accent/20 text-accent-foreground text-xs">
                        {item.affiliate.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{item.affiliate}</span>
                  </div>
                  <Badge variant="outline" className="text-xs bg-accent/10 text-bourbon border-accent/30">
                    Pendiente
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monto</span>
                    <span className="font-bold text-foreground">{formatCurrency(item.amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pedidos</span>
                    <span>{item.orders}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Solicitud</span>
                    <span>{item.requestDate}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1 bg-secondary hover:bg-secondary/90">
                    Aprobar
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Revisar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
