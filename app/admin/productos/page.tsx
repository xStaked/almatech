"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Package,
  AlertTriangle,
  TrendingUp,
  DollarSign
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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { products } from "@/lib/products"
import Image from "next/image"

// Extended mock data for admin
const adminProducts = products.map(p => ({
  ...p,
  stock: Math.floor(Math.random() * 200) + 20,
  lowStockThreshold: 30,
  isActive: true,
  totalSales: Math.floor(Math.random() * 500) + 50,
  revenue: Math.floor(Math.random() * 50000000) + 5000000,
}))

const stats = [
  { name: "Productos Activos", value: "3", icon: Package, color: "text-secondary" },
  { name: "Stock Bajo", value: "1", icon: AlertTriangle, color: "text-bourbon" },
  { name: "Ventas Totales", value: "1,245", icon: TrendingUp, color: "text-blue-500" },
  { name: "Ingresos", value: "$124.5M", icon: DollarSign, color: "text-secondary" },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)
}

export default function ProductsAdminPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<typeof adminProducts[0] | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const filteredProducts = adminProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(products.map(p => p.category))]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Productos</h1>
          <p className="text-muted-foreground">Gestiona el catalogo de productos</p>
        </div>
        <Button size="sm" className="bg-secondary hover:bg-secondary/90">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo producto
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar productos..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorias</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative h-48 bg-muted">
              {product.image.startsWith('http') ? (
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-16 w-16 text-muted-foreground/30" />
                </div>
              )}
              {product.badge && (
                <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                  {product.badge}
                </Badge>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="absolute top-3 right-3 h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => { setSelectedProduct(product); setIsDetailOpen(true); }}>
                    <Eye className="h-4 w-4 mr-2" /> Ver detalle
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setSelectedProduct(product); setIsEditOpen(true); }}>
                    <Edit className="h-4 w-4 mr-2" /> Editar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>
                <Badge variant={product.isActive ? "default" : "secondary"} className={product.isActive ? "bg-secondary/20 text-secondary" : ""}>
                  {product.isActive ? "Activo" : "Inactivo"}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.tagline}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-2 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Precio</p>
                  <p className="font-bold text-secondary">{formatCurrency(product.price)}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Stock</p>
                  <p className={`font-bold ${product.stock < product.lowStockThreshold ? 'text-bourbon' : 'text-foreground'}`}>
                    {product.stock} uds
                    {product.stock < product.lowStockThreshold && (
                      <AlertTriangle className="inline h-3 w-3 ml-1" />
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-muted-foreground">Ventas: </span>
                  <span className="font-medium">{product.totalSales}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Ingresos: </span>
                  <span className="font-medium text-secondary">{formatCurrency(product.revenue)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Product detail dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
                <DialogDescription>{selectedProduct.tagline}</DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 mt-4">
                <div className="relative h-64 rounded-xl overflow-hidden bg-muted">
                  {selectedProduct.image.startsWith('http') ? (
                    <Image 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-20 w-20 text-muted-foreground/30" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 rounded-xl bg-muted/50">
                    <p className="text-xs text-muted-foreground">Precio base</p>
                    <p className="text-lg font-bold text-secondary">{formatCurrency(selectedProduct.price)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50">
                    <p className="text-xs text-muted-foreground">Stock actual</p>
                    <p className="text-lg font-bold">{selectedProduct.stock} uds</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50">
                    <p className="text-xs text-muted-foreground">Ventas totales</p>
                    <p className="text-lg font-bold">{selectedProduct.totalSales}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50">
                    <p className="text-xs text-muted-foreground">Ingresos</p>
                    <p className="text-lg font-bold text-secondary">{formatCurrency(selectedProduct.revenue)}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">Descripcion</p>
                  <p className="text-sm text-muted-foreground">{selectedProduct.longDescription}</p>
                </div>

                <div>
                  <p className="font-medium mb-2">Presentaciones</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.presentations.map((pres, idx) => (
                      <Badge key={idx} variant="outline" className="py-1.5 px-3">
                        {pres.size} - {formatCurrency(pres.price)}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">Registro</p>
                  <Badge variant="secondary">{selectedProduct.registro}</Badge>
                </div>
              </div>

              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Cerrar</Button>
                <Button className="bg-secondary hover:bg-secondary/90" onClick={() => { setIsDetailOpen(false); setIsEditOpen(true); }}>
                  <Edit className="h-4 w-4 mr-2" /> Editar producto
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>Editar Producto</DialogTitle>
                <DialogDescription>Modifica los datos del producto</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 mt-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input defaultValue={selectedProduct.name} />
                </div>
                <div className="space-y-2">
                  <Label>Tagline</Label>
                  <Input defaultValue={selectedProduct.tagline} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Precio base</Label>
                    <Input type="number" defaultValue={selectedProduct.price} />
                  </div>
                  <div className="space-y-2">
                    <Label>Stock</Label>
                    <Input type="number" defaultValue={selectedProduct.stock} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select defaultValue={selectedProduct.category}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <Label>Producto activo</Label>
                    <p className="text-xs text-muted-foreground">El producto sera visible en la tienda</p>
                  </div>
                  <Switch defaultChecked={selectedProduct.isActive} />
                </div>
              </div>

              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancelar</Button>
                <Button className="bg-secondary hover:bg-secondary/90">
                  Guardar cambios
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
