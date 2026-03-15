"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  UserX,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users
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
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock affiliates data
const affiliates = [
  { 
    id: 1, 
    name: "Carlos Mendez", 
    email: "carlos@email.com",
    phone: "+57 300 123 4567",
    city: "Bogota",
    status: "activo",
    tier: "oro",
    joinDate: "2025-06-15",
    totalSales: 45,
    totalRevenue: 15600000,
    commission: 2340000,
    pendingCommission: 450000,
    referrals: 12,
    conversionRate: 8.5
  },
  { 
    id: 2, 
    name: "Ana Lopez", 
    email: "ana@email.com",
    phone: "+57 301 234 5678",
    city: "Medellin",
    status: "activo",
    tier: "oro",
    joinDate: "2025-07-20",
    totalSales: 38,
    totalRevenue: 13200000,
    commission: 1980000,
    pendingCommission: 320000,
    referrals: 8,
    conversionRate: 7.2
  },
  { 
    id: 3, 
    name: "Pedro Sanchez", 
    email: "pedro@email.com",
    phone: "+57 302 345 6789",
    city: "Cali",
    status: "activo",
    tier: "plata",
    joinDate: "2025-08-10",
    totalSales: 32,
    totalRevenue: 11000000,
    commission: 1650000,
    pendingCommission: 280000,
    referrals: 5,
    conversionRate: 6.8
  },
  { 
    id: 4, 
    name: "Sofia Torres", 
    email: "sofia@email.com",
    phone: "+57 303 456 7890",
    city: "Barranquilla",
    status: "activo",
    tier: "plata",
    joinDate: "2025-09-05",
    totalSales: 28,
    totalRevenue: 9500000,
    commission: 1420000,
    pendingCommission: 180000,
    referrals: 3,
    conversionRate: 5.9
  },
  { 
    id: 5, 
    name: "Miguel Diaz", 
    email: "miguel@email.com",
    phone: "+57 304 567 8901",
    city: "Cartagena",
    status: "pendiente",
    tier: "bronce",
    joinDate: "2026-01-15",
    totalSales: 12,
    totalRevenue: 4200000,
    commission: 630000,
    pendingCommission: 95000,
    referrals: 1,
    conversionRate: 4.2
  },
  { 
    id: 6, 
    name: "Laura Gomez", 
    email: "laura@email.com",
    phone: "+57 305 678 9012",
    city: "Bucaramanga",
    status: "inactivo",
    tier: "bronce",
    joinDate: "2025-05-20",
    totalSales: 8,
    totalRevenue: 2800000,
    commission: 420000,
    pendingCommission: 0,
    referrals: 0,
    conversionRate: 2.1
  },
]

const stats = [
  { name: "Total Afiliados", value: "2,350", icon: Users, change: "+12%" },
  { name: "Afiliados Activos", value: "1,890", icon: TrendingUp, change: "+8%" },
  { name: "Comisiones Pagadas", value: "$89.5M", icon: DollarSign, change: "+15%" },
  { name: "Ventas por Afiliados", value: "12,450", icon: ShoppingCart, change: "+22%" },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)
}

