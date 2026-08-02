import { ShieldCheck, Headphones, Wallet, Plane, MapPinned, BadgeCheck } from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "خبرة أكثر من 15 عاماً",
    desc: "نظّمنا آلاف الرحلات الناجحة لعملائنا في مختلف أنحاء آسيا والعالم.",
  },
  {
    icon: Wallet,
    title: "أفضل الأسعار",
    desc: "باقات تنافسية بأعلى جودة، مع خيارات دفع مرنة تناسب ميزانيتك.",
  },
  {
    icon: Headphones,
    title: "دعم على مدار الساعة",
    desc: "فريق خدمة عملاء متكامل يرافقك قبل وأثناء وبعد رحلتك.",
  },
  {
    icon: Plane,
    title: "برامج متكاملة",
    desc: "الطيران، الفنادق، الجولات، والاستقبال في المطار — كل شيء في مكان واحد.",
  },
  {
    icon: MapPinned,
    title: "مرشدون محليون",
    desc: "مرشدون عرب وناطقون بالعربية في أهم الوجهات لتجربة مريحة.",
  },
  {
    icon: BadgeCheck,
    title: "وكالة معتمدة",
    desc: "مرخّصون رسمياً وأعضاء في اتحادات السياحة والسفر الدولية.",
  },
]

export function Features() {
  return (
    <section id="why" className="bg-secondary/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            لماذا المحيط؟
          </span>
          <h2 className="font-heading text-3xl font-bold text-balance md:text-4xl">
            نجعل رحلتك تجربة لا تُنسى
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            نهتم بأدق التفاصيل حتى تستمتع أنت وعائلتك برحلة خالية من المتاعب.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card p-7 transition-all hover:shadow-md"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-bold">{f.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
