"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Link2, 
  Copy,
  CheckCircle2,
  QrCode,
  Download,
  ExternalLink,
  ShoppingBag,
  Tag,
  BarChart3,
  Plus,
  Share2,
  Facebook,
  Instagram,
  MessageCircle
} from "lucide-react"

// Mock data
const mainLinks = [
  {
    id: 1,
    name: "Enlace Principal",
    url: "https://almatech.co/r/MARIA2024",
    clicks: 1247,
    conversions: 47,
    type: "tienda",
  },
  {
    id: 2,
    name: "Silygran-Pro",
    url: "https://almatech.co/r/MARIA2024/silygran-pro",
    clicks: 523,
    conversions: 28,
    type: "producto",
  },
  {
    id: 3,
    name: "Nano-Lyptus",
    url: "https://almatech.co/r/MARIA2024/nano-lyptus",
    clicks: 412,
    conversions: 19,
    type: "producto",
  },
  {
    id: 4,
    name: "Promo Marzo",
    url: "https://almatech.co/r/MARIA2024?promo=marzo",
    clicks: 189,
    conversions: 8,
    type: "campana",
  },
]

export default function LinksPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const affiliateCode = "MARIA2024"

  const copyLink = (id: number, url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "tienda": return <ShoppingBag className="h-4 w-4" />
      case "producto": return <Tag className="h-4 w-4" />
      case "campana": return <BarChart3 className="h-4 w-4" />
      default: return <Link2 className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    const styles: Record<string, string> = {
      tienda: "bg-blue-100 text-blue-700",
      producto: "bg-green-100 text-green-700",
      campana: "bg-purple-100 text-purple-700",
    }
    return styles[type] || "bg-muted text-muted-foreground"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Enlaces y QR</h1>
          <p className="text-muted-foreground">Gestiona tus enlaces de afiliado y codigos QR</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Crear Enlace
        </Button>
      </div>

      {/* Main Code Card */}
      <Card className="bg-gradient-to-br from-primary to-secondary border-0 text-primary-foreground overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-2">Tu Codigo de Afiliado</h2>
              <div className="bg-primary-foreground/10 rounded-xl p-6 text-center mb-4">
                <code className="text-4xl font-bold font-mono tracking-wider">{affiliateCode}</code>
              </div>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Comparte este codigo para que tus clientes lo usen en el checkout y recibas comision por cada venta.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir
                </Button>
                <Button variant="secondary" size="sm" className="bg-[#1877F2] hover:bg-[#1877F2]/90 border-0">
                  <Facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
                <Button variant="secondary" size="sm" className="bg-[#E4405F] hover:bg-[#E4405F]/90 border-0">
                  <Instagram className="mr-2 h-4 w-4" />
                  Instagram
                </Button>
                <Button variant="secondary" size="sm" className="bg-[#25D366] hover:bg-[#25D366]/90 border-0">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-2xl p-4 mb-3">
                <div className="w-40 h-40 bg-muted flex items-center justify-center rounded-lg">
                  <QrCode className="w-32 h-32 text-primary" />
                </div>
              </div>
              <Button variant="secondary" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Descargar QR
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Clics</p>
                <p className="text-2xl font-bold">2,371</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Link2 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversiones</p>
                <p className="text-2xl font-bold">102</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasa de Conversion</p>
                <p className="text-2xl font-bold">4.3%</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Links List */}
      <Card>
        <CardHeader>
          <CardTitle>Mis Enlaces</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mainLinks.map((link) => (
              <div 
                key={link.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/50 rounded-xl"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center flex-shrink-0">
                    {getTypeIcon(link.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{link.name}</p>
                      <Badge className={`text-xs ${getTypeBadge(link.type)}`}>
                        {link.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{link.url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden md:flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-bold">{link.clicks}</p>
                      <p className="text-muted-foreground text-xs">clics</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-green-600">{link.conversions}</p>
                      <p className="text-muted-foreground text-xs">ventas</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{((link.conversions / link.clicks) * 100).toFixed(1)}%</p>
                      <p className="text-muted-foreground text-xs">conversion</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyLink(link.id, link.url)}
                    >
                      {copiedId === link.id ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-1 text-green-600" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copiar
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <QrCode className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
