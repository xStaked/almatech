import { Heart, Users, Shield, Truck, FlaskConical, Award } from "lucide-react"

const benefits = [
  {
    icon: FlaskConical,
    title: "Nanotecnologia Avanzada",
    description: "Nanoencapsulacion que mejora la absorcion y efectividad de los ingredientes activos.",
  },
  {
    icon: Shield,
    title: "Registro ICA",
    description: "Todos nuestros productos cuentan con registro sanitario del Instituto Colombiano Agropecuario.",
  },
  {
    icon: Heart,
    title: "Ingredientes Naturales",
    description: "Formulados con extractos naturales como cardo mariano, eucalipto y colageno.",
  },
  {
    icon: Award,
    title: "Respaldado por Veterinarios",
    description: "Desarrollados y recomendados por profesionales veterinarios con años de experiencia.",
  },
  {
    icon: Truck,
    title: "Envio a Todo Colombia",
    description: "Entregamos en tu puerta con envio gratis en compras mayores a $150.000 COP.",
  },
  {
    icon: Users,
    title: "Programa de Afiliados",
    description: "Unete a nuestra red y genera ingresos compartiendo productos que amas.",
  },
]

export function Benefits() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Por que Almatech
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
            La Diferencia Almatech
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-pretty">
            Ciencia y amor en cada producto para el bienestar de tus mascotas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-card hover:bg-primary transition-all duration-300 cursor-default"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary/20 group-hover:bg-primary-foreground/20 flex items-center justify-center mb-6 transition-colors">
                <benefit.icon className="w-7 h-7 text-secondary group-hover:text-primary-foreground transition-colors" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary-foreground mb-3 transition-colors">
                {benefit.title}
              </h3>
              
              <p className="text-muted-foreground group-hover:text-primary-foreground/80 leading-relaxed transition-colors">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
