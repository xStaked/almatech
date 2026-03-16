"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, ChevronLeft, ChevronRight, Gift, Truck, Percent, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const promos = [
    {
        id: 1,
        text: "Envio GRATIS en compras mayores a $150.000",
        icon: Truck,
        link: "/productos",
        cta: "Comprar ahora",
        bgClass: "bg-[#dda15e]",
    },
    {
        id: 2,
        text: "Registrate y gana 500 AlmaPuntos de bienvenida",
        icon: Gift,
        link: "/registro",
        cta: "Crear cuenta",
        bgClass: "bg-[#606C38]",
    },
    {
        id: 3,
        text: "20% OFF en tu primera compra con codigo: BIENVENIDO20",
        icon: Percent,
        link: "/productos",
        cta: "Usar codigo",
        bgClass: "bg-[#bc6c25]",
    },
    {
        id: 4,
        text: "Nuevo: Silygran-Pro para la salud hepatica de tu mascota",
        icon: Sparkles,
        link: "/producto/silygran-pro",
        cta: "Conocer mas",
        bgClass: "bg-[#283618]",
    },
]

export function PromoBanner() {
    const [currentPromo, setCurrentPromo] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPromo((prev) => (prev + 1) % promos.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    if (!isVisible) return null

    const promo = promos[currentPromo]
    const Icon = promo.icon

    return (
        <div className={`${promo.bgClass} text-white relative overflow-hidden transition-colors duration-500`}>
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0 animate-slide"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center gap-4 py-2.5 relative">
                    {/* Previous button */}
                    <button
                        onClick={() => setCurrentPromo((prev) => (prev - 1 + promos.length) % promos.length)}
                        className="absolute left-0 p-1 hover:bg-white/10 rounded-full transition-colors hidden sm:block"
                        aria-label="Promocion anterior"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>

                    {/* Promo content */}
                    <div className="flex items-center gap-3 animate-fadeIn" key={promo.id}>
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm font-medium text-center">
                            {promo.text}
                        </span>
                        <Link
                            href={promo.link}
                            className="text-sm font-bold underline underline-offset-2 hover:no-underline whitespace-nowrap hidden sm:inline"
                        >
                            {promo.cta}
                        </Link>
                    </div>

                    {/* Next button */}
                    <button
                        onClick={() => setCurrentPromo((prev) => (prev + 1) % promos.length)}
                        className="absolute right-8 p-1 hover:bg-white/10 rounded-full transition-colors hidden sm:block"
                        aria-label="Siguiente promocion"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>

                    {/* Close button */}
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute right-0 p-1 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Cerrar banner"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    {/* Dots indicator */}
                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 flex gap-1">
                        {promos.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPromo(index)}
                                className={`h-1 rounded-full transition-all ${index === currentPromo ? "w-4 bg-white" : "w-1 bg-white/50"
                                    }`}
                                aria-label={`Ir a promocion ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
