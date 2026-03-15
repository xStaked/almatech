import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Dog, Cat, Tractor, Filter, ChevronRight } from "lucide-react"
import { products } from "@/lib/products"

const categoryData: Record<string, {
  name: string
  description: string
  longDescription: string
  icon: typeof Dog
  image: string
  petFilter: string[]
}> = {
  perros: {
    name: "Perros",
    description: "Suplementos y tratamientos especializados para caninos",
    longDescription: "Descubre nuestra linea completa de productos veterinarios con nanotecnologia para perros. Desde hepatoprotectores hasta soluciones respiratorias, cada formula esta disenada para maximizar la absorcion y efectividad en tu mejor amigo.",
    icon: Dog,
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=400&fit=crop",
    petFilter: ["perro"]
  },
  gatos: {
    name: "Gatos",
    description: "Formulas delicadas y efectivas para felinos",
    longDescription: "Productos especialmente formulados para las necesidades unicas de los gatos. Nuestra nanotecnologia permite dosis mas pequenas con mayor efectividad, perfectas para el metabolismo felino.",
    icon: Cat,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=400&fit=crop",
    petFilter: ["gato"]
  },
  granja: {
    name: "Granja",
    description: "Soluciones para animales de produccion",
    longDescription: "Productos veterinarios de alta calidad para animales de granja. Presentaciones industriales con la misma tecnologia de nanoencapsulacion que garantiza resultados en bovinos, porcinos, aves y equinos.",
    icon: Tractor,
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=400&fit=crop",
    petFilter: []
  }
}

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const category = categoryData[slug]
  
  if (!category) {
    return { title: "Categoria no encontrada | Almatech" }
  }

  return {
    title: `${category.name} | Almatech - Productos Veterinarios`,
    description: category.longDescription,
  }
}

export async function generateStaticParams() {
  return Object.keys(categoryData).map((slug) => ({ slug }))
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params
  const category = categoryData[slug]

  if (!category) {
    notFound()
  }

  // Filter products for this category
  const categoryProducts = slug === 'granja' 
    ? products // Show all products for farm (industrial sizes)
    : products.filter(p => p.pets.some(pet => category.petFilter.includes(pet)))

  const Icon = category.icon

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Banner */}
        <section className="relative h-[280px] md:h-[320px] overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-4">
                <Link href="/" className="hover:text-primary-foreground">Inicio</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-primary-foreground">Productos para {category.name}</span>
              </nav>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                  <Icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                    Productos para {category.name}
                  </h1>
                  <p className="text-primary-foreground/80 text-lg mt-1">
                    {category.description}
                  </p>
                </div>
              </div>
              <p className="max-w-2xl text-primary-foreground/70 leading-relaxed">
                {category.longDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  {categoryProducts.length} productos encontrados
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filtrar
                </Button>
                <select className="h-9 px-3 text-sm border border-input rounded-md bg-background">
                  <option>Mas relevantes</option>
                  <option>Precio: menor a mayor</option>
                  <option>Precio: mayor a menor</option>
                  <option>Mejor valorados</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <Card 
                  key={product.id}
                  className="group overflow-hidden border-border/50 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg bg-card"
                >
                  <div className="relative aspect-square bg-muted/30 overflow-hidden">
                    {product.image.startsWith('http') ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-secondary/10">
                        <Icon className="h-16 w-16 text-secondary/30" />
                      </div>
                    )}
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({product.reviews})
                      </span>
                    </div>
                    <span className="text-xs text-secondary font-medium">
                      {product.category}
                    </span>
                    <h3 className="font-semibold text-foreground mt-1 mb-1 group-hover:text-secondary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    
                    {/* Pets icons */}
                    <div className="flex items-center gap-2 mb-3">
                      {product.pets.includes('perro') && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Dog className="h-3.5 w-3.5" /> Perros
                        </div>
                      )}
                      {product.pets.includes('gato') && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Cat className="h-3.5 w-3.5" /> Gatos
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold text-foreground">
                        ${product.price.toLocaleString('es-CO')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice.toLocaleString('es-CO')}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        asChild
                        variant="outline" 
                        className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                      >
                        <Link href={`/producto/${product.slug}`}>
                          Ver detalle
                        </Link>
                      </Button>
                      <Button size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {categoryProducts.length === 0 && (
              <div className="text-center py-16">
                <Icon className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Proximamente
                </h3>
                <p className="text-muted-foreground">
                  Estamos preparando productos especiales para esta categoria.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
