import Image from "next/image"
import { ArrowLeft } from "lucide-react"

const tips = [
  {
    img: "/dest-thailand.png",
    cat: "دليل الوجهات",
    title: "أفضل الأوقات لزيارة تايلاند وجزرها الساحرة",
  },
  {
    img: "/dest-malaysia.png",
    cat: "نصائح السفر",
    title: "دليلك الكامل للتسوق والمعالم في كوالالمبور",
  },
  {
    img: "/dest-maldives.png",
    cat: "شهر العسل",
    title: "لماذا المالديف هي الوجهة المثالية لشهر العسل؟",
  },
]

export function TravelTips() {
  return (
    <section id="tips" className="bg-secondary/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex flex-col items-end justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="mb-3 inline-block rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent-foreground">
              نصائح ومقالات
            </span>
            <h2 className="font-heading text-3xl font-bold text-balance md:text-4xl">
              نصائح سياحية لرحلة أفضل
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            كل المقالات
            <ArrowLeft className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tips.map((t) => (
            <a
              key={t.title}
              href="#"
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={t.img || "/placeholder.svg"}
                  alt={t.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-accent-foreground">
                  {t.cat}
                </span>
                <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-pretty transition-colors group-hover:text-primary">
                  {t.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
