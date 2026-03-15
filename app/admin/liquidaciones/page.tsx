"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Search, 
  Filter, 
  Download,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MoreHorizontal,
  Calendar,
  CreditCard,
  Building,
  FileText
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
import { Textarea } from "@/components/ui/textarea"

// Mock liquidations data
const liquidations = [
  { 
    id: "LIQ-001234",
    affiliate: "Carlos Mendez",
    email: "carlos@email.com",
    amount: 2340000,
    orders: 45,
    period: "Feb 2026",
    requestDate: "2026-03-12",
    status: "pendiente",
    paymentMethod: "Transferencia",
    bankAccount: "****4567",
    bank: "Bancolombia"
  },
  { 
    id: "LIQ-001233",
    affiliate: "Ana Lopez",
    email: "ana@email.com",
    amount: 1980000,
    orders: 38,
    period: "Feb 2026",
    requestDate: "2026-03-11",
    status: "pendiente",
    paymentMethod: "Transferencia",
    bankAccount: "****8901",
    bank: "Davivienda"
  },
  { 
    id: "LIQ-001232",
    affiliate: "Pedro Sanchez",
    email: "pedro@email.com",
    amount: 1650000,
    orders: 32,
    period: "Feb 2026",
    requestDate: "2026-03-10",
    status: "aprobada",
    paymentMethod: "Transferencia",
    bankAccount: "****2345",
    bank: "BBVA"
  },
  { 
    id: "LIQ-001231",
    affiliate: "Sofia Torres",
    email: "sofia@email.com",
    amount: 1420000,
    orders: 28,
    period: "Feb 2026",
    requestDate: "2026-03-09",
    status: "pagada",
    paymentMethod: "Transferencia",
    bankAccount: "****6789",
    bank: "Bancolombia",
    paidDate: "2026-03-10"
  },
  { 
    id: "LIQ-001230",
    affiliate: "Miguel Diaz",
    email: "miguel@email.com",
    amount: 630000,
    orders: 12,
    period: "Feb 2026",
    requestDate: "2026-03-08",
    status: "pagada",
    paymentMethod: "Transferencia",
    bankAccount: "****0123",
    bank: "Nequi",
    paidDate: "2026-03-09"
  },
  { 
    id: "LIQ-001229",
    affiliate: "Laura Gomez",
    email: "laura@email.com",
    amount: 420000,
    orders: 8,
    period: "Ene 2026",
    requestDate: "2026-02-05",
    status: "rechazada",
    paymentMethod: "Transferencia",
    bankAccount: "****4567",
    bank: "Bancolombia",
    rejectionReason: "Cuenta bancaria invalida"
  },
]

const stats = [
  { name: "Pendientes", value: "$4.32M", count: 2, icon: Clock, color: "bg-accent/20 text-bourbon" },
  { name: "Aprobadas", value: "$1.65M", count: 1, icon: CheckCircle, color: "bg-blue-500/20 text-blue-600" },
  { name: "Pagadas", value: "$2.05M", count: 2, icon: DollarSign, color: "bg-secondary/20 text-secondary" },
  { name: "Rechazadas", value: "$420K", count: 1, icon: XCircle, color: "bg-red-500/20 text-red-600" },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)
}

