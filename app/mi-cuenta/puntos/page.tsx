"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Star, 
  Sparkles, 
  TrendingUp,
  Trophy,
  Crown,
  Gift,
  ShoppingCart,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Info,
  Target,
  Zap
} from "lucide-react"

// Mock data
const pointsData = {
  available: 1250,
  pending: 200,
  lifetime: 3450,
  expiringSoon: 150,
  expiryDate: "15 Abr 2026",
  thisMonth: 320,
  lastMonth: 280,
}

const levels = [
  { name: "Bronce", icon: Star, minPoints: 0, maxPoints: 499, discount: 0, color: "text-amber-700", bgColor: "bg-amber-100" },
  { name: "Plata", icon: Star, minPoints: 500, maxPoints: 1999, discount: 5, color: "text-gray-500", bgColor: "bg-gray-100" },
  { name: "Oro", icon: Trophy, minPoints: 2000, maxPoints: 4999, discount: 10, color: "text-yellow-600", bgColor: "bg-yellow-100" },
  { name: "Diamante", icon: Crown, minPoints: 5000, maxPoints: 999999, discount: 15, color: "text-cyan-500", bgColor: "bg-cyan-100" },
]

const currentLevel = levels[1] // Plata
const nextLevel = levels[2] // Oro

const transactions = [
  { id: 1, type: "earned", description: "Compra #ALM-001234", points: 90, date: "12 Mar 2026" },
  { id: 2, type: "earned", description: "Compra #ALM-001198", points: 156, date: "28 Feb 2026" },
  { id: 3, type: "redeemed", description: "Cupon 10% descuento", points: -500, date: "25 Feb 2026" },
  { id: 4, type: "bonus", description: "Bono cumpleanos mascota", points: 100, date: "20 Feb 2026" },
  { id: 5, type: "earned", description: "Compra #ALM-001156", points: 68, date: "15 Feb 2026" },
  { id: 6, type: "referral", description: "Amigo referido: Juan", points: 500, date: "10 Feb 2026" },
  { id: 7, type: "earned", description: "Compra #ALM-001098", points: 180, date: "1 Feb 2026" },
]

const earnMethods = [
  { icon: ShoppingCart, title: "Compras", description: "1 punto por cada $1.000 gastados", points: "1 pt / $1.000" },
  { icon: Users, title: "Referidos", description: "500 puntos cuando tu amigo hace su primera compra", points: "500 pts" },
  { icon: Calendar, title: "Cumpleanos mascota", description: "100 puntos de regalo en el cumpleanos de tu peludo", points: "100 pts" },
  { icon: Star, title: "Resenas", description: "50 puntos por cada resena con foto", points: "50 pts" },
  { icon: Target, title: "Misiones", description: "Completa retos especiales para ganar puntos extra", points: "Varia" },
]

