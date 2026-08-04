'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog } from '@/components/ui/dialog'
import { MapPin, Sun, Thermometer, Plane, Camera, Star, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'

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

const destinationData: Record<
  string,
  {
    description: string
    climate: string
    bestTime: string
    flightTime: string
    rating: number
    highlights: string[]
    photos: string[]
    places: { name: string; type: string; img: string }[]
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
    photos: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=80',
      'https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=900&q=80',
      'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=900&q=80',
    ],
    places: [
      { name: 'جزيرة مافوشي', type: 'شاطئ', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=75' },
      { name: 'عاصمة ماليه', type: 'مدينة', img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=75' },
      { name: 'جزيرة بارو', type: 'منتجع', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=75' },
      { name: 'راا أتول', type: 'شاطئ', img: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400&q=75' },
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
    photos: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=900&q=80',
      'https://images.unsplash.com/photo-1529307474719-3d0a417aaf8a?w=900&q=80',
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=900&q=80',
      'https://images.unsplash.com/photo-1617634038836-35b36ec06e64?w=900&q=80',
    ],
    places: [
      { name: 'كوالالمبور', type: 'مدينة', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&q=75' },
      { name: 'جزيرة لنكاوي', type: 'شاطئ', img: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=75' },
      { name: 'بينانج', type: 'تراث', img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=75' },
      { name: 'كاميرون هايلاندز', type: 'طبيعة', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=75' },
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
    photos: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=900&q=80',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=900&q=80',
      'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=900&q=80',
      'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=900&q=80',
    ],
    places: [
      { name: 'بانكوك', type: 'مدينة', img: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=400&q=75' },
      { name: 'جزيرة بوكيت', type: 'شاطئ', img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&q=75' },
      { name: 'شيانغ ماي', type: 'ثقافة', img: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=75' },
      { name: 'كوه سامي', type: 'شاطئ', img: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=400&q=75' },
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
    photos: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=900&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=900&q=80',
      'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&q=80',
    ],
    places: [
      { name: 'أوبود', type: 'ثقافة', img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=75' },
      { name: 'سيمينياك', type: 'شاطئ', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=75' },
      { name: 'معبد تاناه لوت', type: 'تراث', img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=75' },
      { name: 'كوتا', type: 'شاطئ', img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400&q=75' },
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
    photos: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=900&q=80',
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=900&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
    ],
    places: [
      { name: 'إسطنبول', type: 'مدينة', img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=75' },
      { name: 'كبادوكيا', type: 'طبيعة', img: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&q=75' },
      { name: 'أنطاليا', type: 'شاطئ', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75' },
      { name: 'أفسوس', type: 'تراث', img: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=400&q=75' },
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
    photos: [
      'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=900&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=80',
      'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?w=900&q=80',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=900&q=80',
    ],
    places: [
      { name: 'خليج هالونج', type: 'طبيعة', img: 'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=400&q=75' },
      { name: 'هانوي', type: 'مدينة', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&q=75' },
      { name: 'هوشيمن', type: 'مدينة', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=75' },
      { name: 'هوي أن', type: 'تراث', img: 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?w=400&q=75' },
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
    photos: [
      'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=900&q=80',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=900&q=80',
      'https://images.unsplash.com/photo-1516690553959-fc2bdb7e5c29?w=900&q=80',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&q=80',
    ],
    places: [
      { name: 'كولومبو', type: 'مدينة', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=75' },
      { name: 'صخرة سيغيريا', type: 'تراث', img: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=400&q=75' },
      { name: 'كاندي', type: 'ثقافة', img: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&q=75' },
      { name: 'إيلا', type: 'طبيعة', img: 'https://images.unsplash.com/photo-1516690553959-fc2bdb7e5c29?w=400&q=75' },
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
    photos: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=900&q=80',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=900&q=80',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=900&q=80',
      'https://images.unsplash.com/photo-1559628233-100c798642d5?w=900&q=80',
    ],
    places: [
      { name: 'مارينا باي', type: 'معالم', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=75' },
      { name: 'حديقة الطيور', type: 'طبيعة', img: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=400&q=75' },
      { name: 'سنتوسا', type: 'ترفيه', img: 'https://images.unsplash.com/photo-1559628233-100c798642d5?w=400&q=75' },
      { name: 'شارع العرب', type: 'تراث', img: 'https://images.unsplash.com/photo-1569596082827-c5e8987ef9c4?w=400&q=75' },
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
  const [heroIndex, setHeroIndex] = useState(0)

  if (!destination) return null

  const info = destinationData[destination.en] ?? {
    description: `${destination.name} وجهة سياحية رائعة تضم ${destination.trips} برنامجاً سياحياً متنوعاً يناسب جميع الأذواق والميزانيات.`,
    climate: 'معتدل',
    bestTime: 'طوال العام',
    flightTime: 'يتفاوت',
    rating: 4.5,
    highlights: ['طبيعة خلابة', 'ثقافة غنية', 'مأكولات شهية', 'تجارب فريدة'],
    photos: [destination.img],
    places: [],
  }

  const photos = info.photos.length > 0 ? info.photos : [destination.img]
  const total = photos.length

  const prevPhoto = () => setHeroIndex((i) => (i === 0 ? total - 1 : i - 1))
  const nextPhoto = () => setHeroIndex((i) => (i === total - 1 ? 0 : i + 1))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="space-y-0">

        {/* Hero Photo Slider */}
        <div className="relative -mx-5 mb-5 h-56 overflow-hidden rounded-t-2xl sm:-mx-7 sm:h-72">
          {photos.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt={`${destination.name} - صورة ${idx + 1}`}
              fill
              priority={idx === 0}
              className={`object-cover transition-opacity duration-500 ${
                idx === heroIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Prev / Next arrows */}
          {total > 1 && (
            <>
              <button
                onClick={nextPhoto}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                aria-label="الصورة السابقة"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={prevPhoto}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                aria-label="الصورة التالية"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </>
          )}

          {/* Badge */}
          {destination.tag && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground shadow">
              {destination.tag}
            </span>
          )}

          {/* Title + dots */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="mb-1.5 flex items-center gap-1.5 text-xs text-white/75">
              <MapPin className="h-3.5 w-3.5" />
              <span>{destination.en}</span>
            </div>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-heading text-2xl font-bold text-balance text-white sm:text-3xl">
                {destination.name}
              </h2>
              <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                <span className="text-sm font-semibold text-white">{info.rating}</span>
              </div>
            </div>

            {/* Dot indicators */}
            {total > 1 && (
              <div className="mt-3 flex gap-1.5">
                {photos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeroIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === heroIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
                    }`}
                    aria-label={`الصورة ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 pb-2">
          {/* Quick stats */}
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
          <p className="leading-relaxed text-pretty text-muted-foreground">
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

          {/* Tourist places with photos */}
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
                    className="overflow-hidden rounded-xl border border-border bg-card"
                  >
                    {/* Place photo */}
                    <div className="relative h-28 w-full">
                      <Image
                        src={place.img}
                        alt={place.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    {/* Place name + badge */}
                    <div className="flex items-center justify-between px-3 py-2.5">
                      <span className="text-sm font-medium">{place.name}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          placeTypeColors[place.type] ?? 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {place.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Programs CTA */}
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
