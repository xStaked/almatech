import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { SocialCause } from "@/components/social-cause"
import { Categories } from "@/components/categories"
import { Products } from "@/components/products"
import { Benefits } from "@/components/benefits"
import { Testimonials } from "@/components/testimonials"
import { AffiliateCTA } from "@/components/affiliate-cta"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <SocialCause />
        <Categories />
        <Products />
        <Benefits />
        <Testimonials />
        <AffiliateCTA />
      </main>
      <Footer />
    </div>
  )
}