function getStatusBadge(status: string) {
  switch (status) {
    case "pendiente":
      return <Badge className="bg-accent/20 text-bourbon border-accent/30">Pendiente</Badge>
    case "aprobada":
      return <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">Aprobada</Badge>
    case "pagada":
      return <Badge className="bg-secondary/20 text-secondary border-secondary/30">Pagada</Badge>
    case "rechazada":
      return <Badge className="bg-red-500/20 text-red-600 border-red-500/30">Rechazada</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function LiquidationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedLiquidation, setSelectedLiquidation] = useState<typeof liquidations[0] | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isApproveOpen, setIsApproveOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [rejectionReason, setRejectionReason] = useState("")

  const filteredLiquidations = liquidations.filter(liq => {
    const matchesSearch = liq.affiliate.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         liq.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || liq.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const pendingTotal = liquidations
    .filter(l => l.status === "pendiente")
    .reduce((sum, l) => sum + l.amount, 0)

  const toggleSelectAll = () => {
    const pendingIds = filteredLiquidations.filter(l => l.status === "pendiente").map(l => l.id)
    if (selectedItems.length === pendingIds.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(pendingIds)
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Liquidaciones</h1>
          <p className="text-muted-foreground">Gestiona los pagos de comisiones a afiliados</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          {selectedItems.length > 0 && (
            <Button size="sm" className="bg-secondary hover:bg-secondary/90">
              <CheckCircle className="h-4 w-4 mr-2" />
              Aprobar ({selectedItems.length})
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.name}</p>
                </div>
                <Badge variant="secondary" className="text-xs">{stat.count}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending summary */}
      {filteredLiquidations.some(l => l.status === "pendiente") && (
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-bourbon" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Liquidaciones pendientes de aprobacion</p>
                  <p className="text-sm text-muted-foreground">
                    {liquidations.filter(l => l.status === "pendiente").length} solicitudes por un total de {formatCurrency(pendingTotal)}
                  </p>
                </div>
              </div>
              <Button className="bg-secondary hover:bg-secondary/90">
                Aprobar todas las pendientes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por afiliado o ID..." 
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
                  <SelectItem value="pendiente">Pendientes</SelectItem>
                  <SelectItem value="aprobada">Aprobadas</SelectItem>
                  <SelectItem value="pagada">Pagadas</SelectItem>
                  <SelectItem value="rechazada">Rechazadas</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liquidations table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="p-4 w-10">
                    <Checkbox 
                      checked={selectedItems.length === filteredLiquidations.filter(l => l.status === "pendiente").length && selectedItems.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">ID / Afiliado</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden md:table-cell">Periodo</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground">Monto</th>
                  <th className="text-center p-4 text-xs font-medium text-muted-foreground hidden sm:table-cell">Pedidos</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Estado</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden lg:table-cell">Fecha solicitud</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredLiquidations.map((liq) => (
                  <tr key={liq.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="p-4">
                      {liq.status === "pendiente" && (
                        <Checkbox 
                          checked={selectedItems.includes(liq.id)}
                          onCheckedChange={() => toggleSelect(liq.id)}
                        />
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-secondary/20 text-secondary text-sm">
                            {liq.affiliate.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{liq.affiliate}</p>
                          <p className="text-xs text-muted-foreground">{liq.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <p className="text-sm">{liq.period}</p>
                    </td>
                    <td className="p-4 text-right">
                      <p className="font-bold text-foreground">{formatCurrency(liq.amount)}</p>
                    </td>
                    <td className="p-4 text-center hidden sm:table-cell">
                      <Badge variant="secondary">{liq.orders}</Badge>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(liq.status)}
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <p className="text-sm text-muted-foreground">{liq.requestDate}</p>
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { setSelectedLiquidation(liq); setIsDetailOpen(true); }}>
                            <Eye className="h-4 w-4 mr-2" /> Ver detalle
                          </DropdownMenuItem>
                          {liq.status === "pendiente" && (
                            <>
                              <DropdownMenuItem onClick={() => { setSelectedLiquidation(liq); setIsApproveOpen(true); }}>
                                <CheckCircle className="h-4 w-4 mr-2" /> Aprobar
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => { setSelectedLiquidation(liq); setIsRejectOpen(true); }}
                              >
                                <XCircle className="h-4 w-4 mr-2" /> Rechazar
                              </DropdownMenuItem>
                            </>
                          )}
                          {liq.status === "aprobada" && (
                            <DropdownMenuItem>
                              <DollarSign className="h-4 w-4 mr-2" /> Marcar como pagada
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" /> Descargar soporte
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

      {/* Detail dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg">
          {selectedLiquidation && (
            <>
              <DialogHeader>
                <DialogTitle>Detalle de Liquidacion</DialogTitle>
                <DialogDescription>{selectedLiquidation.id}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-secondary/20 text-secondary">
                      {selectedLiquidation.affiliate.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{selectedLiquidation.affiliate}</p>
                    <p className="text-sm text-muted-foreground">{selectedLiquidation.email}</p>
                  </div>
                  {getStatusBadge(selectedLiquidation.status)}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Monto</p>
                    </div>
                    <p className="text-lg font-bold text-secondary">{formatCurrency(selectedLiquidation.amount)}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Periodo</p>
                    </div>
                    <p className="text-lg font-bold">{selectedLiquidation.period}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Banco</p>
                    </div>
                    <p className="font-medium">{selectedLiquidation.bank}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Cuenta</p>
                    </div>
                    <p className="font-medium">{selectedLiquidation.bankAccount}</p>
                  </div>
                </div>

                {selectedLiquidation.status === "rechazada" && selectedLiquidation.rejectionReason && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-xs text-red-600 font-medium mb-1">Motivo de rechazo:</p>
                    <p className="text-sm">{selectedLiquidation.rejectionReason}</p>
                  </div>
                )}
              </div>

              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Cerrar</Button>
                {selectedLiquidation.status === "pendiente" && (
                  <Button className="bg-secondary hover:bg-secondary/90" onClick={() => { setIsDetailOpen(false); setIsApproveOpen(true); }}>
                    Aprobar liquidacion
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve dialog */}
      <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aprobar Liquidacion</DialogTitle>
            <DialogDescription>
              Esta accion aprobara el pago de comisiones al afiliado.
            </DialogDescription>
          </DialogHeader>
          {selectedLiquidation && (
            <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 my-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{selectedLiquidation.affiliate}</p>
                  <p className="text-sm text-muted-foreground">{selectedLiquidation.id}</p>
                </div>
                <p className="text-xl font-bold text-secondary">{formatCurrency(selectedLiquidation.amount)}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveOpen(false)}>Cancelar</Button>
            <Button className="bg-secondary hover:bg-secondary/90" onClick={() => setIsApproveOpen(false)}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirmar aprobacion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject dialog */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rechazar Liquidacion</DialogTitle>
            <DialogDescription>
              Por favor indica el motivo del rechazo.
            </DialogDescription>
          </DialogHeader>
          {selectedLiquidation && (
            <>
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 my-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{selectedLiquidation.affiliate}</p>
                    <p className="text-sm text-muted-foreground">{selectedLiquidation.id}</p>
                  </div>
                  <p className="text-xl font-bold">{formatCurrency(selectedLiquidation.amount)}</p>
                </div>
              </div>
              <Textarea 
                placeholder="Motivo del rechazo..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => setIsRejectOpen(false)}>
              <XCircle className="h-4 w-4 mr-2" />
              Confirmar rechazo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
