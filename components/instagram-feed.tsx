"use client"

import { useState } from "react"
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const instagramPosts = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
        likes: 234,
        comments: 18,
        username: "@maria_y_toby",
        caption: "Toby ya lleva 3 meses con Silygran-Pro y su higado esta mucho mejor!",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop",
        likes: 189,
        comments: 12,
        username: "@gatitos_felices",
        caption: "Luna usando Nano-Lyptus para su gripe, se recupero en 5 dias",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=400&h=400&fit=crop",
        likes: 312,
        comments: 24,
        username: "@carlos_pets",
        caption: "Mi golden retriever Max ama los productos de Almatech!",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop",
        likes: 156,
        comments: 9,
        username: "@veterinaria_dr_lopez",
        caption: "Recomiendo Almatech a todos mis pacientes. Nanotecnologia real!",
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop",
        likes: 421,
        comments: 31,
        username: "@patitas_sanas",
        caption: "Rocky y Luna despues de su tratamiento. Gracias Almatech!",
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=400&fit=crop",
        likes: 278,
        comments: 15,
        username: "@miau_mundo",
        caption: "Simba probando el nuevo producto. Le encanto!",
    },
]

export function InstagramFeed() {
    const [hoveredPost, setHoveredPost] = useState<number | null>(null)

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <Instagram className="h-4 w-4" />
                        @almatech_pets
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Nuestra Comunidad en Instagram
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Miles de mascotas felices comparten sus experiencias con Almatech.
                        Usa el hashtag <span className="text-[#dda15e] font-semibold">#AlmatechPets</span> para aparecer aqui.
                    </p>
                </div>

                {/* Instagram Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                    {instagramPosts.map((post) => (
                        <div
                            key={post.id}
                            className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                            onMouseEnter={() => setHoveredPost(post.id)}
                            onMouseLeave={() => setHoveredPost(null)}
                        >
                            <Image
                                src={post.image}
                                alt={post.caption}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className={`absolute inset-0 bg-[#283618]/70 flex flex-col items-center justify-center transition-opacity duration-300 ${hoveredPost === post.id ? 'opacity-100' : 'opacity-0'
                                }`}>
                                <div className="flex items-center gap-4 text-white mb-3">
                                    <div className="flex items-center gap-1">
                                        <Heart className="h-5 w-5 fill-current" />
                                        <span className="font-semibold">{post.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageCircle className="h-5 w-5" />
                                        <span className="font-semibold">{post.comments}</span>
                                    </div>
                                </div>
                                <p className="text-white/80 text-xs font-medium">{post.username}</p>
                            </div>

                            {/* Corner badge */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Instagram className="h-5 w-5 text-white drop-shadow-lg" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-10">
                    <Link href="https://instagram.com/almatech_pets" target="_blank" rel="noopener noreferrer">
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-[#283618] text-[#283618] hover:bg-[#283618] hover:text-[#fefae0] font-semibold"
                        >
                            <Instagram className="mr-2 h-5 w-5" />
                            Siguenos en Instagram
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
