"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  ChevronDown,
  PawPrint
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
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Afiliados", href: "/admin/afiliados", icon: Users },
  { name: "Liquidaciones", href: "/admin/liquidaciones", icon: DollarSign },
  { name: "Pedidos", href: "/admin/pedidos", icon: ShoppingCart },
  { name: "Productos", href: "/admin/productos", icon: Package },
  { name: "Reportes", href: "/admin/reportes", icon: BarChart3 },
  { name: "Configuracion", href: "/admin/configuracion", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

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
        "fixed inset-y-0 left-0 z-50 w-64 bg-primary text-primary-foreground transform transition-transform duration-200 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-primary-foreground/10">
            <Link href="/admin" className="flex items-center gap-2">
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

            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-primary-foreground/10 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href))
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
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-primary-foreground/10">
            <div className="flex items-center gap-3 px-2 py-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-accent text-accent-foreground text-sm">AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin</p>
                <p className="text-xs text-primary-foreground/60 truncate">admin@almatech.co</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-background border-b border-border lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 hover:bg-muted rounded-lg"
            >
              <Menu className="h-5 w-5 text-foreground" />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">Panel de Administracion</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="px-4 py-3 border-b">
                  <p className="font-semibold">Notificaciones</p>
                </div>
                <div className="py-2">
                  <DropdownMenuItem className="flex flex-col items-start gap-1 px-4 py-3">
                    <p className="text-sm font-medium">Nuevo pedido recibido</p>
                    <p className="text-xs text-muted-foreground">Hace 5 minutos</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 px-4 py-3">
                    <p className="text-sm font-medium">Afiliado solicita liquidacion</p>
                    <p className="text-xs text-muted-foreground">Hace 1 hora</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 px-4 py-3">
                    <p className="text-sm font-medium">Stock bajo: Silygran-Pro 30ml</p>
                    <p className="text-xs text-muted-foreground">Hace 3 horas</p>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">AD</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium">Admin</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Mi perfil</DropdownMenuItem>
                <DropdownMenuItem>Configuracion</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
