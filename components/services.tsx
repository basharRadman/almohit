import { Plane, Hotel, Map, FileCheck, Car, Ship } from "lucide-react"

const services = [
  { icon: Plane, title: "حجوزات الطيران", desc: "أفضل أسعار التذاكر على مختلف الخطوط العالمية." },
  { icon: Hotel, title: "حجز الفنادق", desc: "فنادق ومنتجعات مختارة بعناية لكل الميزانيات." },
  { icon: Map, title: "جولات سياحية", desc: "برامج جولات يومية مع مرشدين ناطقين بالعربية." },
  { icon: FileCheck, title: "خدمات التأشيرات", desc: "مساعدة كاملة في استخراج تأشيرات السفر." },
  { icon: Car, title: "النقل والمواصلات", desc: "استقبال في المطار وسيارات خاصة مع سائق." },
  { icon: Ship, title: "رحلات بحرية", desc: "رحلات يخوت وكروز إلى الجزر والوجهات الساحلية." },
]

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            خدماتنا
          </span>
          <h2 className="font-heading text-3xl font-bold text-balance md:text-4xl">
            كل ما تحتاجه لرحلة مثالية
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-1.5 font-heading text-lg font-bold">{s.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
