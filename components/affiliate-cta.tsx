import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, PawPrint } from "lucide-react"

const highlights = [
  "Sin inversion inicial requerida",
  "Capacitacion gratuita incluida",
  "Comisiones atractivas desde el primer dia",
  "Productos que realmente funcionan",
]

export function AffiliateCTA() {
  return (
    <section id="afiliados" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-6">
            <PawPrint className="h-4 w-4" />
            Oportunidad de Negocio
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Convierte tu Amor por los Animales en{" "}
            <span className="text-secondary">Ingresos</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
            Unete a nuestra red de afiliados y comparte productos que realmente mejoran 
            la vida de las mascotas. Genera ingresos mientras haces algo que amas.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 text-foreground"
              >
                <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-6 text-lg font-semibold"
            >
              Quiero Ser Afiliado
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary text-foreground hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg"
            >
              Ver Plan de Compensacion
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            Mas de 500 afiliados activos en todo Colombia
          </p>
        </div>
      </div>
    </section>
  )
}
