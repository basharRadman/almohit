import { MapPin, Plane, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "+15", label: "سنة خبرة" },
  { value: "+12", label: "وجهة سياحية" },
  { value: "+50k", label: "مسافر سعيد" },
]

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden">
      <img
        src="/hero-tropical.png"
        alt="جزيرة استوائية بمياه فيروزية عند غروب الشمس"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.22_0.03_220_/_0.85)] via-[oklch(0.22_0.03_220_/_0.45)] to-[oklch(0.22_0.03_220_/_0.55)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-16 pt-28 md:px-6">
        <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
          <Star className="h-4 w-4 fill-accent text-accent" />
          وجهتك الأولى لسياحة شرق آسيا والعالم
        </span>

        <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-tight text-white text-balance md:text-6xl">
          اكتشف العالم مع شركة المحيط للسياحة والسفر
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85 text-pretty">
          باكجات سياحية متكاملة، حجوزات طيران وفنادق، وجولات خاصة بأفضل الأسعار
          إلى ماليزيا وتايلاند والمالديف وأجمل وجهات العالم.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button
            size="lg"
            className="rounded-full bg-accent px-8 text-base font-bold text-accent-foreground shadow-lg hover:bg-accent/90"
          >
            <Plane className="h-5 w-5" />
            احجز رحلتك الآن
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            className="rounded-full border-white/40 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur hover:bg-white/20 hover:text-white"
            render={
              <a href="#destinations">
                <MapPin className="h-5 w-5" />
                تصفّح الوجهات
              </a>
            }
          />
        </div>

        <dl className="mt-14 flex max-w-lg flex-wrap gap-x-10 gap-y-6">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="font-heading text-3xl font-extrabold text-white md:text-4xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-sm text-white/75">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
