"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  ChevronRight,
  Microscope,
  Leaf,
  Shield,
  Award,
  Heart,
  Beaker,
  Zap,
  BadgeCheck,
  Star,
  ThumbsUp
} from "lucide-react"

const differentiators = [
  {
    icon: Microscope,
    title: "Nanotecnologia de vanguardia",
    description: "Nuestras formulas utilizan particulas de tamano nanometrico que permiten una absorcion hasta 10 veces mayor que los productos tradicionales.",
    stats: "10x mejor absorcion"
  },
  {
    icon: Leaf,
    title: "Ingredientes 100% naturales",
    description: "Cada componente proviene de fuentes naturales: silimarina de cardo mariano, eucalipto, nano colageno y extractos vegetales.",
    stats: "0% quimicos daninos"
  },
  {
    icon: BadgeCheck,
    title: "Registro ICA certificado",
    description: "Todos nuestros productos cuentan con el registro del Instituto Colombiano Agropecuario, garantizando seguridad y eficacia.",
    stats: "100% certificados"
  },
  {
    icon: Beaker,
    title: "Respaldado por ciencia",
    description: "Cada formula es desarrollada por nuestro equipo de veterinarios y quimicos, con pruebas clinicas que avalan resultados.",
    stats: "500+ casos de exito"
  },
]

const comparisons = [
  {
    feature: "Tecnologia",
    almatech: "Nanotecnologia avanzada",
    others: "Formulas tradicionales",
  },
  {
    feature: "Absorcion",
    almatech: "Hasta 95% de biodisponibilidad",
    others: "20-40% de biodisponibilidad",
  },
  {
    feature: "Ingredientes",
    almatech: "100% naturales y organicos",
    others: "Mezcla con quimicos",
  },
  {
    feature: "Certificaciones",
    almatech: "Registro ICA completo",
    others: "Varia segun fabricante",
  },
  {
    feature: "Resultados",
    almatech: "Mejoras en 7-14 dias",
    others: "Semanas o meses",
  },
  {
    feature: "Seguridad",
    almatech: "Sin efectos secundarios",
    others: "Posibles reacciones",
  },
]

const vetTestimonials = [
  {
    name: "Dra. Patricia Gonzalez",
    specialty: "Medicina Interna Veterinaria",
    clinic: "Clinica Veterinaria El Refugio",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
    quote: "Silygran-Pro ha cambiado mi practica. Los pacientes con problemas hepaticos muestran mejoras significativas en los valores sanguineos en solo dos semanas."
  },
  {
    name: "Dr. Miguel Hernandez",
    specialty: "Especialista en Animales Exoticos",
    clinic: "Zoo Vet Bogota",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
    quote: "La versatilidad de Nano-Lyptus es impresionante. Lo uso en aves, reptiles y mamiferos con excelentes resultados en problemas respiratorios."
  },
  {
    name: "Dra. Lucia Vargas",
    specialty: "Oncologia Veterinaria",
    clinic: "Hospital Veterinario del Norte",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
    quote: "En mis pacientes oncologicos, Silygran-Pro ha sido fundamental para proteger el higado durante los tratamientos. Es parte esencial de mis protocolos."
  },
]

const faqs = [
  {
    question: "Son seguros los productos de nanotecnologia?",
    answer: "Absolutamente. La nanotecnologia que usamos simplemente reduce el tamano de las particulas de ingredientes naturales, lo que mejora su absorcion sin alterar su composicion ni seguridad. Todos nuestros productos estan aprobados por el ICA."
  },
  {
    question: "En cuanto tiempo vere resultados?",
    answer: "Dependiendo del producto y la condicion, la mayoria de los duenos reportan mejoras visibles entre 7 y 14 dias. En casos cronicos, el tratamiento completo puede durar de 1 a 3 meses."
  },
  {
    question: "Puedo usar los productos junto con otros medicamentos?",
    answer: "Si, nuestros productos naturales son compatibles con la mayoria de tratamientos veterinarios. Sin embargo, siempre recomendamos consultar con tu veterinario antes de combinar tratamientos."
  },
  {
    question: "Por que son mas efectivos que otras marcas?",
    answer: "La nanotecnologia permite que los ingredientes activos lleguen directamente a donde se necesitan, con una biodisponibilidad hasta 10 veces mayor que las formulas tradicionales."
  },
]

