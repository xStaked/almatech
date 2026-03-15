"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  Award, 
  Users, 
  Target, 
  Sparkles, 
  Shield, 
  PawPrint,
  ChevronRight,
  Microscope,
  Leaf,
  Globe,
  TrendingUp
} from "lucide-react"

const stats = [
  { number: "10,000+", label: "Mascotas saludables" },
  { number: "500+", label: "Veterinarios aliados" },
  { number: "15+", label: "Refugios apoyados" },
  { number: "100%", label: "Ingredientes naturales" },
]

const values = [
  {
    icon: Heart,
    title: "Amor por los animales",
    description: "Cada decision que tomamos esta guiada por nuestro profundo amor y respeto por los animales. Son familia, no solo mascotas."
  },
  {
    icon: Microscope,
    title: "Ciencia e innovacion",
    description: "Utilizamos nanotecnologia de vanguardia respaldada por investigacion cientifica para crear productos verdaderamente efectivos."
  },
  {
    icon: Leaf,
    title: "Naturaleza primero",
    description: "Nuestras formulas combinan lo mejor de la naturaleza con la ciencia moderna. Sin quimicos daninos, solo ingredientes puros."
  },
  {
    icon: Shield,
    title: "Transparencia total",
    description: "Cada ingrediente, cada proceso, cada resultado. Te contamos todo porque creemos en la honestidad con nuestra comunidad."
  },
]

const timeline = [
  {
    year: "2019",
    title: "El inicio de un sueno",
    description: "Norgtech, nuestra empresa madre, comienza a investigar aplicaciones de nanotecnologia en salud animal despues de que el fundador perdiera a su perro por una enfermedad hepatica tratable."
  },
  {
    year: "2021",
    title: "Primer producto",
    description: "Lanzamos Silygran-Pro, nuestro hepatoprotector revolucionario. Los resultados superan todas las expectativas en pruebas clinicas."
  },
  {
    year: "2023",
    title: "Expansion de linea",
    description: "Introducimos Nano-Lyptus para problemas respiratorios y Glucopass para el metabolismo. La familia Almatech crece."
  },
  {
    year: "2024",
    title: "Nace Almatech",
    description: "Creamos Almatech como marca dedicada exclusivamente al bienestar animal, con una red de afiliados apasionados por las mascotas."
  },
  {
    year: "2025",
    title: "Impacto social",
    description: "Superamos las 10,000 mascotas ayudadas y establecemos alianzas con mas de 15 refugios de animales en Colombia."
  },
]

const team = [
  {
    name: "Dr. Carlos Mendez",
    role: "Director de Investigacion",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    bio: "Veterinario con 20 anos de experiencia y especialista en medicina interna animal."
  },
  {
    name: "Maria Fernanda Lopez",
    role: "CEO & Fundadora",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    bio: "Emprendedora apasionada por los animales y la innovacion tecnologica."
  },
  {
    name: "Dr. Andres Ruiz",
    role: "Director de Calidad",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Quimico farmaceutico con especializacion en nanotecnologia aplicada."
  },
]

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-primary" />
          <div className="absolute inset-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1920&h=1080&fit=crop"
              alt="Mascotas felices"
              fill
              className="object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6 text-sm font-semibold">
                <PawPrint className="h-4 w-4" />
                Nuestra Historia
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight">
                Tecnologia con alma para quienes mas amas
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
                Somos mas que una empresa de productos veterinarios. Somos una comunidad de amantes de los animales comprometidos con su bienestar a traves de la ciencia y la innovacion.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  Conoce nuestros productos
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Unete como afiliado
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-extrabold text-secondary mb-1">
                    {stat.number}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
                  <Target className="h-4 w-4" />
                  Nuestra Mision
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
                  Revolucionar el cuidado animal con ciencia accesible
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Creemos que cada mascota merece acceso a tratamientos de alta calidad. Por eso desarrollamos productos con nanotecnologia que son efectivos, seguros y accesibles para todas las familias.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Nuestro compromiso va mas alla de los productos. Trabajamos con veterinarios, refugios y organizaciones para crear un ecosistema de bienestar animal integral.
                </p>
                <div className="flex items-center gap-4 p-4 bg-muted rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                    <Globe className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Impacto global, corazon local</p>
                    <p className="text-sm text-muted-foreground">Basados en Colombia, sirviendo a Latinoamerica</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=800&fit=crop"
                    alt="Perro saludable"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-xl border border-border max-w-xs">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Award className="h-5 w-5 text-secondary" />
                    </div>
                    <p className="font-bold text-foreground">Registro ICA</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Todos nuestros productos cuentan con registro del Instituto Colombiano Agropecuario.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-28 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                <Sparkles className="h-4 w-4" />
                Nuestros Valores
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Lo que nos mueve cada dia
              </h2>
              <p className="text-lg text-muted-foreground">
                Estos principios guian cada decision, cada formula y cada interaccion con nuestra comunidad.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-card p-6 rounded-2xl border border-border hover:border-secondary/30 transition-colors"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-5">
                    <value.icon className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
                <TrendingUp className="h-4 w-4" />
                Nuestra Trayectoria
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                De la idea al impacto
              </h2>
              <p className="text-lg text-muted-foreground">
                Un viaje de pasion, ciencia y compromiso con el bienestar animal.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />
                
                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <div
                      key={item.year}
                      className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Year bubble */}
                      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full bg-secondary flex items-center justify-center z-10">
                        <span className="text-secondary-foreground font-bold text-sm">
                          {item.year}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        <div className="bg-card p-6 rounded-2xl border border-border">
                          <h3 className="text-lg font-bold text-foreground mb-2">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Spacer for alternating layout */}
                      <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">
                <Users className="h-4 w-4" />
                Nuestro Equipo
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Las mentes detras de Almatech
              </h2>
              <p className="text-lg text-primary-foreground/70">
                Un equipo multidisciplinario unido por el amor a los animales y la pasion por la innovacion.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="text-center"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-5 border-4 border-accent/30">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-accent font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-primary-foreground/70 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-3xl p-8 md:p-12 border border-border text-center max-w-4xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">
                Se parte de la familia Almatech
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Ya sea como cliente, afiliado o aliado, te invitamos a unirte a nuestra mision de transformar el bienestar animal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
                  Ver productos
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                <Button size="lg" variant="outline" className="font-semibold">
                  Programa de afiliados
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
