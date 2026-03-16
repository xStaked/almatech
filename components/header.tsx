"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ShoppingCart, User, PawPrint, Dog, Cat, ChevronDown, Tractor, Heart, Pill, Stethoscope, ShieldCheck, Sparkles, Search, X, ArrowRight, DollarSign, BookOpen, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { products } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

const aboutLinks = [
  {
    name: "Gana con Nosotros",
    href: "/nosotros/gana-con-nosotros",
    icon: DollarSign,
    description: "Unete como afiliado y genera ingresos"
  },
  {
    name: "Nuestra Historia",
    href: "/nosotros",
    icon: BookOpen,
    description: "Conoce como comenzo Almatech"
  },
  {
    name: "Por que Almatech",
    href: "/nosotros/por-que-almatech",
    icon: Award,
    description: "La ciencia detras de nuestros productos"
  },
  {
    name: "Comunidad Alma",
    href: "/nosotros#comunidad",
    icon: Users,
    description: "Se parte de nuestra familia"
  },
]

const petCategories = [
  {
    name: "Perros",
    href: "/categoria/perros",
    icon: Dog,
    description: "Suplementos y tratamientos para caninos",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
    featured: [
      { name: "Silygran-Pro", href: "/producto/silygran-pro", tag: "Mas vendido" },
      { name: "Nano-Lyptus", href: "/producto/nano-lyptus", tag: "Nuevo" },
    ],
    subcategories: [
      { name: "Salud Hepatica", icon: Stethoscope },
      { name: "Sistema Respiratorio", icon: Pill },
      { name: "Metabolismo", icon: Sparkles },
      { name: "Sistema Inmune", icon: ShieldCheck },
    ]
  },
  {
    name: "Gatos",
    href: "/categoria/gatos",
    icon: Cat,
    description: "Formulas delicadas para felinos",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
    featured: [
      { name: "Silygran-Pro", href: "/producto/silygran-pro", tag: "Recomendado" },
      { name: "Nano-Lyptus", href: "/producto/nano-lyptus", tag: null },
    ],
    subcategories: [
      { name: "Salud Hepatica", icon: Stethoscope },
      { name: "Sistema Respiratorio", icon: Pill },
      { name: "Metabolismo", icon: Sparkles },
      { name: "Cuidado Senior", icon: Heart },
    ]
  },
  {
    name: "Granja",
    href: "/categoria/granja",
    icon: Tractor,
    description: "Soluciones para animales de produccion",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop",
    featured: [
      { name: "Nano-Lyptus 1L", href: "/producto/nano-lyptus", tag: "Industrial" },
    ],
    subcategories: [
      { name: "Bovinos", icon: Stethoscope },
      { name: "Porcinos", icon: Pill },
      { name: "Aves", icon: Sparkles },
      { name: "Equinos", icon: ShieldCheck },
    ]
  },
]

