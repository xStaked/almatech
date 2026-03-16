"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Gift, 
  Truck, 
  Percent, 
  Star, 
  Package,
  Sparkles,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  AlertCircle
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data
const userPoints = 1250

const rewards = [
  { 
    id: 1, 
    name: "Envio Gratis", 
    description: "En tu proxima compra sin minimo", 
    points: 300, 
    icon: Truck, 
    category: "envio",
    validDays: 30,
    popular: true
  },
  { 
    id: 2, 
    name: "5% Descuento", 
    description: "En toda tu compra", 
    points: 400, 
    icon: Percent, 
    category: "descuento",
    validDays: 30
  },
  { 
    id: 3, 
    name: "10% Descuento", 
    description: "En toda tu compra", 
    points: 750, 
    icon: Percent, 
    category: "descuento",
    validDays: 30,
    popular: true
  },
  { 
    id: 4, 
    name: "15% Descuento", 
    description: "En toda tu compra", 
    points: 1100, 
    icon: Percent, 
    category: "descuento",
    validDays: 30
  },
  { 
    id: 5, 
    name: "Muestra Gratis", 
    description: "Silygran-Pro 100ml de regalo", 
    points: 800, 
    icon: Gift, 
    category: "producto",
    validDays: 60
  },
  { 
    id: 6, 
    name: "Kit de Bienvenida", 
    description: "Muestras de todos nuestros productos", 
    points: 1500, 
    icon: Package, 
    category: "producto",
    validDays: 60
  },
  { 
    id: 7, 
    name: "20% Descuento", 
    description: "En toda tu compra - Exclusivo", 
    points: 1800, 
    icon: Star, 
    category: "descuento",
    validDays: 30,
    exclusive: true
  },
  { 
    id: 8, 
    name: "Producto Gratis", 
    description: "Elige cualquier producto hasta $50.000", 
    points: 2500, 
    icon: Gift, 
    category: "producto",
    validDays: 90,
    exclusive: true
  },
]

const redeemedRewards = [
  { 
    id: 1, 
    name: "10% Descuento", 
    code: "ALMA-10-X7K9", 
    redeemedDate: "25 Feb 2026", 
    expiryDate: "27 Mar 2026", 
    status: "active",
    pointsUsed: 750
  },
  { 
    id: 2, 
    name: "Envio Gratis", 
    code: "SHIP-FREE-M2P4", 
    redeemedDate: "10 Feb 2026", 
    expiryDate: "12 Mar 2026", 
    status: "used",
    usedDate: "28 Feb 2026",
    pointsUsed: 300
  },
]