export default function PorQueAlmatechPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-secondary" />
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1920&h=1080&fit=crop"
              alt="Perro saludable"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-foreground/20 text-secondary-foreground mb-6 text-sm font-semibold">
                <Star className="h-4 w-4" />
                Por que Almatech
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-secondary-foreground mb-6 leading-tight">
                La diferencia esta en la ciencia
              </h1>
              <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                No somos solo otra marca de productos veterinarios. Somos pioneros en la aplicacion de nanotecnologia para el bienestar animal.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  Ver productos
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                <Button size="lg" variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10">
                  Hablar con un experto
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
                <Zap className="h-4 w-4" />
                Nuestras Ventajas
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Que nos hace diferentes
              </h2>
              <p className="text-lg text-muted-foreground">
                Combinamos lo mejor de la naturaleza con tecnologia de punta para crear productos verdaderamente efectivos.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {differentiators.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-6 bg-card p-6 rounded-2xl border border-border hover:border-secondary/30 transition-colors"
                >
                  <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-8 w-8 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                      <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-full whitespace-nowrap">
                        {item.stats}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 md:py-28 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                <ThumbsUp className="h-4 w-4" />
                Comparativa
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Almatech vs. el mercado
              </h2>
              <p className="text-lg text-muted-foreground">
                Una comparacion honesta de lo que ofrecemos frente a las alternativas tradicionales.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-3 bg-primary text-primary-foreground">
                  <div className="p-4 font-semibold">Caracteristica</div>
                  <div className="p-4 font-semibold text-center border-l border-primary-foreground/20">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-6 h-6 bg-accent rounded flex items-center justify-center">
                        <Heart className="h-3 w-3 text-accent-foreground" />
                      </span>
                      Almatech
                    </span>
                  </div>
                  <div className="p-4 font-semibold text-center border-l border-primary-foreground/20">
                    Otros productos
                  </div>
                </div>
                
                {/* Rows */}
                {comparisons.map((row, index) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-card' : 'bg-muted/30'}`}
                  >
                    <div className="p-4 font-medium text-foreground border-t border-border">
                      {row.feature}
                    </div>
                    <div className="p-4 text-center border-t border-l border-border">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                        <span className="text-sm text-foreground">{row.almatech}</span>
                      </div>
                    </div>
                    <div className="p-4 text-center border-t border-l border-border">
                      <span className="text-sm text-muted-foreground">{row.others}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vet Testimonials */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
                <Award className="h-4 w-4" />
                Respaldo Veterinario
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Recomendado por profesionales
              </h2>
              <p className="text-lg text-muted-foreground">
                Veterinarios de todo el pais confian en nuestros productos para sus pacientes.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {vetTestimonials.map((vet) => (
                <div
                  key={vet.name}
                  className="bg-card p-6 rounded-2xl border border-border"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={vet.image}
                      alt={vet.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-bold text-foreground">{vet.name}</p>
                      <p className="text-sm text-secondary">{vet.specialty}</p>
                      <p className="text-xs text-muted-foreground">{vet.clinic}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed italic">
                    &quot;{vet.quote}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">
                <Shield className="h-4 w-4" />
                Preguntas Frecuentes
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Resolvemos tus dudas
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-2xl"
                >
                  <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                  <p className="text-primary-foreground/80 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-3xl p-8 md:p-12 border border-border text-center max-w-4xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-secondary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">
                Prueba la diferencia Almatech
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Miles de mascotas ya disfrutan de mejor salud gracias a nuestros productos. Es momento de que la tuya tambien lo haga.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
                  Ver productos
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                <Button size="lg" variant="outline" className="font-semibold">
                  Contactar un asesor
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