export function Header() {
  const { totalItems, openCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof products>([])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // Search logic
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      return
    }
    
    const query = searchQuery.toLowerCase()
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.pets.some(pet => pet.toLowerCase().includes(query))
    )
    setSearchResults(filtered)
  }, [searchQuery])

  // Close search on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
        setSearchQuery("")
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      {/* Promo Banner */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-medium">
        <span className="hidden sm:inline">Envio GRATIS en compras mayores a </span>
        <span className="sm:hidden">Envio GRATIS + </span>
        <span className="font-bold">$150.000 COP</span>
        <span className="hidden md:inline"> | 5% de tu compra apoya refugios de animales</span>
      </div>
      
      {/* Main Header */}
      <div className="border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center">
                <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center mr-2">
                  <PawPrint className="h-5 w-5 text-accent-foreground" />
                </div>
                <span className="text-xl font-extrabold text-foreground tracking-tight">
                  Almatech
                </span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4" ref={searchContainerRef}>
              <div className="relative w-full">
                <div className={`flex items-center w-full border-2 rounded-full transition-all ${
                  searchOpen || searchQuery ? 'border-secondary bg-card shadow-lg' : 'border-border bg-muted/50 hover:border-secondary/50'
                }`}>
                  <Search className="h-5 w-5 text-muted-foreground ml-4 flex-shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Buscar productos, categorias..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchOpen(true)}
                    className="flex-1 bg-transparent border-none outline-none px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("")
                        searchInputRef.current?.focus()
                      }}
                      className="p-2 mr-1 hover:bg-muted rounded-full transition-colors"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
                
                {/* Search Results Dropdown */}
                {searchOpen && (searchQuery || searchResults.length > 0) && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50">
                    {searchResults.length > 0 ? (
                      <div className="py-2">
                        <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
                          Productos ({searchResults.length})
                        </p>
                        {searchResults.slice(0, 5).map((product) => (
                          <Link
                            key={product.slug}
                            href={`/producto/${product.slug}`}
                            onClick={() => {
                              setSearchOpen(false)
                              setSearchQuery("")
                            }}
                            className="flex items-center gap-4 px-4 py-3 hover:bg-muted/50 transition-colors"
                          >
                            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                              <PawPrint className="h-5 w-5 text-secondary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">{product.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{product.tagline}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="font-semibold text-secondary">
                                ${product.presentations[0].price.toLocaleString()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {product.presentations[0].size}
                              </p>
                            </div>
                          </Link>
                        ))}
                        {searchResults.length > 5 && (
                          <Link
                            href={`/buscar?q=${encodeURIComponent(searchQuery)}`}
                            onClick={() => {
                              setSearchOpen(false)
                              setSearchQuery("")
                            }}
                            className="block px-4 py-3 text-center text-sm font-medium text-secondary hover:bg-muted/50 transition-colors border-t border-border"
                          >
                            Ver todos los resultados ({searchResults.length})
                          </Link>
                        )}
                      </div>
                    ) : searchQuery.length > 0 ? (
                      <div className="p-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
                          <Search className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <p className="text-foreground font-medium">No encontramos resultados</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Intenta con otro termino de busqueda
                        </p>
                      </div>
                    ) : (
                      <div className="p-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                          Busquedas populares
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {["Silygran", "Hepatoprotector", "Perros", "Gatos", "Respiratorio"].map((term) => (
                            <button
                              key={term}
                              onClick={() => setSearchQuery(term)}
                              className="px-3 py-1.5 text-sm bg-muted hover:bg-secondary/20 text-foreground rounded-full transition-colors"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              {/* About Us Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setAboutMenuOpen(true)}
                onMouseLeave={() => setAboutMenuOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
                  Nosotros
                  <ChevronDown className={`h-4 w-4 transition-transform ${aboutMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {aboutMenuOpen && (
                  <div className="absolute top-full right-0 w-72 bg-card border border-border rounded-2xl shadow-xl z-50 py-2">
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                          <link.icon className="h-5 w-5 text-secondary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-sm group-hover:text-secondary transition-colors">
                            {link.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {link.description}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="w-px h-6 bg-border mx-1" />
              <Link href="/mi-cuenta">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Mi cuenta</span>
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground relative"
                onClick={openCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
                <span className="sr-only">Carrito</span>
              </Button>
              <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground ml-2 font-semibold">
                Iniciar Sesion
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground relative"
                onClick={openCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Abrir menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[400px] bg-background p-0">
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                      <span className="font-bold text-foreground">Menu</span>
                    </div>
                    
                    {/* Mobile Categories */}
                    <div className="flex-1 overflow-y-auto">
                      <div className="py-2">
                        <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Comprar por mascota
                        </p>
                        {petCategories.map((category) => (
                          <div key={category.name}>
                            <button
                              onClick={() => setMobileSubmenu(mobileSubmenu === category.name ? null : category.name)}
                              className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                                  <category.icon className="h-5 w-5 text-accent" />
                                </div>
                                <div className="text-left">
                                  <span className="font-semibold text-foreground">{category.name}</span>
                                  <p className="text-xs text-muted-foreground">{category.description}</p>
                                </div>
                              </div>
                              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${mobileSubmenu === category.name ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {mobileSubmenu === category.name && (
                              <div className="bg-muted/30 py-2">
                                <Link
                                  href={category.href}
                                  className="block px-6 py-2 text-sm text-secondary font-semibold hover:text-secondary/80"
                                  onClick={() => setIsOpen(false)}
                                >
                                  Ver todos los productos
                                </Link>
                                {category.subcategories.map((sub) => (
                                  <Link
                                    key={sub.name}
                                    href={`${category.href}?tipo=${sub.name.toLowerCase().replace(' ', '-')}`}
                                    className="flex items-center gap-2 px-6 py-2 text-sm text-foreground hover:text-secondary"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <sub.icon className="h-4 w-4 text-muted-foreground" />
                                    {sub.name}
                                  </Link>
                                ))}
                                <div className="border-t border-border/50 mt-2 pt-2 px-6">
                                  <p className="text-xs text-muted-foreground mb-2">Destacados</p>
                                  {category.featured.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      className="flex items-center gap-2 py-1.5 text-sm text-foreground hover:text-secondary"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {item.name}
                                      {item.tag && (
                                        <span className="text-[10px] bg-accent/20 text-accent px-1.5 py-0.5 rounded">
                                          {item.tag}
                                        </span>
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-border py-2">
                        <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Nosotros
                        </p>
                        <button
                          onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
                        >
                          <span className="font-semibold text-foreground">Conoce Almatech</span>
                          <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {mobileAboutOpen && (
                          <div className="bg-muted/30 py-2">
                            {aboutLinks.map((link) => (
                              <Link
                                key={link.name}
                                href={link.href}
                                className="flex items-center gap-3 px-6 py-3 hover:bg-muted/50 transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                <link.icon className="h-5 w-5 text-secondary" />
                                <div>
                                  <p className="font-medium text-foreground text-sm">{link.name}</p>
                                  <p className="text-xs text-muted-foreground">{link.description}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Mobile Footer */}
                    <div className="border-t border-border p-4 space-y-3">
                      <Link href="/mi-cuenta" className="w-full" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full justify-center gap-2 font-semibold">
                          <User className="h-4 w-4" />
                          Mi Cuenta
                        </Button>
                      </Link>
                      <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
                        Iniciar Sesion
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden border-b border-border bg-background p-4">
          <div className="relative">
            <div className="flex items-center w-full border-2 border-secondary rounded-full bg-card">
              <Search className="h-5 w-5 text-muted-foreground ml-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent border-none outline-none px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-2 mr-1"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            
            {/* Mobile Search Results */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50 max-h-[60vh] overflow-y-auto">
                {searchResults.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/producto/${product.slug}`}
                    onClick={() => {
                      setSearchOpen(false)
                      setSearchQuery("")
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <PawPrint className="h-4 w-4 text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{product.tagline}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Desktop Mega Menu Bar */}
      <nav className="hidden md:block bg-muted/50 border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1">
            {petCategories.map((category) => (
              <div
                key={category.name}
                className="relative"
                onMouseEnter={() => setActiveCategory(category.name)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link
                  href={category.href}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors ${
                    activeCategory === category.name 
                      ? 'text-secondary bg-background' 
                      : 'text-foreground hover:text-secondary'
                  }`}
                >
                  <category.icon className="h-5 w-5" />
                  {category.name}
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeCategory === category.name ? 'rotate-180' : ''}`} />
                </Link>

                {/* Mega Menu Dropdown */}
                {activeCategory === category.name && (
                  <div className="absolute top-full left-0 w-[600px] bg-card border border-border rounded-b-2xl shadow-xl z-50">
                    <div className="grid grid-cols-5 gap-0">
                      {/* Subcategories */}
                      <div className="col-span-2 p-6 border-r border-border">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                          Por Necesidad
                        </p>
                        <div className="space-y-1">
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub.name}
                              href={`${category.href}?tipo=${sub.name.toLowerCase().replace(' ', '-')}`}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground hover:bg-muted/50 hover:text-secondary transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                <sub.icon className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
                              </div>
                              <span className="text-sm font-medium">{sub.name}</span>
                            </Link>
                          ))}
                        </div>
                        <Link
                          href={category.href}
                          className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-secondary hover:underline"
                        >
                          Ver todos los productos
                          <ChevronDown className="h-3 w-3 -rotate-90" />
                        </Link>
                      </div>

                      {/* Featured Products */}
                      <div className="col-span-3 p-6">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                          Productos Destacados
                        </p>
                        <div className="space-y-3">
                          {category.featured.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                            >
                              <div className="w-16 h-16 rounded-xl bg-muted overflow-hidden flex-shrink-0">
                                <div className="w-full h-full bg-accent/10 flex items-center justify-center">
                                  <PawPrint className="h-6 w-6 text-accent/50" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                                    {item.name}
                                  </span>
                                  {item.tag && (
                                    <span className="text-[10px] bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full font-semibold">
                                      {item.tag}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  Para {category.name.toLowerCase()}
                                </p>
                              </div>
                              <ChevronDown className="h-4 w-4 -rotate-90 text-muted-foreground group-hover:text-secondary" />
                            </Link>
                          ))}
                        </div>

                        {/* Category Image */}
                        <div className="mt-4 relative h-28 rounded-2xl overflow-hidden">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent flex items-center">
                            <div className="p-4">
                              <p className="text-primary-foreground font-bold text-lg">
                                {category.name}
                              </p>
                              <p className="text-primary-foreground/80 text-xs">
                                {category.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="ml-auto flex items-center gap-4">
              <Link
                href="#productos"
                className="text-sm font-semibold text-muted-foreground hover:text-secondary transition-colors"
              >
                Todos los Productos
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