export default function PointsPage() {
  const progressToNextLevel = ((pointsData.lifetime - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
  const pointsNeeded = nextLevel.minPoints - pointsData.lifetime

  const getTransactionIcon = (type: string) => {
    switch(type) {
      case "earned": return ShoppingCart
      case "redeemed": return Gift
      case "bonus": return Sparkles
      case "referral": return Users
      default: return Star
    }
  }

  const getTransactionColor = (type: string) => {
    switch(type) {
      case "earned": return "text-green-600 bg-green-100"
      case "redeemed": return "text-blue-600 bg-blue-100"
      case "bonus": return "text-accent bg-accent/20"
      case "referral": return "text-purple-600 bg-purple-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">AlmaPuntos</h1>
        <p className="text-muted-foreground">Acumula puntos con cada compra y canjealos por recompensas</p>
      </div>

      {/* Points Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Points Card */}
        <Card className="md:col-span-2 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-primary-foreground">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5" />
              <span className="font-medium">Puntos Disponibles</span>
            </div>
            <p className="text-5xl font-bold mb-4">{pointsData.available.toLocaleString()}</p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="bg-white/20 rounded-lg px-3 py-1.5">
                <span className="opacity-80">Pendientes:</span>
                <span className="ml-1 font-semibold">+{pointsData.pending}</span>
              </div>
              <div className="bg-white/20 rounded-lg px-3 py-1.5">
                <span className="opacity-80">Historico:</span>
                <span className="ml-1 font-semibold">{pointsData.lifetime.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <CardContent className="p-6">
            {/* Level Progress */}
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${currentLevel.bgColor}`}>
                <currentLevel.icon className={`h-7 w-7 ${currentLevel.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-foreground">Nivel {currentLevel.name}</span>
                  <span className="text-sm text-muted-foreground">{pointsNeeded} pts para {nextLevel.name}</span>
                </div>
                <Progress value={progressToNextLevel} className="h-3" />
              </div>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${nextLevel.bgColor} opacity-50`}>
                <nextLevel.icon className={`h-7 w-7 ${nextLevel.color}`} />
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>Los puntos de compras se reflejan 24 horas despues de confirmar el pago</span>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              Este Mes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-3xl font-bold text-foreground">+{pointsData.thisMonth}</p>
              <p className="text-sm text-muted-foreground">puntos ganados</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">
                  +{Math.round(((pointsData.thisMonth - pointsData.lastMonth) / pointsData.lastMonth) * 100)}% vs mes anterior
                </span>
              </div>
            </div>

            {pointsData.expiringSoon > 0 && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl">
                <div className="flex items-center gap-2 text-destructive mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium text-sm">Por vencer</span>
                </div>
                <p className="text-lg font-bold text-destructive">{pointsData.expiringSoon} pts</p>
                <p className="text-xs text-destructive/80">Vencen {pointsData.expiryDate}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="history" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="earn">Como Ganar</TabsTrigger>
          <TabsTrigger value="levels">Niveles</TabsTrigger>
        </TabsList>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {transactions.map((transaction) => {
                  const Icon = getTransactionIcon(transaction.type)
                  const colorClass = getTransactionColor(transaction.type)
                  const isPositive = transaction.points > 0

                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 font-bold ${isPositive ? 'text-green-600' : 'text-blue-600'}`}>
                        {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        {isPositive ? '+' : ''}{transaction.points}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Earn Tab */}
        <TabsContent value="earn" className="space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnMethods.map((method) => (
              <Card key={method.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <method.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    <Sparkles className="mr-1 h-3 w-3" />
                    {method.points}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Levels Tab */}
        <TabsContent value="levels" className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {levels.map((level, index) => {
              const isCurrent = level.name === currentLevel.name
              const isLocked = index > levels.indexOf(currentLevel)
              const LevelIcon = level.icon

              return (
                <Card 
                  key={level.name} 
                  className={`relative overflow-hidden ${isCurrent ? 'ring-2 ring-primary' : ''} ${isLocked ? 'opacity-60' : ''}`}
                >
                  {isCurrent && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg font-medium">
                      Tu nivel
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${level.bgColor}`}>
                        <LevelIcon className={`h-8 w-8 ${level.color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{level.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {level.minPoints.toLocaleString()} - {level.maxPoints < 999999 ? level.maxPoints.toLocaleString() : '+'} pts
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`h-4 w-4 ${level.discount > 0 ? 'text-green-500' : 'text-muted-foreground'}`} />
                        <span className={`text-sm ${level.discount > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {level.discount > 0 ? `${level.discount}% descuento en compras` : 'Sin descuento adicional'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`h-4 w-4 ${index >= 1 ? 'text-green-500' : 'text-muted-foreground'}`} />
                        <span className={`text-sm ${index >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                          Regalo cumpleanos mascota
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`h-4 w-4 ${index >= 2 ? 'text-green-500' : 'text-muted-foreground'}`} />
                        <span className={`text-sm ${index >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
                          Envio gratis ilimitado
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`h-4 w-4 ${index >= 3 ? 'text-green-500' : 'text-muted-foreground'}`} />
                        <span className={`text-sm ${index >= 3 ? 'text-foreground' : 'text-muted-foreground'}`}>
                          Acceso anticipado a lanzamientos
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
