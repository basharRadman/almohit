import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Destinations } from "@/components/destinations"
import { Features } from "@/components/features"
import { Stats } from "@/components/stats"
import { Services } from "@/components/services"
import { Testimonials } from "@/components/testimonials"
import { TravelTips } from "@/components/travel-tips"
import { CTA } from "@/components/cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <Destinations />
      <Stats />
      <Services />
      <Features />
      <Testimonials />
      <TravelTips />
      <CTA />
      <SiteFooter />
    </main>
  )
}
