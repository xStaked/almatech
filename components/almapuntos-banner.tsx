"use client"

import { Button } from "@/components/ui/button"
import { Coins, Gift, Crown, ArrowRight, Star, Sparkles } from "lucide-react"
import Link from "next/link"

const levels = [
    { name: "Bronce", points: "0 - 999", color: "bg-amber-600", icon: "text-amber-600" },
    { name: "Plata", points: "1,000 - 4,999", color: "bg-gray-400", icon: "text-gray-400" },
    { name: "Oro", points: "5,000 - 9,999", color: "bg-yellow-500", icon: "text-yellow-500" },
    { name: "Diamante", points: "10,000+", color: "bg-cyan-400", icon: "text-cyan-400" },
]

const benefits = [
    { text: "Gana puntos en cada compra", icon: Coins },
    { text: "Canjea por descuentos y productos", icon: Gift },
    { text: "Sube de nivel y desbloquea beneficios", icon: Crown },
]

export function AlmaPuntosBanner() {
    return (
        <section className="py-16 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#283618] via-[#3a4a28] to-[#283618]" />

            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#dda15e]/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#606C38]/20 rounded-full blur-3xl" />

                {/* Floating coins */}
                <div className="absolute top-1/4 left-[10%] animate-float">
                    <Coins className="h-8 w-8 text-[#dda15e]/30" />
                </div>
                <div className="absolute top-1/3 right-[15%] animate-float-delayed">
                    <Star className="h-6 w-6 text-[#dda15e]/20" />
                </div>
                <div className="absolute bottom-1/4 left-[20%] animate-float">
                    <Sparkles className="h-6 w-6 text-[#dda15e]/25" />
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-[#dda15e]/20 text-[#dda15e] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <Coins className="h-4 w-4" />
                            Programa de Fidelizacion
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#fefae0] mb-6 leading-tight">
                            Unete a{" "}
                            <span className="text-[#dda15e]">AlmaPuntos</span>
                            <br />y gana recompensas
                        </h2>

                        <p className="text-[#fefae0]/80 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                            Por cada compra acumulas puntos que puedes canjear por descuentos,
                            productos gratis y beneficios exclusivos para ti y tu mascota.
                        </p>

                        {/* Benefits */}
                        <div className="space-y-4 mb-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-3 justify-center lg:justify-start">
                                    <div className="w-10 h-10 bg-[#dda15e]/20 rounded-xl flex items-center justify-center">
                                        <benefit.icon className="h-5 w-5 text-[#dda15e]" />
                                    </div>
                                    <span className="text-[#fefae0]/90 font-medium">{benefit.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/registro">
                                <Button
                                    size="lg"
                                    className="bg-[#dda15e] hover:bg-[#bc6c25] text-[#283618] font-bold px-8 h-14 shadow-lg shadow-[#dda15e]/25"
                                >
                                    Crear Cuenta Gratis
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/mi-cuenta/puntos">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-[#fefae0]/60 text-[#fefae0] hover:bg-[#fefae0]/10 h-14 bg-transparent"
                                >
                                    Ver Beneficios
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Levels Card */}
                    <div className="relative">
                        <div className="bg-[#fefae0] rounded-3xl p-8 shadow-2xl max-w-md mx-auto">
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#dda15e]/10 rounded-2xl mb-4">
                                    <Crown className="h-8 w-8 text-[#dda15e]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#283618]">Niveles de Membresia</h3>
                                <p className="text-[#606C38] text-sm">Sube de nivel y desbloquea mas beneficios</p>
                            </div>

                            {/* Levels */}
                            <div className="space-y-3">
                                {levels.map((level, index) => (
                                    <div
                                        key={level.name}
                                        className="flex items-center gap-4 p-3 rounded-xl bg-[#f5f0dc] hover:bg-[#ebe6d0] transition-colors"
                                    >
                                        <div className={`w-10 h-10 ${level.color} rounded-xl flex items-center justify-center`}>
                                            <Crown className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-[#283618]">{level.name}</p>
                                            <p className="text-xs text-[#606C38]">{level.points} puntos</p>
                                        </div>
                                        {index === 0 && (
                                            <span className="text-xs font-semibold text-[#dda15e] bg-[#dda15e]/10 px-2 py-1 rounded-full">
                                                Inicio
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Bonus */}
                            <div className="mt-6 p-4 bg-gradient-to-r from-[#dda15e]/10 to-[#bc6c25]/10 rounded-xl border border-[#dda15e]/20">
                                <div className="flex items-center gap-3">
                                    <Gift className="h-6 w-6 text-[#dda15e]" />
                                    <div>
                                        <p className="font-bold text-[#283618]">Bono de Bienvenida</p>
                                        <p className="text-sm text-[#606C38]">500 AlmaPuntos al registrarte</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative badge */}
                        <div className="absolute -top-4 -right-4 bg-[#dda15e] text-[#283618] rounded-full px-4 py-2 shadow-lg animate-bounce-subtle">
                            <p className="text-sm font-bold">$1 = 1 Punto</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
