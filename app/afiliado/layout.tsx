"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  DollarSign,
  Link2,
  ImageIcon,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  ChevronDown,
  PawPrint,
  TrendingUp,
  Users,
  HelpCircle,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navigation = [
  { name: "Dashboard", href: "/afiliado", icon: LayoutDashboard },
  { name: "Mis Comisiones", href: "/afiliado/comisiones", icon: DollarSign },
  { name: "Mi Red", href: "/afiliado/red", icon: Users },
  { name: "Enlaces y QR", href: "/afiliado/enlaces", icon: Link2 },
  { name: "Marketing", href: "/afiliado/marketing", icon: ImageIcon },
  { name: "Mi Perfil", href: "/afiliado/perfil", icon: Settings },
]

const quickLinks = [
  { name: "Ver Tienda", href: "/", icon: ExternalLink },
  { name: "Centro de Ayuda", href: "/ayuda", icon: HelpCircle },
]

// Mock affiliate data
const affiliateData = {
  name: "Maria Garcia",
  email: "maria.garcia@email.com",
  code: "MARIA2024",
  level: "Oro",
  avatar: null,
  pendingBalance: 485000,
  notifications: 3,
}

export default function AffiliateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-primary text-primary-foreground transform transition-transform duration-200 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-primary-foreground/10">
            <Link href="/afiliado" className="flex items-center gap-2">
              <div className="flex items-center">
                <Image
                  src="/logo-cream.png"
                  alt="Almatech"
                  width={200}
                  height={50}
                  className="h-25 w-auto"
                  priority
                />
              </div>
              <span className="text-xs text-primary-foreground/60 block -mt-1">Portal Afiliado</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-primary-foreground/10 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Affiliate Card */}
          <div className="px-4 py-4 border-b border-primary-foreground/10">
            <div className="bg-primary-foreground/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-12 w-12 border-2 border-accent">
                  <AvatarImage src={affiliateData.avatar || undefined} />
                  <AvatarFallback className="bg-accent text-accent-foreground font-bold">
                    {affiliateData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{affiliateData.name}</p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-accent/20 text-accent border-0 text-xs">
                      Nivel {affiliateData.level}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="bg-primary-foreground/5 rounded-lg p-3">
                <p className="text-xs text-primary-foreground/60 mb-1">Saldo pendiente</p>
                <p className="text-xl font-bold text-accent">{formatCurrency(affiliateData.pendingBalance)}</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-primary-foreground/60">Tu codigo:</span>
                <code className="bg-primary-foreground/10 px-2 py-1 rounded font-mono font-bold">
                  {affiliateData.code}
                </code>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <p className="px-3 text-xs font-semibold text-primary-foreground/40 uppercase tracking-wider mb-2">
              Menu Principal
            </p>
            {navigation.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== "/afiliado" && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}

            <div className="pt-4 mt-4 border-t border-primary-foreground/10">
              <p className="px-3 text-xs font-semibold text-primary-foreground/40 uppercase tracking-wider mb-2">
                Enlaces Rapidos
              </p>
              {quickLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Promo Card */}
          <div className="p-4 border-t border-primary-foreground/10">
            <div className="bg-accent/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Sube de Nivel</p>
                  <p className="text-xs text-primary-foreground/70 mt-1">
                    Te faltan 3 ventas para alcanzar nivel Platino
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div >
      </aside >

      {/* Main content */}
      < div className="lg:pl-72" >
        {/* Top bar */}
        < header className="sticky top-0 z-30 bg-card border-b border-border" >
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-foreground">
                  Bienvenido, {affiliateData.name.split(' ')[0]}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Gestiona tu negocio y haz crecer tus ingresos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {affiliateData.notifications > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
                        {affiliateData.notifications}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="font-semibold">Notificaciones</p>
                  </div>
                  <div className="py-2">
                    <DropdownMenuItem className="px-4 py-3 cursor-pointer">
                      <div>
                        <p className="font-medium text-sm">Nueva venta registrada</p>
                        <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="px-4 py-3 cursor-pointer">
                      <div>
                        <p className="font-medium text-sm">Comision aprobada</p>
                        <p className="text-xs text-muted-foreground">Hace 1 dia</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="px-4 py-3 cursor-pointer">
                      <div>
                        <p className="font-medium text-sm">Nuevo material disponible</p>
                        <p className="text-xs text-muted-foreground">Hace 3 dias</p>
                      </div>
                    </DropdownMenuItem>
                  </div>
                  <div className="px-4 py-2 border-t border-border">
                    <Button variant="ghost" size="sm" className="w-full">
                      Ver todas
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={affiliateData.avatar || undefined} />
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                        {affiliateData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="font-semibold text-sm">{affiliateData.name}</p>
                    <p className="text-xs text-muted-foreground">{affiliateData.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/afiliado/perfil">Mi Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/afiliado/comisiones">Mis Comisiones</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/">Ir a la Tienda</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header >

        {/* Page content */}
        < main className="p-4 lg:p-8" >
          {children}
        </main >
      </div >
    </div >
  )
}
