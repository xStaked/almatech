"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote, Dog, Cat } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Maria Gonzalez",
    role: "Dueña de Max (Golden Retriever)",
    pet: "dog",
    content: "Mi perro Max tenia problemas hepaticos severos. Despues de 3 meses con Silygran-Pro, sus enzimas hepaticas volvieron a la normalidad. El veterinario no podia creerlo.",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Rodriguez",
    role: "Criador profesional",
    pet: "dog",
    content: "Uso Nano-Lyptus en todas mis camadas. Desde que lo implementé, las infecciones respiratorias en los cachorros se redujeron drasticamente. Es parte esencial de mi protocolo.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Martinez",
    role: "Dueña de Luna (Gata Persa)",
    pet: "cat",
    content: "Luna es mayor y tenia problemas para respirar. Con Nano-Lyptus mejoro muchisimo su calidad de vida. Ahora esta mas activa y feliz que nunca.",
    rating: 5,
  },
  {
    id: 4,
    name: "Roberto Sanchez",
    role: "Veterinario",
    pet: "dog",
    content: "Como veterinario, recomiendo los productos Almatech a mis pacientes. La nanotecnologia de nanoencapsulacion realmente marca una diferencia en la absorcion y efectividad.",
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Testimonios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mt-2 text-balance">
            Historias de Mascotas Felices
          </h2>
          <p className="text-primary-foreground/80 mt-4 max-w-2xl mx-auto text-pretty">
            Descubre como nuestros productos han mejorado la vida de miles de mascotas
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-background/10 backdrop-blur-sm border-primary-foreground/20">
                    <CardContent className="p-8 md:p-12">
                      <div className="flex items-center justify-between mb-6">
                        <Quote className="w-12 h-12 text-secondary/60" />
                        <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                          {testimonial.pet === "dog" ? (
                            <Dog className="w-6 h-6 text-secondary" />
                          ) : (
                            <Cat className="w-6 h-6 text-secondary" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-5 h-5 fill-secondary text-secondary" 
                          />
                        ))}
                      </div>

                      <blockquote className="text-xl md:text-2xl text-primary-foreground leading-relaxed mb-8 text-pretty">
                        &quot;{testimonial.content}&quot;
                      </blockquote>

                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-secondary/30 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary-foreground">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-primary-foreground">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-primary-foreground/70">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex 
                      ? "bg-secondary w-8" 
                      : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
