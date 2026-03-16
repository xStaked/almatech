"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Gift, CheckCircle2, Sparkles, PawPrint } from "lucide-react"

export function Newsletter() {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
        setIsSubmitted(true)
    }

    return (
        <section className="py-16 bg-[#fefae0] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-50">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#dda15e]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#606C38]/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            </div>

            {/* Floating paw prints */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <PawPrint className="absolute top-8 left-[15%] h-6 w-6 text-[#dda15e]/20 rotate-12" />
                <PawPrint className="absolute top-1/2 right-[10%] h-8 w-8 text-[#606C38]/15 -rotate-12" />
                <PawPrint className="absolute bottom-12 left-[25%] h-5 w-5 text-[#dda15e]/25 rotate-45" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto">
                    {/* Card */}
                    <div className="bg-card rounded-3xl shadow-xl border border-border p-8 md:p-12">
                        {!isSubmitted ? (
                            <>
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#dda15e]/10 rounded-2xl mb-6">
                                        <Mail className="h-8 w-8 text-[#dda15e]" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                                        Unete a la Familia Almatech
                                    </h2>
                                    <p className="text-muted-foreground max-w-md mx-auto">
                                        Recibe ofertas exclusivas, tips de cuidado para mascotas y novedades
                                        directo en tu correo.
                                    </p>
                                </div>

                                {/* Bonus badge */}
                                <div className="flex items-center justify-center gap-2 mb-8">
                                    <div className="bg-[#dda15e]/10 border border-[#dda15e]/20 rounded-full px-4 py-2 flex items-center gap-2">
                                        <Gift className="h-5 w-5 text-[#dda15e]" />
                                        <span className="font-semibold text-[#283618]">Gana 500 AlmaPuntos</span>
                                        <span className="text-muted-foreground text-sm">al suscribirte</span>
                                    </div>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            type="email"
                                            placeholder="tucorreo@ejemplo.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-12 h-14 text-base rounded-xl border-border bg-background"
                                            required
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="bg-[#283618] hover:bg-[#3a4a28] text-[#fefae0] font-semibold h-14 px-8 rounded-xl"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <div className="h-5 w-5 border-2 border-[#fefae0]/30 border-t-[#fefae0] rounded-full animate-spin" />
                                                Enviando...
                                            </span>
                                        ) : (
                                            "Suscribirme"
                                        )}
                                    </Button>
                                </form>

                                {/* Trust text */}
                                <p className="text-center text-xs text-muted-foreground mt-6">
                                    Sin spam. Puedes darte de baja en cualquier momento. Lee nuestra{" "}
                                    <a href="/privacidad" className="underline hover:text-foreground">
                                        politica de privacidad
                                    </a>.
                                </p>
                            </>
                        ) : (
                            /* Success state */
                            <div className="text-center py-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-3">
                                    Bienvenido a la familia!
                                </h3>
                                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                    Hemos enviado un correo de confirmacion a <span className="font-semibold text-foreground">{email}</span>.
                                    Revisa tu bandeja de entrada para activar tus 500 AlmaPuntos.
                                </p>
                                <div className="inline-flex items-center gap-2 bg-[#dda15e]/10 text-[#bc6c25] px-4 py-2 rounded-full font-semibold">
                                    <Sparkles className="h-5 w-5" />
                                    +500 AlmaPuntos pendientes de activacion
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Benefits below */}
                    <div className="grid grid-cols-3 gap-6 mt-8 text-center">
                        <div>
                            <p className="text-2xl font-bold text-[#283618]">10%</p>
                            <p className="text-sm text-muted-foreground">Descuento primera compra</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[#283618]">500+</p>
                            <p className="text-sm text-muted-foreground">AlmaPuntos de regalo</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[#283618]">VIP</p>
                            <p className="text-sm text-muted-foreground">Acceso anticipado ofertas</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
