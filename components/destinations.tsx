'use client'

import { useState } from "react"
import Image from "next/image"
import { MapPin, ArrowLeft } from "lucide-react"
import { DestinationBookingDialog } from "@/components/destination-booking-dialog"

const destinations = [
  { name: "المالديف", en: "Maldives", img: "/dest-maldives.png", trips: 18, tag: "الأكثر طلباً" },
  { name: "ماليزيا", en: "Malaysia", img: "/dest-malaysia.png", trips: 24, tag: null },
  { name: "تايلاند", en: "Thailand", img: "/dest-thailand.png", trips: 21, tag: null },
  { name: "إندونيسيا - بالي", en: "Indonesia", img: "/dest-indonesia.png", trips: 15, tag: null },
  { name: "تركيا", en: "Turkey", img: "/dest-turkey.png", trips: 27, tag: "عروض خاصة" },
  { name: "فيتنام", en: "Vietnam", img: "/dest-vietnam.png", trips: 12, tag: null },
  { name: "سريلانكا", en: "Sri Lanka", img: "/dest-srilanka.png", trips: 10, tag: null },
  { name: "سنغافورة", en: "Singapore", img: "/dest-singapore.png", trips: 14, tag: null },
  { name: "مصر", en: "Egypt", img: "/dest-egypt.png", trips: 16, tag: null },
]

export function Destinations() {
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDestinationClick = (destination: typeof destinations[0]) => {
    setSelectedDestination(destination)
    setDialogOpen(true)
  }

  return (
    <>
      <section id="destinations" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="mb-3 rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent-foreground">
              وجهاتنا السياحية
            </span>
            <h2 className="font-heading text-3xl font-bold text-balance md:text-4xl">
              اكتشف أجمل وجهات آسيا والعالم
            </h2>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              باقات سياحية متكاملة تشمل الطيران والإقامة والجولات، مصممة خصيصاً لتناسب العائلة العربية.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d) => (
              <button
                key={d.en}
                onClick={() => handleDestinationClick(d)}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer text-left"
              >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={d.img || "/placeholder.svg"}
                  alt={`صور من ${d.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
                {d.tag && (
                  <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    {d.tag}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 text-background">
                  <div className="mb-1 flex items-center gap-1.5 text-sm text-background/80">
                    <MapPin className="h-4 w-4" />
                    <span>{d.trips} برنامج سياحي</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl font-bold">{d.name}</h3>
                    <ArrowLeft className="h-5 w-5 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <DestinationBookingDialog
        destination={selectedDestination}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
