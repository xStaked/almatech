"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Star, 
  Gift, 
  Package, 
  PawPrint, 
  ChevronRight, 
  Sparkles,
  Trophy,
  Crown,
  TrendingUp,
  Calendar,
  Heart,
  ArrowRight,
  CheckCircle2,
  Clock,
  Truck
} from "lucide-react"

// Mock data
const customerData = {
  level: {
    name: "Plata",
    current: 2,
    total: 4,
    nextLevel: "Oro",
    pointsToNext: 850,
    benefits: ["5% descuento en compras", "Regalo de cumpleanos mascota", "Acceso a ofertas exclusivas"]
  },
  points: {
    available: 1250,
    pending: 200,
    expiringSoon: 150,
    expiryDate: "15 Abr 2026"
  },
  stats: {
    totalOrders: 12,
    totalSaved: 125000,
    referrals: 2,
  }
}

const levels = [
  { name: "Bronce", icon: Star, color: "text-amber-700", bgColor: "bg-amber-100", minPoints: 0 },
  { name: "Plata", icon: Star, color: "text-gray-500", bgColor: "bg-gray-100", minPoints: 500 },
  { name: "Oro", icon: Trophy, color: "text-yellow-600", bgColor: "bg-yellow-100", minPoints: 2000 },
  { name: "Diamante", icon: Crown, color: "text-cyan-500", bgColor: "bg-cyan-100", minPoints: 5000 },
]

const recentOrders = [
  { id: "ALM-001234", date: "12 Mar 2026", status: "delivered", total: 89900, items: 2 },
  { id: "ALM-001198", date: "28 Feb 2026", status: "shipped", total: 156000, items: 3 },
  { id: "ALM-001156", date: "15 Feb 2026", status: "delivered", total: 67500, items: 1 },
]

const pets = [
  { name: "Luna", type: "Perro", breed: "Golden Retriever", birthday: "15 May", image: null },
  { name: "Milo", type: "Gato", breed: "Siames", birthday: "3 Ago", image: null },
]

const recommendedRewards = [
  { name: "Envio Gratis", points: 500, icon: Truck },
  { name: "10% Descuento", points: 800, icon: Gift },
  { name: "Producto Gratis", points: 1500, icon: Star },
]

const achievements = [
  { name: "Primera Compra", completed: true, icon: CheckCircle2 },
  { name: "5 Compras", completed: true, icon: CheckCircle2 },
  { name: "10 Compras", completed: false, icon: Clock, progress: 70 },
  { name: "Referir Amigo", completed: true, icon: CheckCircle2 },
]

