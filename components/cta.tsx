import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PhoneCall, MessageCircle } from "lucide-react"

export function CTA() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src="/cta-beach.png"
            alt="عائلة تستمتع بعطلة على الشاطئ عند الغروب"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
          <div className="relative flex flex-col items-center px-6 py-16 text-center text-primary-foreground md:py-24">
            <h2 className="max-w-2xl font-heading text-3xl font-bold text-balance md:text-4xl">
              جاهز لبدء مغامرتك القادمة؟
            </h2>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-primary-foreground/85">
              تواصل معنا اليوم واحصل على عرض سعر مخصص لرحلتك خلال دقائق. فريقنا في انتظارك.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                nativeButton={false}
                className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                render={
                  <a href="https://wa.me/905000000000" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    تواصل عبر واتساب
                  </a>
                }
              />
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                className="gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                render={
                  <a href="tel:+905000000000">
                    <PhoneCall className="h-5 w-5" />
                    اتصل بنا الآن
                  </a>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
