"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { 
  DollarSign, 
  Users, 
  Gift, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight,
  Wallet,
  Share2,
  GraduationCap,
  HeartHandshake,
  Clock,
  Award
} from "lucide-react"

const benefits = [
  {
    icon: Wallet,
    title: "Comisiones competitivas",
    description: "Gana hasta 30% de comision por cada venta que generes. Entre mas vendas, mas ganas."
  },
  {
    icon: Share2,
    title: "Tu tienda personalizada",
    description: "Obtén un enlace unico y una pagina de tienda con tu nombre para compartir facilmente."
  },
  {
    icon: GraduationCap,
    title: "Capacitacion completa",
    description: "Acceso a cursos, webinars y materiales de venta para que te conviertas en experto."
  },
  {
    icon: HeartHandshake,
    title: "Comunidad de apoyo",
    description: "Unete a una red de afiliados apasionados que se apoyan mutuamente."
  },
  {
    icon: Gift,
    title: "Bonos y premios",
    description: "Alcanza metas mensuales y recibe bonos extra, productos gratis y viajes."
  },
  {
    icon: Clock,
    title: "Flexibilidad total",
    description: "Trabaja a tu propio ritmo, desde cualquier lugar. Tu defines tus horarios."
  },
]

const steps = [
  {
    number: "01",
    title: "Registrate gratis",
    description: "Completa el formulario de inscripcion. No hay costos de entrada ni cuotas mensuales."
  },
  {
    number: "02",
    title: "Recibe tu kit",
    description: "Te enviamos un kit de inicio con muestras, catalogos y tu enlace personalizado."
  },
  {
    number: "03",
    title: "Comparte y vende",
    description: "Usa redes sociales, WhatsApp o ventas en persona. Tu decides como vender."
  },
  {
    number: "04",
    title: "Cobra tus ganancias",
    description: "Recibe tus comisiones cada semana directamente en tu cuenta bancaria."
  },
]

const testimonials = [
  {
    name: "Carolina Mendez",
    location: "Bogota",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    quote: "Empece como afiliada hace 6 meses y ya es mi ingreso principal. Los productos se venden solos porque realmente funcionan.",
    earnings: "$2.500.000/mes"
  },
  {
    name: "Roberto Suarez",
    location: "Medellin",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    quote: "Soy veterinario y recomiendo Almatech a mis pacientes. Las comisiones son un excelente ingreso adicional.",
    earnings: "$1.800.000/mes"
  },
  {
    name: "Ana Maria Torres",
    location: "Cali",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    quote: "Me encanta poder trabajar desde casa mientras cuido a mi familia. Almatech me dio esa libertad.",
    earnings: "$1.200.000/mes"
  },
]

const plans = [
  {
    name: "Afiliado",
    commission: "20%",
    requirements: "Sin minimo de ventas",
    features: [
      "Comision del 20% en ventas",
      "Enlace personalizado",
      "Acceso a capacitaciones",
      "Soporte por WhatsApp",
    ]
  },
  {
    name: "Afiliado Pro",
    commission: "25%",
    requirements: "$500.000/mes en ventas",
    popular: true,
    features: [
      "Comision del 25% en ventas",
      "Todo lo del plan Afiliado",
      "Productos a precio de afiliado",
      "Bonos trimestrales",
      "Prioridad en soporte",
    ]
  },
  {
    name: "Lider",
    commission: "30%",
    requirements: "$2.000.000/mes + equipo",
    features: [
      "Comision del 30% en ventas",
      "5% de comision de tu equipo",
      "Todo lo del plan Pro",
      "Viajes y eventos exclusivos",
      "Mentorias personalizadas",
    ]
  },
]

export default function GanaConNosotrosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent to-bourbon" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6 text-sm font-semibold">
                <DollarSign className="h-4 w-4" />
                Programa de Afiliados
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6 leading-tight">
                Gana dinero haciendo lo que amas
              </h1>
              <p className="text-xl text-primary/80 mb-8 leading-relaxed">
                Unete a nuestra red de afiliados y genera ingresos vendiendo productos que realmente transforman la vida de las mascotas.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  Quiero ser afiliado
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 font-semibold">
                  Conocer mas
                </Button>
              </div>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute right-0 bottom-0 w-1/3 h-full hidden lg:block">
            <Image
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=1000&fit=crop"
              alt="Afiliado feliz"
              fill
              className="object-cover object-left opacity-30"
            />
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-secondary mb-1">500+</p>
                <p className="text-sm text-muted-foreground">Afiliados activos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-secondary mb-1">30%</p>
                <p className="text-sm text-muted-foreground">Comision maxima</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-secondary mb-1">$0</p>
                <p className="text-sm text-muted-foreground">Costo de inscripcion</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-secondary mb-1">7 dias</p>
                <p className="text-sm text-muted-foreground">Pago de comisiones</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
                <Gift className="h-4 w-4" />
                Beneficios
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Por que ser afiliado Almatech
              </h2>
              <p className="text-lg text-muted-foreground">
                Mas que un programa de ventas, es una oportunidad de crecimiento personal y financiero.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-card p-6 rounded-2xl border border-border hover:border-accent/30 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                    <benefit.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 md:py-28 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                <TrendingUp className="h-4 w-4" />
                Como Funciona
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Comienza en 4 simples pasos
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="relative"
                >
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                  )}
                  <div className="bg-card p-6 rounded-2xl border border-border relative z-10">
                    <span className="text-5xl font-extrabold text-secondary/20 mb-4 block">
                      {step.number}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commission Plans */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
                <Award className="h-4 w-4" />
                Planes de Comision
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Crece con nosotros
              </h2>
              <p className="text-lg text-muted-foreground">
                Entre mas vendas y mas grande sea tu equipo, mayores seran tus beneficios.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-card p-8 rounded-2xl border-2 ${
                    plan.popular 
                      ? 'border-secondary shadow-lg scale-105' 
                      : 'border-border'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary text-secondary-foreground text-sm font-semibold rounded-full">
                      Mas popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-4xl font-extrabold text-secondary mb-1">{plan.commission}</p>
                  <p className="text-sm text-muted-foreground mb-6">{plan.requirements}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full font-semibold ${
                      plan.popular 
                        ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Comenzar ahora
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">
                <Users className="h-4 w-4" />
                Historias de Exito
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Lo que dicen nuestros afiliados
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-2xl"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-primary-foreground/70">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-primary-foreground/90 mb-4 text-sm leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center gap-2 text-accent">
                    <DollarSign className="h-5 w-5" />
                    <span className="font-bold">{testimonial.earnings}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-accent to-bourbon rounded-3xl p-8 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
                Comienza tu camino al exito hoy
              </h2>
              <p className="text-lg text-primary/80 mb-8 max-w-2xl mx-auto">
                Unete a mas de 500 afiliados que ya estan generando ingresos extra mientras ayudan a las mascotas.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Registrarme como afiliado
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
