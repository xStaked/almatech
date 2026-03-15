"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Package,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for charts
const monthlyRevenue = [
  { month: "Sep", value: 28500000 },
  { month: "Oct", value: 32100000 },
  { month: "Nov", value: 38700000 },
  { month: "Dic", value: 45200000 },
  { month: "Ene", value: 41800000 },
  { month: "Feb", value: 48900000 },
  { month: "Mar", value: 52300000 },
]

const productSales = [
  { name: "Silygran-Pro", sales: 523, percentage: 42 },
  { name: "Nano-Lyptus", sales: 412, percentage: 33 },
  { name: "Glucopass", sales: 310, percentage: 25 },
]

const topAffiliates = [
  { name: "Carlos Mendez", sales: 156, revenue: 15600000, commission: 2340000, growth: 15 },
  { name: "Ana Lopez", sales: 134, revenue: 13400000, commission: 2010000, growth: 8 },
  { name: "Pedro Sanchez", sales: 98, revenue: 9800000, commission: 1470000, growth: 22 },
  { name: "Sofia Torres", sales: 87, revenue: 8700000, commission: 1305000, growth: -5 },
  { name: "Miguel Diaz", sales: 76, revenue: 7600000, commission: 1140000, growth: 12 },
]

const kpis = [
  { name: "Ingresos Totales", value: "$287.5M", change: "+18.2%", trend: "up", icon: DollarSign },
  { name: "Pedidos", value: "2,847", change: "+12.5%", trend: "up", icon: ShoppingCart },
  { name: "Afiliados Activos", value: "1,890", change: "+8.3%", trend: "up", icon: Users },
  { name: "Comisiones Pagadas", value: "$43.1M", change: "+15.7%", trend: "up", icon: DollarSign },
  { name: "Ticket Promedio", value: "$101,000", change: "-2.1%", trend: "down", icon: Package },
  { name: "Conversion", value: "6.8%", change: "+0.5%", trend: "up", icon: TrendingUp },
]

const revenueByCity = [
  { city: "Bogota", revenue: 98500000, percentage: 34 },
  { city: "Medellin", revenue: 72300000, percentage: 25 },
  { city: "Cali", revenue: 46200000, percentage: 16 },
  { city: "Barranquilla", revenue: 34800000, percentage: 12 },
  { city: "Otras", revenue: 35700000, percentage: 13 },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)
}

export default function ReportsPage() {
  const [period, setPeriod] = useState("month")
  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.value))

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reportes</h1>
          <p className="text-muted-foreground">Analisis y metricas de la operacion</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="quarter">Este trimestre</SelectItem>
              <SelectItem value="year">Este ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((kpi) => (
          <Card key={kpi.name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  kpi.trend === 'up' ? 'bg-secondary/20' : 'bg-red-500/20'
                }`}>
                  <kpi.icon className={`h-4 w-4 ${kpi.trend === 'up' ? 'text-secondary' : 'text-red-500'}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  kpi.trend === 'up' ? 'text-secondary' : 'text-red-500'
                }`}>
                  {kpi.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {kpi.change}
                </div>
              </div>
              <p className="text-xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-secondary" />
              Ingresos Mensuales
            </CardTitle>
            <CardDescription>Evolucion de ventas en los ultimos 7 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end gap-2">
              {monthlyRevenue.map((item, idx) => (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className={`w-full rounded-t-lg transition-all ${
                      idx === monthlyRevenue.length - 1 ? 'bg-secondary' : 'bg-secondary/30'
                    }`}
                    style={{ height: `${(item.value / maxRevenue) * 200}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{item.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total del periodo</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(monthlyRevenue.reduce((sum, m) => sum + m.value, 0))}
                </p>
              </div>
              <Badge className="bg-secondary/20 text-secondary">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18.2% vs periodo anterior
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Product distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-accent" />
              Ventas por Producto
            </CardTitle>
            <CardDescription>Distribucion de unidades vendidas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productSales.map((product, idx) => (
                <div key={product.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{product.name}</span>
                    <span className="text-sm text-muted-foreground">{product.sales} uds</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        idx === 0 ? 'bg-secondary' : idx === 1 ? 'bg-accent' : 'bg-bourbon'
                      }`}
                      style={{ width: `${product.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{product.percentage}% del total</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground">Total unidades vendidas</p>
              <p className="text-2xl font-bold text-foreground">
                {productSales.reduce((sum, p) => sum + p.sales, 0).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs section */}
      <Tabs defaultValue="affiliates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="affiliates">Top Afiliados</TabsTrigger>
          <TabsTrigger value="cities">Por Ciudad</TabsTrigger>
        </TabsList>

        <TabsContent value="affiliates">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento de Afiliados</CardTitle>
              <CardDescription>Top 5 afiliados por ventas en el periodo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-3 text-xs font-medium text-muted-foreground">#</th>
                      <th className="text-left pb-3 text-xs font-medium text-muted-foreground">Afiliado</th>
                      <th className="text-right pb-3 text-xs font-medium text-muted-foreground">Ventas</th>
                      <th className="text-right pb-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">Ingresos</th>
                      <th className="text-right pb-3 text-xs font-medium text-muted-foreground">Comision</th>
                      <th className="text-right pb-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Crecimiento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topAffiliates.map((affiliate, idx) => (
                      <tr key={affiliate.name} className="border-b last:border-0">
                        <td className="py-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            idx === 0 ? 'bg-amber-500/20 text-amber-600' :
                            idx === 1 ? 'bg-gray-400/20 text-gray-600' :
                            idx === 2 ? 'bg-orange-700/20 text-orange-700' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {idx + 1}
                          </div>
                        </td>
                        <td className="py-3">
                          <p className="font-medium">{affiliate.name}</p>
                        </td>
                        <td className="py-3 text-right">
                          <p className="font-semibold">{affiliate.sales}</p>
                        </td>
                        <td className="py-3 text-right hidden sm:table-cell">
                          <p className="text-muted-foreground">{formatCurrency(affiliate.revenue)}</p>
                        </td>
                        <td className="py-3 text-right">
                          <p className="font-semibold text-secondary">{formatCurrency(affiliate.commission)}</p>
                        </td>
                        <td className="py-3 text-right hidden md:table-cell">
                          <div className={`inline-flex items-center gap-1 text-sm font-medium ${
                            affiliate.growth >= 0 ? 'text-secondary' : 'text-red-500'
                          }`}>
                            {affiliate.growth >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {affiliate.growth >= 0 ? '+' : ''}{affiliate.growth}%
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cities">
          <Card>
            <CardHeader>
              <CardTitle>Ventas por Ciudad</CardTitle>
              <CardDescription>Distribucion geografica de ingresos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueByCity.map((item, idx) => (
                  <div key={item.city} className="flex items-center gap-4">
                    <div className="w-24 font-medium">{item.city}</div>
                    <div className="flex-1">
                      <div className="h-4 rounded-full bg-muted overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            idx === 0 ? 'bg-secondary' : 
                            idx === 1 ? 'bg-secondary/80' : 
                            idx === 2 ? 'bg-secondary/60' : 
                            idx === 3 ? 'bg-secondary/40' : 'bg-secondary/20'
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-24 text-right">
                      <p className="font-semibold">{formatCurrency(item.revenue)}</p>
                      <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
