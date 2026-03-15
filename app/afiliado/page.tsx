"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Copy,
  CheckCircle2,
  ExternalLink,
  Calendar,
  Target,
  Award,
  ChevronRight,
  Sparkles
} from "lucide-react"

// Mock data
const stats = {
  totalEarnings: 2850000,
  earningsChange: 15.3,
  pendingBalance: 485000,
  totalSales: 47,
  salesChange: 8.2,
  directReferrals: 12,
  referralsChange: 25,
  conversionRate: 3.2,
}

const recentSales = [
  { id: 1, customer: "Carlos M.", product: "Silygran-Pro 500ml", amount: 89900, commission: 13485, date: "Hace 2 horas", status: "completada" },
  { id: 2, customer: "Ana L.", product: "Nano-Lyptus 1L", amount: 145000, commission: 21750, date: "Hace 5 horas", status: "completada" },
  { id: 3, customer: "Pedro R.", product: "Silygran-Pro 250ml", amount: 54900, commission: 8235, date: "Ayer", status: "pendiente" },
  { id: 4, customer: "Laura G.", product: "Nano-Lyptus 500ml", amount: 85000, commission: 12750, date: "Hace 2 dias", status: "completada" },
]

const monthlyGoals = {
  sales: { current: 47, target: 60, label: "Ventas del mes" },
  earnings: { current: 485000, target: 800000, label: "Meta de comisiones" },
  referrals: { current: 3, target: 5, label: "Nuevos referidos" },
}

const levels = [
  { name: "Bronce", minSales: 0, commission: 12, current: false },
  { name: "Plata", minSales: 20, commission: 14, current: false },
  { name: "Oro", minSales: 40, commission: 15, current: true },
  { name: "Platino", minSales: 50, commission: 17, current: false },
  { name: "Diamante", minSales: 100, commission: 20, current: false },
]

export default function AffiliateDashboard() {
  const [linkCopied, setLinkCopied] = useState(false)
  const affiliateLink = "https://almatech.co/r/MARIA2024"

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(affiliateLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const currentLevelIndex = levels.findIndex(l => l.current)
  const nextLevel = levels[currentLevelIndex + 1]
  const currentLevel = levels[currentLevelIndex]
  const salesForNextLevel = nextLevel ? nextLevel.minSales - stats.totalSales : 0

  return (
    <div className="space-y-6">
      {/* Quick Actions Banner */}
      <Card className="bg-gradient-to-r from-primary to-secondary border-0 text-primary-foreground overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">Tu enlace de afiliado</h2>
              <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-lg p-3 max-w-xl">
                <code className="flex-1 text-sm font-mono truncate">{affiliateLink}</code>
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
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" asChild>
                <Link href="/afiliado/enlaces">
                  Ver QR y mas enlaces
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <Badge variant={stats.earningsChange > 0 ? "default" : "destructive"} className="bg-green-100 text-green-700 hover:bg-green-100">
                {stats.earningsChange > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {stats.earningsChange}%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{formatCurrency(stats.totalEarnings)}</p>
              <p className="text-sm text-muted-foreground">Ganancias totales</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                Pendiente
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{formatCurrency(stats.pendingBalance)}</p>
              <p className="text-sm text-muted-foreground">Saldo por liquidar</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <Badge variant={stats.salesChange > 0 ? "default" : "destructive"} className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                {stats.salesChange > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {stats.salesChange}%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{stats.totalSales}</p>
              <p className="text-sm text-muted-foreground">Ventas este mes</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <Badge variant={stats.referralsChange > 0 ? "default" : "destructive"} className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                {stats.referralsChange > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {stats.referralsChange}%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{stats.directReferrals}</p>
              <p className="text-sm text-muted-foreground">Referidos directos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Sales */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Ventas Recientes</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/afiliado/comisiones">
                Ver todas
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{sale.product}</p>
                      <p className="text-sm text-muted-foreground">
                        {sale.customer} - {sale.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+{formatCurrency(sale.commission)}</p>
                    <Badge 
                      variant="outline" 
                      className={sale.status === 'completada' ? 'text-green-600 border-green-200' : 'text-amber-600 border-amber-200'}
                    >
                      {sale.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Level Progress */}
        <div className="space-y-6">
          {/* Current Level Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                Tu Nivel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold">{currentLevel.name}</h3>
                <p className="text-muted-foreground">Comision: {currentLevel.commission}%</p>
              </div>

              {nextLevel && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progreso a {nextLevel.name}</span>
                    <span className="font-medium">{stats.totalSales}/{nextLevel.minSales} ventas</span>
                  </div>
                  <Progress value={(stats.totalSales / nextLevel.minSales) * 100} className="h-2" />
                  <p className="text-xs text-center text-muted-foreground">
                    Te faltan <span className="font-bold text-foreground">{salesForNextLevel} ventas</span> para subir de nivel
                  </p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">Niveles de comision</p>
                <div className="space-y-2">
                  {levels.map((level, index) => (
                    <div 
                      key={level.name}
                      className={`flex items-center justify-between text-sm p-2 rounded-lg ${
                        level.current ? 'bg-accent/20 font-medium' : ''
                      }`}
                    >
                      <span className={level.current ? 'text-foreground' : 'text-muted-foreground'}>
                        {level.name}
                      </span>
                      <span className={level.current ? 'text-accent font-bold' : 'text-muted-foreground'}>
                        {level.commission}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Metas del Mes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(monthlyGoals).map(([key, goal]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{goal.label}</span>
                    <span className="font-medium">
                      {key === 'earnings' 
                        ? `${formatCurrency(goal.current)} / ${formatCurrency(goal.target)}`
                        : `${goal.current} / ${goal.target}`
                      }
                    </span>
                  </div>
                  <Progress 
                    value={(goal.current / goal.target) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Tips */}
      <Card className="bg-muted/50 border-dashed">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Tip del dia</h3>
              <p className="text-muted-foreground text-sm">
                Comparte tu enlace en grupos de WhatsApp de amantes de mascotas. Los testimonios de clientes satisfechos aumentan las conversiones en un 40%.
              </p>
              <Button variant="link" className="px-0 mt-2 h-auto" asChild>
                <Link href="/afiliado/marketing">
                  Ver mas consejos y materiales
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
