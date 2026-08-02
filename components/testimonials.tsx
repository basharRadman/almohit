import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "أبو محمد العتيبي",
    trip: "رحلة عائلية إلى المالديف",
    text: "تجربة رائعة من البداية للنهاية. التنظيم كان دقيقاً والفندق فاق توقعاتنا. شكراً لفريق المحيط على الاهتمام بكل التفاصيل.",
  },
  {
    name: "سارة الأحمد",
    trip: "شهر عسل في بالي",
    text: "أجمل رحلة شهر عسل ممكن نحلم فيها! الجولات كانت منظمة والمرشد ناطق بالعربية ساعدنا كثيراً. أنصح فيهم بشدة.",
  },
  {
    name: "خالد المنصوري",
    trip: "جولة في ماليزيا وسنغافورة",
    text: "أسعار ممتازة وخدمة احترافية. الدعم كان متواصلاً معنا طوال الرحلة وحلّوا أي مشكلة بسرعة. تعامل راقٍ جداً.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent-foreground">
            آراء عملائنა
          </span>
          <h2 className="font-heading text-3xl font-bold text-balance md:text-4xl">
            قصص نجاح من مسافرينا
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative rounded-2xl border border-border bg-card p-7 shadow-sm"
            >
              <Quote className="mb-4 h-8 w-8 text-accent" />
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="mb-6 leading-relaxed text-foreground/90">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-heading font-bold text-primary">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.trip}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