export default function RewardsPage() {
  const [selectedReward, setSelectedReward] = useState<typeof rewards[0] | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [redeemSuccess, setRedeemSuccess] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleRedeem = (reward: typeof rewards[0]) => {
    setSelectedReward(reward)
    setIsConfirmOpen(true)
  }

  const confirmRedeem = () => {
    setIsConfirmOpen(false)
    setRedeemSuccess(true)
    setTimeout(() => setRedeemSuccess(false), 3000)
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const canRedeem = (points: number) => userPoints >= points

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Recompensas</h1>
          <p className="text-muted-foreground">Canjea tus AlmaPuntos por increibles beneficios</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-xl">
          <Sparkles className="h-5 w-5 text-accent" />
          <span className="font-bold text-foreground">{userPoints.toLocaleString()}</span>
          <span className="text-muted-foreground">puntos disponibles</span>
        </div>
      </div>

      {/* Success Message */}
      {redeemSuccess && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <p className="text-green-700 font-medium">
              Recompensa canjeada exitosamente. Revisa tus cupones activos.
            </p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="available" className="space-y-6">
        <TabsList>
          <TabsTrigger value="available">Disponibles</TabsTrigger>
          <TabsTrigger value="redeemed">Mis Cupones</TabsTrigger>
        </TabsList>

        {/* Available Rewards */}
        <TabsContent value="available" className="space-y-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              Todos
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors">
              Descuentos
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors">
              Envio
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors">
              Productos
            </Badge>
          </div>

          {/* Rewards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {rewards.map((reward) => {
              const canGet = canRedeem(reward.points)
              const RewardIcon = reward.icon

              return (
                <Card 
                  key={reward.id} 
                  className={`relative overflow-hidden transition-all hover:shadow-lg ${!canGet ? 'opacity-70' : ''}`}
                >
                  {reward.popular && (
                    <div className="absolute top-0 left-0 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-br-lg font-medium">
                      Popular
                    </div>
                  )}
                  {reward.exclusive && (
                    <div className="absolute top-0 left-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-br-lg font-medium flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Exclusivo
                    </div>
                  )}
                  
                  <CardContent className="p-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                      canGet ? 'bg-accent/10' : 'bg-muted'
                    }`}>
                      <RewardIcon className={`h-7 w-7 ${canGet ? 'text-accent' : 'text-muted-foreground'}`} />
                    </div>

                    <h3 className="font-semibold text-foreground text-lg mb-1">{reward.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Sparkles className={`h-4 w-4 ${canGet ? 'text-accent' : 'text-muted-foreground'}`} />
                        <span className={`font-bold ${canGet ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {reward.points.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground">pts</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Valido {reward.validDays} dias
                      </span>
                    </div>

                    <Button 
                      className={`w-full ${canGet ? 'bg-primary hover:bg-primary/90' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
                      disabled={!canGet}
                      onClick={() => canGet && handleRedeem(reward)}
                    >
                      {canGet ? 'Canjear' : `Te faltan ${reward.points - userPoints} pts`}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Redeemed Rewards */}
        <TabsContent value="redeemed" className="space-y-4">
          {redeemedRewards.length > 0 ? (
            <div className="space-y-4">
              {redeemedRewards.map((coupon) => (
                <Card key={coupon.id} className={coupon.status === 'used' ? 'opacity-60' : ''}>
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                          coupon.status === 'active' ? 'bg-accent/10' : 'bg-muted'
                        }`}>
                          <Gift className={`h-7 w-7 ${coupon.status === 'active' ? 'text-accent' : 'text-muted-foreground'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{coupon.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="px-2 py-1 bg-muted rounded text-sm font-mono">
                              {coupon.code}
                            </code>
                            {coupon.status === 'active' && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 px-2"
                                onClick={() => copyCode(coupon.code)}
                              >
                                {copiedCode === coupon.code ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          {coupon.status === 'active' ? (
                            <>
                              <Badge className="bg-green-100 text-green-700 border-green-200">Activo</Badge>
                              <p className="text-xs text-muted-foreground mt-1">
                                Vence: {coupon.expiryDate}
                              </p>
                            </>
                          ) : (
                            <>
                              <Badge variant="secondary">Usado</Badge>
                              <p className="text-xs text-muted-foreground mt-1">
                                Usado: {coupon.usedDate}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {coupon.status === 'active' && (
                      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Canjeado el {coupon.redeemedDate}</span>
                          <span className="text-accent">-{coupon.pointsUsed} pts</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Usar ahora
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Gift className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No tienes cupones</h3>
              <p className="text-muted-foreground">
                Canjea tus puntos por recompensas y apareceran aqui
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Confirm Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Canje</DialogTitle>
            <DialogDescription>
              Estas a punto de canjear una recompensa
            </DialogDescription>
          </DialogHeader>

          {selectedReward && (
            <div className="py-4">
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl mb-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <selectedReward.icon className="h-7 w-7 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{selectedReward.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedReward.description}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Puntos requeridos:</span>
                  <span className="font-medium text-foreground">{selectedReward.points.toLocaleString()} pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Puntos actuales:</span>
                  <span className="font-medium text-foreground">{userPoints.toLocaleString()} pts</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-muted-foreground">Puntos restantes:</span>
                  <span className="font-bold text-foreground">{(userPoints - selectedReward.points).toLocaleString()} pts</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-700">
                  El cupon sera valido por {selectedReward.validDays} dias a partir de hoy y no es reembolsable.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmRedeem}>
              Confirmar Canje
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
