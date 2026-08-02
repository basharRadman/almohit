const stats = [
  { value: "+15", label: "عاماً من الخبرة" },
  { value: "+25", label: "وجهة سياحية" },
  { value: "+50", label: "ألف مسافر سعيد" },
  { value: "%98", label: "نسبة رضا العملاء" },
]

export function Stats() {
  return (
    <section className="border-y border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-heading text-4xl font-bold md:text-5xl">{s.value}</div>
            <div className="mt-2 text-sm text-primary-foreground/80 md:text-base">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
