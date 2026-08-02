'use client'

import Image from 'next/image'
import { Dialog } from '@/components/ui/dialog'
import { MapPin, Sun, Thermometer, Clock, Plane, Camera, Star, ArrowLeft } from 'lucide-react'

interface DestinationBookingDialogProps {
  destination: {
    name: string
    en: string
    img: string
    trips: number
    tag?: string | null
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Static enrichment data per destination
const destinationData: Record<
  string,
  {
    description: string
    climate: string
    bestTime: string
    flightTime: string
    rating: number
    highlights: string[]
    places: { name: string; type: string }[]
  }
> = {
  Maldives: {
    description:
      'المالديف جنة استوائية في المحيط الهندي تتميز بمياهها الفيروزية الصافية والشعاب المرجانية الخلابة وفنادق الفيلات المائية الفاخرة.',
    climate: 'استوائي دافئ',
    bestTime: 'نوفمبر – أبريل',
    flightTime: '6 ساعات',
    rating: 4.9,
    highlights: ['غوص وسنوركل', 'فيلات مائية', 'غروب الشمس', 'مأكولات بحرية'],
    places: [
      { name: 'جزيرة مافوشي', type: 'شاطئ' },
      { name: 'عاصمة ماليه', type: 'مدينة' },
      { name: 'جزيرة بارو', type: 'منتجع' },
      { name: 'جزيرة راا أتول', type: 'شاطئ' },
    ],
  },
  Malaysia: {
    description:
      'ماليزيا وجهة متنوعة تجمع بين ناطحات السحاب الحديثة وأدغال المطر البكر والشواطئ الاستوائية الساحرة والتراث الثقافي الغني.',
    climate: 'استوائي رطب',
    bestTime: 'مارس – أكتوبر',
    flightTime: '7 ساعات',
    rating: 4.7,
    highlights: ['برج بتروناس', 'غابات المطر', 'المطبخ المتنوع', 'التسوق'],
    places: [
      { name: 'كوالالمبور', type: 'مدينة' },
      { name: 'جزيرة لنكاوي', type: 'شاطئ' },
      { name: 'بينانج', type: 'تراث' },
      { name: 'كاميرون هايلاندز', type: 'طبيعة' },
    ],
  },
  Thailand: {
    description:
      'تايلاند أرض الابتسامة تسحرك بمعابدها الذهبية الباذخة وشواطئها الكريستالية وثقافتها العريقة ومطبخها الشهير عالمياً.',
    climate: 'استوائي حار',
    bestTime: 'نوفمبر – فبراير',
    flightTime: '6.5 ساعة',
    rating: 4.8,
    highlights: ['معابد بوذية', 'شواطئ خلابة', 'الأسواق العائمة', 'سباحة الأفيال'],
    places: [
      { name: 'بانكوك', type: 'مدينة' },
      { name: 'جزيرة بوكيت', type: 'شاطئ' },
      { name: 'شيانغ ماي', type: 'ثقافة' },
      { name: 'جزيرة كوه سامي', type: 'شاطئ' },
    ],
  },
  Indonesia: {
    description:
      'بالي جوهرة إندونيسيا المتاجرة بأرزها المدرجات وهيكلها الهندوسية ومصطبات الأرز الزمردية وشواطئها الرائعة.',
    climate: 'استوائي',
    bestTime: 'أبريل – أكتوبر',
    flightTime: '8 ساعات',
    rating: 4.8,
    highlights: ['حقول الأرز', 'معابد هندوسية', 'تصفح الأمواج', 'العلاج التقليدي'],
    places: [
      { name: 'أوبود', type: 'ثقافة' },
      { name: 'سيمينياك', type: 'شاطئ' },
      { name: 'معبد تاناه لوت', type: 'تراث' },
      { name: 'كوتا', type: 'شاطئ' },
    ],
  },
  Turkey: {
    description:
      'تركيا ملتقى الحضارات تأخذك في رحلة عبر التاريخ بين قباب إسطنبول الزرقاء وتضاريس كبادوكيا الفريدة وشواطئ البحر الأبيض الدافئة.',
    climate: 'معتدل متوسطي',
    bestTime: 'أبريل – يونيو / سبتمبر – نوفمبر',
    flightTime: '3.5 ساعة',
    rating: 4.7,
    highlights: ['المسجد الأزرق', 'بالون الهواء', 'الحمامات التركية', 'المطبخ العثماني'],
    places: [
      { name: 'إسطنبول', type: 'مدينة' },
      { name: 'كبادوكيا', type: 'طبيعة' },
      { name: 'أنطاليا', type: 'شاطئ' },
      { name: 'أفسوس', type: 'تراث' },
    ],
  },
  Vietnam: {
    description:
      'فيتنام كنز آسيا المخفي بتنوعها المذهل من خليج هالونج الأسطوري إلى مدينة هوي أن العريقة ومدرجات موكانشاي الخضراء.',
    climate: 'استوائي موسمي',
    bestTime: 'فبراير – أبريل',
    flightTime: '7 ساعات',
    rating: 4.6,
    highlights: ['خليج هالونج', 'مدينة هوي أن', 'مدرجات الأرز', 'المطبخ الشهير'],
    places: [
      { name: 'خليج هالونج', type: 'طبيعة' },
      { name: 'هانوي', type: 'مدينة' },
      { name: 'هوشيمن', type: 'مدينة' },
      { name: 'هوي أن', type: 'تراث' },
    ],
  },
  'Sri Lanka': {
    description:
      'سريلانكا الجوهرة في المحيط الهندي تقدم مزيجاً فريداً من الشواطئ الذهبية والغابات المطيرة ومزارع الشاي الخضراء والمعابد البوذية الروحية.',
    climate: 'استوائي رطب',
    bestTime: 'ديسمبر – مارس',
    flightTime: '5 ساعات',
    rating: 4.5,
    highlights: ['الصخرة الأسدية', 'مزارع الشاي', 'سفاري الأفيال', 'معابد بوذية'],
    places: [
      { name: 'كولومبو', type: 'مدينة' },
      { name: 'صخرة سيغيريا', type: 'تراث' },
      { name: 'كاندي', type: 'ثقافة' },
      { name: 'إيلا', type: 'طبيعة' },
    ],
  },
  Singapore: {
    description:
      'سنغافورة مدينة المستقبل حيث تلتقي ناطحات السحاب بالحدائق الخضراء والمطبخ العالمي والتجارب الترفيهية الأكثر إبهاراً في آسيا.',
    climate: 'استوائي معتدل',
    bestTime: 'طوال العام',
    flightTime: '7.5 ساعة',
    rating: 4.8,
    highlights: ['حدائق الشجرة', 'أوركيد جاردن', 'مارينا باي', 'يونيفرسال ستوديوز'],
    places: [
      { name: 'مارينا باي', type: 'معالم' },
      { name: 'حديقة الطيور', type: 'طبيعة' },
      { name: 'سنتوسا', type: 'ترفيه' },
      { name: 'شارع العرب', type: 'تراث' },
    ],
  },
}

const placeTypeColors: Record<string, string> = {
  شاطئ: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  مدينة: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  طبيعة: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  تراث: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  ثقافة: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  منتجع: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  معالم: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  ترفيه: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
}

export function DestinationBookingDialog({
  destination,
  open,
  onOpenChange,
}: DestinationBookingDialogProps) {
  if (!destination) return null

  const info = destinationData[destination.en] ?? {
    description: `${destination.name} وجهة سياحية رائعة تضم ${destination.trips} برنامجاً سياحياً متنوعاً يناسب جميع الأذواق والميزانيات.`,
    climate: 'معتدل',
    bestTime: 'طوال العام',
    flightTime: 'يتفاوت',
    rating: 4.5,
    highlights: ['طبيعة خلابة', 'ثقافة غنية', 'مأكولات شهية', 'تجارب فريدة'],
    places: [],
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="space-y-0">
        {/* Hero Image — full bleed, flush to dialog edges, above the padded body */}
        <div className="relative -mx-5 -mt-0 mb-5 h-56 overflow-hidden rounded-t-2xl sm:-mx-7 sm:h-72">
          <Image
            src={destination.img || '/placeholder.svg'}
            alt={`صور من ${destination.name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {destination.tag && (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground shadow">
              {destination.tag}
            </span>
          )}

          {/* Title block at bottom of hero */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="mb-1.5 flex items-center gap-1.5 text-xs text-white/75">
              <MapPin className="h-3.5 w-3.5" />
              <span>{destination.en}</span>
            </div>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-heading text-2xl font-bold text-white text-balance sm:text-3xl">
                {destination.name}
              </h2>
              <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                <span className="text-sm font-semibold text-white">{info.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 pb-2">
          {/* Quick stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-1 rounded-xl bg-secondary/60 px-3 py-3 text-center">
              <Thermometer className="h-5 w-5 text-primary" />
              <span className="text-xs text-muted-foreground">المناخ</span>
              <span className="text-sm font-semibold leading-tight">{info.climate}</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl bg-secondary/60 px-3 py-3 text-center">
              <Sun className="h-5 w-5 text-accent" />
              <span className="text-xs text-muted-foreground">أفضل وقت</span>
              <span className="text-sm font-semibold leading-tight">{info.bestTime}</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl bg-secondary/60 px-3 py-3 text-center">
              <Plane className="h-5 w-5 text-primary" />
              <span className="text-xs text-muted-foreground">وقت الرحلة</span>
              <span className="text-sm font-semibold leading-tight">{info.flightTime}</span>
            </div>
          </div>

          {/* Description */}
          <p className="leading-relaxed text-muted-foreground text-pretty">
            {info.description}
          </p>

          {/* Highlights */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-heading text-base font-bold">
              <Camera className="h-4 w-4 text-primary" />
              أبرز المميزات
            </h3>
            <div className="flex flex-wrap gap-2">
              {info.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Tourist places */}
          {info.places.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-heading text-base font-bold">
                <MapPin className="h-4 w-4 text-primary" />
                أبرز الأماكن السياحية
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {info.places.map((place) => (
                  <div
                    key={place.name}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-3"
                  >
                    <span className="font-medium">{place.name}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        placeTypeColors[place.type] ?? 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {place.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Programs count + CTA */}
          <div className="flex items-center justify-between rounded-xl bg-secondary px-5 py-4">
            <div>
              <p className="text-sm text-muted-foreground">البرامج المتاحة</p>
              <p className="font-heading text-2xl font-bold text-primary">
                {destination.trips}
                <span className="mr-1 text-base font-medium text-muted-foreground">برنامج سياحي</span>
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              استعرض البرامج
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
