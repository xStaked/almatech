"use client"

import { Heart, PawPrint } from "lucide-react"

export function SocialCause() {
  return (
    <section className="py-8 bg-muted/50 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="h-5 w-5 text-secondary fill-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">5% de cada compra</span> se dona a fundaciones de rescate animal
              </p>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-8 bg-border" />
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <PawPrint className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Apoyamos a <span className="font-semibold text-foreground">+15 refugios</span> en Colombia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