export default function CustomerDashboard() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Entregado</Badge>
      case "shipped":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">En camino</Badge>
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Procesando</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const currentLevelIndex = levels.findIndex(l => l.name === customerData.level.name)

  return (
    <div className="space-y-6">
      {/* Welcome Banner with Level Progress */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-primary via-secondary to-primary p-6 text-primary-foreground">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Bienvenida a tu espacio</h2>
              <p className="text-primary-foreground/80 mb-4">
                Acumula AlmaPuntos con cada compra y desbloquea increibles recompensas
              </p>
              
              {/* Level Progress Visual */}
              <div className="flex items-center gap-2 mb-4">
                {levels.map((level, index) => {
                  const LevelIcon = level.icon
                  const isCompleted = index < currentLevelIndex
                  const isCurrent = index === currentLevelIndex
                  return (
                    <div key={level.name} className="flex items-center">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center transition-all
                        ${isCompleted ? 'bg-white text-primary' : ''}
                        ${isCurrent ? 'bg-accent text-accent-foreground ring-2 ring-white ring-offset-2 ring-offset-primary' : ''}
                        ${!isCompleted && !isCurrent ? 'bg-primary-foreground/20 text-primary-foreground/50' : ''}
                      `}>
                        <LevelIcon className="h-5 w-5" />
                      </div>
                      {index < levels.length - 1 && (
                        <div className={`w-8 lg:w-12 h-1 mx-1 rounded ${index < currentLevelIndex ? 'bg-white' : 'bg-primary-foreground/20'}`} />
                      )}
                    </div>
                  )
                })}
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <span>Nivel actual: <strong>{customerData.level.name}</strong></span>
                <span className="text-primary-foreground/60">|</span>
                <span>{customerData.level.pointsToNext} pts para {customerData.level.nextLevel}</span>
              </div>
            </div>

            {/* Points Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-primary-foreground/80">AlmaPuntos</span>
              </div>
              <p className="text-4xl font-bold">{customerData.points.available.toLocaleString()}</p>
              {customerData.points.pending > 0 && (
                <p className="text-sm text-primary-foreground/70 mt-1">
                  +{customerData.points.pending} pendientes
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <CardContent className="p-0">
          <div className="grid grid-cols-3 divide-x divide-border">
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{customerData.stats.totalOrders}</p>
              <p className="text-sm text-muted-foreground">Pedidos</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{formatCurrency(customerData.stats.totalSaved)}</p>
              <p className="text-sm text-muted-foreground">Ahorrado</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{customerData.stats.referrals}</p>
              <p className="text-sm text-muted-foreground">Referidos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Points Alert */}
      {customerData.points.expiringSoon > 0 && (
        <Card className="border-accent bg-accent/5">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {customerData.points.expiringSoon} puntos por vencer
                </p>
                <p className="text-sm text-muted-foreground">
                  Vencen el {customerData.points.expiryDate}. Usalos antes de que expiren.
                </p>
              </div>
            </div>
            <Link href="/mi-cuenta/recompensas">
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Canjear Ahora
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Pedidos Recientes</CardTitle>
              <Link href="/mi-cuenta/pedidos">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  Ver todos <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.items} productos - {order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(order.status)}
                      <p className="text-sm font-medium text-foreground mt-1">{formatCurrency(order.total)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* My Pets */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Mis Mascotas</CardTitle>
              <Link href="/mi-cuenta/mascotas">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  Administrar <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {pets.map((pet) => (
                  <div key={pet.name} className="flex items-center gap-4 p-4 bg-gradient-to-br from-accent/5 to-secondary/5 rounded-2xl border border-border">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                      <PawPrint className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-lg">{pet.name}</p>
                      <p className="text-sm text-muted-foreground">{pet.breed}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Cumple: {pet.birthday}
                      </div>
                    </div>
                  </div>
                ))}
                <Link href="/mi-cuenta/mascotas/nueva" className="flex items-center justify-center p-4 border-2 border-dashed border-border rounded-2xl hover:border-accent hover:bg-accent/5 transition-all group">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-muted rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <PawPrint className="h-6 w-6 text-muted-foreground group-hover:text-accent" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground">Agregar Mascota</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Mis Logros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.name} 
                    className={`p-4 rounded-xl text-center transition-all ${
                      achievement.completed 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-muted/30 border border-border'
                    }`}
                  >
                    <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                      achievement.completed ? 'bg-green-100' : 'bg-muted'
                    }`}>
                      <achievement.icon className={`h-6 w-6 ${
                        achievement.completed ? 'text-green-600' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <p className={`text-xs font-medium ${
                      achievement.completed ? 'text-green-700' : 'text-muted-foreground'
                    }`}>
                      {achievement.name}
                    </p>
                    {!achievement.completed && achievement.progress && (
                      <Progress value={achievement.progress} className="h-1 mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Level Benefits */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Star className="h-4 w-4 text-gray-500" />
                </div>
                <CardTitle className="text-lg font-semibold">Beneficios Nivel {customerData.level.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {customerData.level.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 bg-accent/10 rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">Proximo nivel: {customerData.level.nextLevel}</p>
                <p className="text-sm font-medium text-foreground">Desbloquea envio gratis ilimitado</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Rewards */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Canjea tus Puntos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recommendedRewards.map((reward) => {
                const canRedeem = customerData.points.available >= reward.points
                return (
                  <div 
                    key={reward.name}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                      canRedeem ? 'bg-accent/10 hover:bg-accent/20 cursor-pointer' : 'bg-muted/30 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        canRedeem ? 'bg-accent/20' : 'bg-muted'
                      }`}>
                        <reward.icon className={`h-5 w-5 ${canRedeem ? 'text-accent' : 'text-muted-foreground'}`} />
                      </div>
                      <span className="font-medium text-foreground">{reward.name}</span>
                    </div>
                    <Badge variant={canRedeem ? "default" : "secondary"} className={canRedeem ? "bg-accent text-accent-foreground" : ""}>
                      {reward.points} pts
                    </Badge>
                  </div>
                )
              })}
              <Link href="/mi-cuenta/recompensas">
                <Button variant="outline" className="w-full mt-2">
                  Ver todas las recompensas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Refer a Friend */}
          <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20">
            <CardContent className="p-5">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Heart className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Refiere a un Amigo</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Gana 500 puntos por cada amigo que haga su primera compra
                </p>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  Compartir mi codigo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
