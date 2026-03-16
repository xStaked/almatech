"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  Heart, 
  Gift, 
  Star, 
  PawPrint,
  Settings,
  Menu, 
  X,
  LogOut,
  Bell,
  ChevronRight,
  Sparkles,
  Trophy,
  Crown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Mi Panel", href: "/mi-cuenta", icon: LayoutDashboard },
  { name: "Mis Pedidos", href: "/mi-cuenta/pedidos", icon: Package },
  { name: "Mis Mascotas", href: "/mi-cuenta/mascotas", icon: PawPrint },
  { name: "Favoritos", href: "/mi-cuenta/favoritos", icon: Heart },
  { name: "AlmaPuntos", href: "/mi-cuenta/puntos", icon: Star },
  { name: "Recompensas", href: "/mi-cuenta/recompensas", icon: Gift },
  { name: "Mi Perfil", href: "/mi-cuenta/perfil", icon: Settings },
]

// Mock customer data
const customerData = {
  name: "Carolina Martinez",
  email: "carolina@email.com",
  avatar: null,
  memberSince: "Enero 2024",
  level: {
    name: "Plata",
    icon: Star,
    color: "text-gray-400",
    bgColor: "bg-gray-100",
    current: 2,
    total: 4,
    nextLevel: "Oro",
    pointsToNext: 850,
  },
  points: {
    available: 1250,
    pending: 200,
    lifetime: 3450,
  },
  notifications: 2,
}

const levelBenefits = {
  Bronce: { discount: 0, freeShipping: false, birthdayGift: false },
  Plata: { discount: 5, freeShipping: false, birthdayGift: true },
  Oro: { discount: 10, freeShipping: true, birthdayGift: true },
  Diamante: { discount: 15, freeShipping: true, birthdayGift: true, earlyAccess: true },
}

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const getLevelIcon = (level: string) => {
    switch(level) {
      case "Bronce": return Star
      case "Plata": return Star
      case "Oro": return Trophy
      case "Diamante": return Crown
      default: return Star
    }
  }

  const getLevelColor = (level: string) => {
    switch(level) {
      case "Bronce": return "text-amber-700 bg-amber-100"
      case "Plata": return "text-gray-500 bg-gray-100"
      case "Oro": return "text-yellow-600 bg-yellow-100"
      case "Diamante": return "text-cyan-500 bg-cyan-100"
      default: return "text-gray-500 bg-gray-100"
    }
  }

  const LevelIcon = getLevelIcon(customerData.level.name)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border transform transition-transform duration-300 lg:hidden",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <PawPrint className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">Almatech</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
                {item.name === "AlmaPuntos" && (
                  <Badge className="ml-auto bg-accent text-accent-foreground text-xs">
                    {customerData.points.available.toLocaleString()}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-72 lg:block">
        <div className="flex flex-col h-full bg-card border-r border-border">
          {/* Logo */}
          <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                <PawPrint className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">Almatech</span>
            </Link>
          </div>

          {/* User Card with Level */}
          <div className="px-4 py-4">
            <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl p-4 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-12 w-12 border-2 border-accent">
                  <AvatarImage src={customerData.avatar || undefined} />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {customerData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{customerData.name}</p>
                  <div className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", getLevelColor(customerData.level.name))}>
                    <LevelIcon className="h-3 w-3" />
                    Nivel {customerData.level.name}
                  </div>
                </div>
              </div>
              
              {/* Points Summary */}
              <div className="bg-card/80 rounded-xl p-3 mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">AlmaPuntos disponibles</span>
                  <Sparkles className="h-4 w-4 text-accent" />
                </div>
                <p className="text-2xl font-bold text-foreground">{customerData.points.available.toLocaleString()}</p>
              </div>

              {/* Progress to next level */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progreso a {customerData.level.nextLevel}</span>
                  <span className="font-medium text-foreground">{customerData.level.pointsToNext} pts</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive && "text-primary-foreground")} />
                  {item.name}
                  {item.name === "AlmaPuntos" && !isActive && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {customerData.points.available.toLocaleString()}
                    </Badge>
                  )}
                  {item.name === "Favoritos" && !isActive && (
                    <Badge variant="secondary" className="ml-auto text-xs">3</Badge>
                  )}
                  <ChevronRight className={cn(
                    "h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity",
                    isActive && "opacity-100 text-primary-foreground"
                  )} />
                </Link>
              )
            })}
          </nav>

          {/* Back to Store */}
          <div className="p-4 border-t border-border">
            <Link href="/">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Package className="h-4 w-4" />
                Volver a la Tienda
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  Hola, {customerData.name.split(' ')[0]}
                </h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Miembro desde {customerData.memberSince}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Points Badge - Mobile */}
              <div className="flex lg:hidden items-center gap-1 px-3 py-1.5 bg-accent/10 rounded-full">
                <Star className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-accent">{customerData.points.available.toLocaleString()}</span>
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {customerData.notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {customerData.notifications}
                  </span>
                )}
              </Button>

              {/* User Menu */}
              <Avatar className="h-9 w-9 cursor-pointer border-2 border-transparent hover:border-accent transition-colors">
                <AvatarImage src={customerData.avatar || undefined} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                  {customerData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
