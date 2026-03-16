"use client"

import { useEffect, useState, useRef } from "react"
import { PawPrint, Users, Stethoscope, Heart, Award, Truck } from "lucide-react"

const stats = [
    {
        id: 1,
        label: "Mascotas Felices",
        value: 15000,
        suffix: "+",
        icon: PawPrint,
        color: "text-[#dda15e]",
        bgColor: "bg-[#dda15e]/10",
    },
    {
        id: 2,
        label: "Afiliados Activos",
        value: 500,
        suffix: "+",
        icon: Users,
        color: "text-[#606C38]",
        bgColor: "bg-[#606C38]/10",
    },
    {
        id: 3,
        label: "Veterinarios Confian",
        value: 200,
        suffix: "+",
        icon: Stethoscope,
        color: "text-[#bc6c25]",
        bgColor: "bg-[#bc6c25]/10",
    },
    {
        id: 4,
        label: "Pedidos Entregados",
        value: 25000,
        suffix: "+",
        icon: Truck,
        color: "text-[#283618]",
        bgColor: "bg-[#283618]/10",
    },
]

function useCountUp(end: number, duration: number = 2000, startCounting: boolean = false) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!startCounting) return

        let startTime: number | null = null
        const startValue = 0

        const animate = (currentTime: number) => {
            if (startTime === null) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(easeOutQuart * (end - startValue) + startValue))

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [end, duration, startCounting])

    return count
}

function StatCard({ stat, isVisible }: { stat: typeof stats[0], isVisible: boolean }) {
    const count = useCountUp(stat.value, 2500, isVisible)
    const Icon = stat.icon

    return (
        <div className="relative group">
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className={`${stat.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-7 w-7 ${stat.color}`} />
                </div>

                {/* Number */}
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                        {count.toLocaleString()}
                    </span>
                    <span className={`text-2xl font-bold ${stat.color}`}>{stat.suffix}</span>
                </div>

                {/* Label */}
                <p className="text-muted-foreground font-medium mt-1">{stat.label}</p>

                {/* Decorative element */}
                <div className={`absolute top-0 right-0 w-20 h-20 ${stat.bgColor} rounded-bl-[40px] rounded-tr-2xl opacity-50`} />
            </div>
        </div>
    )
}

export function StatsCounter() {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.2 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="py-16 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#dda15e]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#606C38]/20 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-[#dda15e] font-semibold mb-2 uppercase tracking-wider text-sm">Nuestra Comunidad</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Miles de mascotas confian en nosotros
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Cada dia mas familias eligen Almatech para cuidar la salud de sus companeros peludos
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.id}
                            className={`transition-all duration-700 ${isVisible
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                                }`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <StatCard stat={stat} isVisible={isVisible} />
                        </div>
                    ))}
                </div>

                {/* Trust Badges */}
                <div className="mt-16 pt-12 border-t border-border">
                    <p className="text-center text-muted-foreground text-sm mb-8 font-medium">
                        Certificaciones y respaldos que nos avalan
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                        <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                <Award className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold text-foreground text-sm">Registro ICA</p>
                                <p className="text-xs">Colombia</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                <Stethoscope className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold text-foreground text-sm">Avalado por</p>
                                <p className="text-xs">Veterinarios</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                <Heart className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold text-foreground text-sm">100% Natural</p>
                                <p className="text-xs">Sin quimicos</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                <PawPrint className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold text-foreground text-sm">Cruelty Free</p>
                                <p className="text-xs">No testeado en animales</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
