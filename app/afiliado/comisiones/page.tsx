"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  DollarSign, 
  Search,
  Calendar,
  Download,
  Filter,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronDown,
  Wallet,
  BanknoteIcon,
  ArrowUpRight
} from "lucide-react"

// Mock data
const commissionStats = {
  available: 485000,
  pending: 125000,
  paid: 2240000,
  thisMonth: 235000,
}

const commissions = [
  { id: 1, orderId: "ALM-2024-001", customer: "Carlos Martinez", product: "Silygran-Pro 500ml", orderTotal: 89900, commission: 13485, rate: 15, date: "2024-03-15", status: "disponible" },
  { id: 2, orderId: "ALM-2024-002", customer: "Ana Lopez", product: "Nano-Lyptus 1L", orderTotal: 145000, commission: 21750, rate: 15, date: "2024-03-15", status: "disponible" },
  { id: 3, orderId: "ALM-2024-003", customer: "Pedro Ramirez", product: "Silygran-Pro 250ml", orderTotal: 54900, commission: 8235, rate: 15, date: "2024-03-14", status: "pendiente" },
  { id: 4, orderId: "ALM-2024-004", customer: "Laura Gomez", product: "Nano-Lyptus 500ml", orderTotal: 85000, commission: 12750, rate: 15, date: "2024-03-13", status: "disponible" },
  { id: 5, orderId: "ALM-2024-005", customer: "Diego Herrera", product: "Pack Completo", orderTotal: 289000, commission: 43350, rate: 15, date: "2024-03-12", status: "pagada" },
  { id: 6, orderId: "ALM-2024-006", customer: "Sofia Ruiz", product: "Silygran-Pro 1L", orderTotal: 159000, commission: 23850, rate: 15, date: "2024-03-11", status: "pagada" },
  { id: 7, orderId: "ALM-2024-007", customer: "Miguel Torres", product: "Nano-Lyptus 250ml", orderTotal: 49900, commission: 7485, rate: 15, date: "2024-03-10", status: "rechazada" },
]

const paymentHistory = [
  { id: 1, date: "2024-03-01", amount: 650000, method: "Transferencia Bancaria", status: "completado", reference: "PAY-2024-003" },
  { id: 2, date: "2024-02-15", amount: 820000, method: "Nequi", status: "completado", reference: "PAY-2024-002" },
  { id: 3, date: "2024-02-01", amount: 450000, method: "Transferencia Bancaria", status: "completado", reference: "PAY-2024-001" },
]

export default function CommissionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState("")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
      disponible: { bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle2 className="h-3 w-3" /> },
      pendiente: { bg: "bg-amber-100", text: "text-amber-700", icon: <Clock className="h-3 w-3" /> },
      pagada: { bg: "bg-blue-100", text: "text-blue-700", icon: <Wallet className="h-3 w-3" /> },
      rechazada: { bg: "bg-red-100", text: "text-red-700", icon: <XCircle className="h-3 w-3" /> },
    }
    const style = styles[status] || styles.pendiente
    return (
      <Badge className={`${style.bg} ${style.text} hover:${style.bg} gap-1`}>
        {style.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const filteredCommissions = commissions.filter(c => {
    const matchesSearch = c.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.product.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Mis Comisiones</h1>
          <p className="text-muted-foreground">Historial de comisiones y pagos</p>
        </div>
        <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <BanknoteIcon className="mr-2 h-4 w-4" />
              Solicitar Retiro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Solicitar Retiro</DialogTitle>
              <DialogDescription>
                Ingresa el monto que deseas retirar. Minimo: $100.000 COP
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Saldo disponible</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(commissionStats.available)}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Monto a retirar</label>
                <Input
                  type="number"
                  placeholder="Ej: 200000"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Metodo de pago</label>
                <Select defaultValue="bank">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Transferencia Bancaria - Bancolombia ****4523</SelectItem>
                    <SelectItem value="nequi">Nequi - 315****890</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3 inline mr-1" />
                Los retiros se procesan en 24-48 horas habiles
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setWithdrawDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Confirmar Retiro
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Wallet className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-green-600">{formatCurrency(commissionStats.available)}</p>
              <p className="text-sm text-muted-foreground">Disponible para retiro</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">{formatCurrency(commissionStats.pending)}</p>
              <p className="text-sm text-muted-foreground">Pendiente por confirmar</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">{formatCurrency(commissionStats.paid)}</p>
              <p className="text-sm text-muted-foreground">Total pagado</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                12%
              </Badge>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">{formatCurrency(commissionStats.thisMonth)}</p>
              <p className="text-sm text-muted-foreground">Este mes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="commissions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="commissions">Comisiones</TabsTrigger>
          <TabsTrigger value="payments">Historial de Pagos</TabsTrigger>
        </TabsList>

        <TabsContent value="commissions" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por cliente, pedido o producto..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="disponible">Disponible</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="pagada">Pagada</SelectItem>
                    <SelectItem value="rechazada">Rechazada</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Commissions Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-medium text-muted-foreground">Pedido</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Cliente</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Producto</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Total Venta</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Comision</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Fecha</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredCommissions.map((commission) => (
                      <tr key={commission.id} className="hover:bg-muted/30">
                        <td className="p-4">
                          <span className="font-mono text-sm">{commission.orderId}</span>
                        </td>
                        <td className="p-4 font-medium">{commission.customer}</td>
                        <td className="p-4 text-muted-foreground hidden md:table-cell">{commission.product}</td>
                        <td className="p-4 hidden lg:table-cell">{formatCurrency(commission.orderTotal)}</td>
                        <td className="p-4">
                          <span className="font-bold text-green-600">{formatCurrency(commission.commission)}</span>
                          <span className="text-xs text-muted-foreground ml-1">({commission.rate}%)</span>
                        </td>
                        <td className="p-4 text-muted-foreground hidden sm:table-cell">{commission.date}</td>
                        <td className="p-4">{getStatusBadge(commission.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Pagos Recibidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div 
                    key={payment.id} 
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Pago recibido</p>
                        <p className="text-sm text-muted-foreground">
                          {payment.method} - {payment.reference}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">{formatCurrency(payment.amount)}</p>
                      <p className="text-sm text-muted-foreground">{payment.date}</p>
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
