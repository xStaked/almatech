"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  Search,
  TrendingUp,
  ChevronRight,
  UserPlus,
  DollarSign,
  ShoppingBag,
  Award,
  Copy,
  CheckCircle2
} from "lucide-react"

// Mock data
const networkStats = {
  directReferrals: 12,
  totalNetwork: 28,
  activeThisMonth: 8,
  networkSales: 156,
}

const referrals = [
  { 
    id: 1, 
    name: "Carlos Martinez", 
    email: "carlos@email.com",
    joinDate: "2024-01-15",
    level: "Plata",
    totalSales: 23,
    monthSales: 5,
    totalEarnings: 580000,
    status: "activo",
    avatar: null
  },
  { 
    id: 2, 
    name: "Ana Lopez", 
    email: "ana@email.com",
    joinDate: "2024-02-01",
    level: "Bronce",
    totalSales: 12,
    monthSales: 3,
    totalEarnings: 245000,
    status: "activo",
    avatar: null
  },
  { 
    id: 3, 
    name: "Pedro Ramirez", 
    email: "pedro@email.com",
    joinDate: "2024-02-10",
    level: "Bronce",
    totalSales: 8,
    monthSales: 2,
    totalEarnings: 156000,
    status: "activo",
    avatar: null
  },
  { 
    id: 4, 
    name: "Laura Gomez", 
    email: "laura@email.com",
    joinDate: "2024-02-20",
    level: "Bronce",
    totalSales: 5,
    monthSales: 1,
    totalEarnings: 89000,
    status: "inactivo",
    avatar: null
  },
  { 
    id: 5, 
    name: "Diego Herrera", 
    email: "diego@email.com",
    joinDate: "2024-03-01",
    level: "Bronce",
    totalSales: 3,
    monthSales: 3,
    totalEarnings: 67000,
    status: "activo",
    avatar: null
  },
]

const levelColors: Record<string, string> = {
  "Bronce": "bg-orange-100 text-orange-700",
  "Plata": "bg-slate-100 text-slate-700",
  "Oro": "bg-amber-100 text-amber-700",
  "Platino": "bg-cyan-100 text-cyan-700",
  "Diamante": "bg-purple-100 text-purple-700",
}

export default function NetworkPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [linkCopied, setLinkCopied] = useState(false)
  const inviteLink = "https://almatech.co/unete/MARIA2024"

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const filteredReferrals = referrals.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Mi Red</h1>
          <p className="text-muted-foreground">Gestiona tus referidos y haz crecer tu equipo</p>
        </div>
      </div>

      {/* Invite Card */}
      <Card className="bg-gradient-to-r from-secondary to-primary border-0 text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                <UserPlus className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Invita nuevos afiliados</h2>
                <p className="text-sm text-primary-foreground/80">
                  Gana bonos por cada afiliado activo que se una a tu red
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-lg p-3">
              <code className="flex-1 text-sm font-mono truncate max-w-[200px] sm:max-w-xs">{inviteLink}</code>
              <Button 
                size="sm" 
                variant="secondary"
                onClick={copyLink}
                className="flex-shrink-0"
              >
                {linkCopied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{networkStats.directReferrals}</p>
                <p className="text-sm text-muted-foreground">Referidos directos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{networkStats.totalNetwork}</p>
                <p className="text-sm text-muted-foreground">Red total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{networkStats.activeThisMonth}</p>
                <p className="text-sm text-muted-foreground">Activos este mes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{networkStats.networkSales}</p>
                <p className="text-sm text-muted-foreground">Ventas de red</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referrals List */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle>Mis Referidos Directos</CardTitle>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar referido..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReferrals.map((referral) => (
              <div 
                key={referral.id} 
                className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted/70 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={referral.avatar || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {referral.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{referral.name}</p>
                      <Badge className={`text-xs ${levelColors[referral.level]}`}>
                        {referral.level}
                      </Badge>
                      {referral.status === 'activo' ? (
                        <Badge variant="outline" className="text-green-600 border-green-200 text-xs">Activo</Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground text-xs">Inactivo</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{referral.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">Se unio: {referral.joinDate}</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-lg font-bold">{referral.totalSales}</p>
                    <p className="text-xs text-muted-foreground">Ventas totales</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{referral.monthSales}</p>
                    <p className="text-xs text-muted-foreground">Este mes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">{formatCurrency(referral.totalEarnings)}</p>
                    <p className="text-xs text-muted-foreground">Ganancias</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
