"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Download,
  Image as ImageIcon,
  FileText,
  Video,
  Sparkles,
  Filter,
  Copy,
  CheckCircle2,
  Eye,
  Clock,
  Zap,
  MessageSquare
} from "lucide-react"

// Mock data
const materials = {
  images: [
    { id: 1, name: "Banner Silygran-Pro", format: "1200x628", type: "Facebook/Instagram", downloads: 156, preview: "/images/banner-1.jpg" },
    { id: 2, name: "Historia Nano-Lyptus", format: "1080x1920", type: "Stories", downloads: 234, preview: "/images/story-1.jpg" },
    { id: 3, name: "Post Beneficios", format: "1080x1080", type: "Feed Instagram", downloads: 189, preview: "/images/post-1.jpg" },
    { id: 4, name: "Banner Promo Marzo", format: "1200x628", type: "Facebook", downloads: 78, preview: "/images/promo-1.jpg" },
    { id: 5, name: "Carrusel Productos", format: "1080x1080", type: "Carrusel", downloads: 145, preview: "/images/carousel-1.jpg" },
    { id: 6, name: "Miniatura WhatsApp", format: "800x800", type: "WhatsApp", downloads: 312, preview: "/images/wa-1.jpg" },
  ],
  texts: [
    { 
      id: 1, 
      name: "Caption Lanzamiento", 
      platform: "Instagram",
      text: "Cuida a quien te ama sin condiciones. Silygran-Pro protege el higado de tu mascota con nanotecnologia avanzada. Registrado ante el ICA. Pide el tuyo ahora con envio GRATIS.",
      engagement: "Alto"
    },
    { 
      id: 2, 
      name: "Mensaje WhatsApp", 
      platform: "WhatsApp",
      text: "Hola! Te cuento que encontre estos productos increibles para mascotas. Son veterinarios con nanotecnologia y tienen registro ICA. Si te interesa, te paso mi codigo para un descuento especial.",
      engagement: "Muy Alto"
    },
    { 
      id: 3, 
      name: "Post Testimonial", 
      platform: "Facebook",
      text: "Mi perrito Max tenia problemas hepaticos y el veterinario me recomendo Silygran-Pro. En solo 2 semanas note una mejora increible. 100% recomendado para todos los que aman a sus mascotas.",
      engagement: "Alto"
    },
  ],
  videos: [
    { id: 1, name: "Explicacion Silygran-Pro", duration: "0:45", type: "Reel", views: 2340 },
    { id: 2, name: "Testimonial Cliente", duration: "1:20", type: "Post", views: 1890 },
    { id: 3, name: "Como aplicar Nano-Lyptus", duration: "0:30", type: "Reel", views: 3120 },
  ],
  tips: [
    {
      id: 1,
      title: "Mejor hora para publicar",
      content: "Los mejores horarios son entre 7-9am y 7-10pm. Los fines de semana tienen 23% mas engagement.",
      icon: Clock
    },
    {
      id: 2,
      title: "Usa testimoniales reales",
      content: "Las publicaciones con testimoniales de clientes reales tienen 40% mas conversiones.",
      icon: MessageSquare
    },
    {
      id: 3,
      title: "Responde rapido",
      content: "Responder en menos de 1 hora aumenta las probabilidades de venta en un 60%.",
      icon: Zap
    },
  ]
}

export default function MarketingPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("images")

  const copyText = (id: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Marketing</h1>
          <p className="text-muted-foreground">Material promocional listo para compartir</p>
        </div>
      </div>

      {/* Tips Banner */}
      <Card className="bg-accent/10 border-accent/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-bold mb-2">Tips para aumentar tus ventas</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {materials.tips.map((tip) => (
                  <div key={tip.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-card rounded-lg flex items-center justify-center flex-shrink-0">
                      <tip.icon className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{tip.title}</p>
                      <p className="text-xs text-muted-foreground">{tip.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Materials Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="images" className="gap-2">
            <ImageIcon className="h-4 w-4" />
            Imagenes
          </TabsTrigger>
          <TabsTrigger value="texts" className="gap-2">
            <FileText className="h-4 w-4" />
            Textos
          </TabsTrigger>
          <TabsTrigger value="videos" className="gap-2">
            <Video className="h-4 w-4" />
            Videos
          </TabsTrigger>
        </TabsList>

        {/* Images Tab */}
        <TabsContent value="images">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {materials.images.map((item) => (
              <Card key={item.id} className="overflow-hidden group">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-secondary/10">
                    <ImageIcon className="h-12 w-12 text-secondary/40" />
                  </div>
                  <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Download className="h-4 w-4 mr-1" />
                      Descargar
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{item.name}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{item.format}</Badge>
                      <span className="text-muted-foreground">{item.type}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.downloads} descargas</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Texts Tab */}
        <TabsContent value="texts">
          <div className="space-y-4">
            {materials.texts.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <Badge variant="outline">{item.platform}</Badge>
                        <Badge className={`text-xs ${
                          item.engagement === 'Muy Alto' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          Engagement {item.engagement}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyText(item.id, item.text)}
                    >
                      {copiedId === item.id ? (
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
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm whitespace-pre-wrap">{item.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {materials.videos.map((item) => (
              <Card key={item.id} className="overflow-hidden group">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-secondary/10">
                    <Video className="h-12 w-12 text-secondary/40" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-foreground/80 text-background text-xs px-2 py-1 rounded">
                    {item.duration}
                  </div>
                  <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Download className="h-4 w-4 mr-1" />
                      Descargar
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{item.name}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="outline" className="text-xs">{item.type}</Badge>
                    <span className="text-xs text-muted-foreground">{item.views.toLocaleString()} vistas</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