function getStatusBadge(status: string) {
  switch (status) {
    case "activo":
      return <Badge className="bg-secondary/20 text-secondary border-secondary/30">Activo</Badge>
    case "pendiente":
      return <Badge className="bg-accent/20 text-bourbon border-accent/30">Pendiente</Badge>
    case "inactivo":
      return <Badge variant="secondary">Inactivo</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function getTierBadge(tier: string) {
  switch (tier) {
    case "oro":
      return <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30">Oro</Badge>
    case "plata":
      return <Badge className="bg-gray-400/20 text-gray-600 border-gray-400/30">Plata</Badge>
    case "bronce":
      return <Badge className="bg-orange-700/20 text-orange-700 border-orange-700/30">Bronce</Badge>
    default:
      return <Badge variant="outline">{tier}</Badge>
  }
}

export default function AffiliatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAffiliate, setSelectedAffiliate] = useState<typeof affiliates[0] | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const filteredAffiliates = affiliates.filter(affiliate => {
    const matchesSearch = affiliate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         affiliate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         affiliate.city.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || affiliate.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Afiliados</h1>
          <p className="text-muted-foreground">Gestiona la red de afiliados de Almatech</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm" className="bg-secondary hover:bg-secondary/90">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo afiliado
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.name}</p>
                </div>
                <Badge variant="secondary" className="ml-auto text-xs text-secondary">{stat.change}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nombre, email o ciudad..." 
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
                  <SelectItem value="activo">Activos</SelectItem>
                  <SelectItem value="pendiente">Pendientes</SelectItem>
                  <SelectItem value="inactivo">Inactivos</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Affiliates table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Afiliado</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden md:table-cell">Contacto</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Estado</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground hidden lg:table-cell">Nivel</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground">Ventas</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground hidden sm:table-cell">Comision</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground hidden lg:table-cell">Pendiente</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredAffiliates.map((affiliate) => (
                  <tr key={affiliate.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-secondary/20 text-secondary text-sm">
                            {affiliate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{affiliate.name}</p>
                          <p className="text-xs text-muted-foreground">{affiliate.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <p className="text-sm">{affiliate.email}</p>
                      <p className="text-xs text-muted-foreground">{affiliate.phone}</p>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(affiliate.status)}
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      {getTierBadge(affiliate.tier)}
                    </td>
                    <td className="p-4 text-right">
                      <p className="font-medium">{affiliate.totalSales}</p>
                      <p className="text-xs text-muted-foreground">{formatCurrency(affiliate.totalRevenue)}</p>
                    </td>
                    <td className="p-4 text-right hidden sm:table-cell">
                      <p className="font-semibold text-secondary">{formatCurrency(affiliate.commission)}</p>
                    </td>
                    <td className="p-4 text-right hidden lg:table-cell">
                      <p className="font-medium text-bourbon">{formatCurrency(affiliate.pendingCommission)}</p>
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { setSelectedAffiliate(affiliate); setIsDetailOpen(true); }}>
                            <Eye className="h-4 w-4 mr-2" /> Ver detalle
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <DollarSign className="h-4 w-4 mr-2" /> Liquidar comision
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <UserX className="h-4 w-4 mr-2" /> Desactivar
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

      {/* Affiliate detail dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          {selectedAffiliate && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-secondary/20 text-secondary text-lg">
                      {selectedAffiliate.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-xl">{selectedAffiliate.name}</DialogTitle>
                    <DialogDescription className="flex items-center gap-2 mt-1">
                      {getStatusBadge(selectedAffiliate.status)}
                      {getTierBadge(selectedAffiliate.tier)}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="info" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Informacion</TabsTrigger>
                  <TabsTrigger value="stats">Estadisticas</TabsTrigger>
                  <TabsTrigger value="commissions">Comisiones</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm font-medium">{selectedAffiliate.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Telefono</p>
                        <p className="text-sm font-medium">{selectedAffiliate.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Ciudad</p>
                        <p className="text-sm font-medium">{selectedAffiliate.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Miembro desde</p>
                        <p className="text-sm font-medium">{selectedAffiliate.joinDate}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="stats" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border bg-muted/30">
                      <p className="text-xs text-muted-foreground">Ventas totales</p>
                      <p className="text-2xl font-bold text-foreground">{selectedAffiliate.totalSales}</p>
                    </div>
                    <div className="p-4 rounded-xl border bg-muted/30">
                      <p className="text-xs text-muted-foreground">Ingresos generados</p>
                      <p className="text-2xl font-bold text-foreground">{formatCurrency(selectedAffiliate.totalRevenue)}</p>
                    </div>
                    <div className="p-4 rounded-xl border bg-muted/30">
                      <p className="text-xs text-muted-foreground">Referidos</p>
                      <p className="text-2xl font-bold text-foreground">{selectedAffiliate.referrals}</p>
                    </div>
                    <div className="p-4 rounded-xl border bg-muted/30">
                      <p className="text-xs text-muted-foreground">Tasa de conversion</p>
                      <p className="text-2xl font-bold text-foreground">{selectedAffiliate.conversionRate}%</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="commissions" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border bg-secondary/10">
                      <p className="text-xs text-muted-foreground">Comision total ganada</p>
                      <p className="text-2xl font-bold text-secondary">{formatCurrency(selectedAffiliate.commission)}</p>
                    </div>
                    <div className="p-4 rounded-xl border bg-accent/10">
                      <p className="text-xs text-muted-foreground">Comision pendiente</p>
                      <p className="text-2xl font-bold text-bourbon">{formatCurrency(selectedAffiliate.pendingCommission)}</p>
                    </div>
                  </div>
                  {selectedAffiliate.pendingCommission > 0 && (
                    <Button className="w-full bg-secondary hover:bg-secondary/90">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Liquidar comision pendiente
                    </Button>
                  )}
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Cerrar</Button>
                <Button className="bg-secondary hover:bg-secondary/90">Editar afiliado</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
