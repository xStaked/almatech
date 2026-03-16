import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { StatsCounter } from "@/components/stats-counter"
import { SocialCause } from "@/components/social-cause"
import { Categories } from "@/components/categories"
import { Products } from "@/components/products"
import { AlmaPuntosBanner } from "@/components/almapuntos-banner"
import { Benefits } from "@/components/benefits"
import { Testimonials } from "@/components/testimonials"
import { AffiliateCTA } from "@/components/affiliate-cta"
import { Footer } from "@/components/footer"
import { PromoBanner } from "@/components/promo-banner"
import { InstagramFeed } from "@/components/instagram-feed"
import { Newsletter } from "@/components/newsletter"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Header />
      <main>
        <Hero />
        <StatsCounter />
        <SocialCause />
        <Categories />
        <Products />
        <AlmaPuntosBanner />
        <Benefits />
        <Testimonials />
        <InstagramFeed />
        <Newsletter />
        <AffiliateCTA />
      </main>
      <Footer />
    </div>
  )
}
