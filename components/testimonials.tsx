'use client'

import { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

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
  {
    name: "فاطمة العلي",
    trip: "عطلة في تايلاند",
    text: "خدمة ممتازة من البداية إلى النهاية. الفريق كان متعاوناً جداً وساعدنا في كل شيء. تجربة لن ننساها أبداً.",
  },
  {
    name: "محمود الشمري",
    trip: "رحلة تاريخية لمصر",
    text: "المرشد كان على مستوى عالي جداً ولديه معلومات غزيرة عن كل الأماكن. الفنادق كانت رائعة والأسعار منطقية جداً.",
  },
  {
    name: "ليلى السديري",
    trip: "شهر عسل في المالديف",
    text: "كل شيء كان مثالياً! البرنامج منظم بشكل احترافي والموظفون متعاونون وودودون جداً.",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  
  const itemsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)
  
  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }
  
  const handleNext = () => {
    setCurrent((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }
  
  const startIdx = current * itemsPerPage
  const visibleTestimonials = testimonials.slice(startIdx, startIdx + itemsPerPage)

  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent-foreground">
            آراء عملائنا
          </span>
          <h2 className="font-heading text-3xl font-bold text-balance md:text-4xl">
            قصص نجاح من مسافرينا
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative px-10 md:px-14">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {visibleTestimonials.map((t) => (
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

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card p-2.5 text-foreground/70 shadow-sm transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="السابق"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card p-2.5 text-foreground/70 shadow-sm transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="التالي"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === current
                  ? "w-8 bg-accent"
                  : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`الصفحة ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
