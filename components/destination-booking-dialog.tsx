'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog } from '@/components/ui/dialog'
import { MapPin, Sun, Thermometer, Plane, Camera, Star, ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react'

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
    places: { name: string; type: string; img: string; video?: string }[]
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
      { name: 'جزيرة مافوشي', type: 'شاطئ', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=75', video: 'https://www.youtube.com/embed/CPbzt8Qjt3I' },
      { name: 'عاصمة ماليه', type: 'مدينة', img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=75', video: 'https://www.youtube.com/embed/SCQauw5VVDo' },
      { name: 'جزيرة بارو', type: 'منتجع', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=75', video: 'https://www.youtube.com/embed/zQzWzMDZ9Zs' },
      { name: 'راا أتول', type: 'شاطئ', img: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400&q=75', video: 'https://www.youtube.com/embed/iQqxsnB6XIw' },
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
    { name: 'كوالالمبور', type: 'مدينة', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&q=75', video: 'https://www.youtube.com/embed/Xv0velteJnc' },
    { name: 'جزيرة لنكاوي', type: 'شاطئ', img: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=75', video: 'https://www.youtube.com/embed/TLrt5wH6-ew' },
    { name: 'بينانج', type: 'تراث', img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=75', video: 'https://www.youtube.com/embed/SqoozK8twsc' },
    { name: 'كاميرون هايلاندز', type: 'طبيعة', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=75', video: 'https://www.youtube.com/embed/L7mHvwO91TQ' },
  ],
},
 Thailand: {
  description:
    'تايلاند أرض الابتسامة تسحرك بمعابدها الذهبية الباذخة وشواطئها الكريستالية وثقافتها العريقة ومطبخها الشهير عالمياً.',
  climate: 'استوائي حار',
  bestTime: 'نوفمبر – فبراير',
  flightTime: '6.5 ساعة',
  rating: 4.8,
  highlights: ['معابد بوذية', 'شواطئ خلابة', 'الأسوق العائمة', 'سباحة الأفيال'],
  photos: [
    'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=900&q=80',
    'https://images.unsplash.com/photo-1528181304800-259b08848526?w=900&q=80',
    'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=900&q=80',
    'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=900&q=80',
  ],
  places: [
    { name: 'بانكوك', type: 'مدينة', img: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=400&q=75', video: 'https://www.youtube.com/embed/KyC_mKy7Zf8' },
    { name: 'جزيرة بوكيت', type: 'شاطئ', img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&q=75', video: 'https://www.youtube.com/embed/m_pCh6p8_wg' },
    { name: 'شيانغ ماي', type: 'ثقافة', img: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=75', video: 'https://www.youtube.com/embed/tH3Y-0i5jR8' },
    { name: 'كوه ساموي', type: 'شاطئ', img: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=400&q=75', video: 'https://www.youtube.com/embed/5Pe9VO9oShg' },
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
    { name: 'أوبود', type: 'ثقافة', img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=75', video: 'https://www.youtube.com/embed/llxUYanaUsw' },
    { name: 'سيمينياك', type: 'شاطئ', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=75', video: 'https://www.youtube.com/embed/jEhW7oIhrQc' },
    { name: 'معبد تاناه لوت', type: 'تراث', img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=75', video: 'https://www.youtube.com/embed/Zr_uD_knJ3E' },
    { name: 'كوتا', type: 'شاطئ', img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400&q=75', video: 'https://www.youtube.com/embed/iiRv_I6hKKs' },
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
    { name: 'إسطنبول', type: 'مدينة', img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=75', video: 'https://www.youtube.com/embed/lgKJR4EmHSk' },
    { name: 'كبادوكيا', type: 'طبيعة', img: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&q=75', video: 'https://www.youtube.com/embed/gDkNtCp0sLM' },
    { name: 'أنطاليا', type: 'شاطئ', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75', video: 'https://www.youtube.com/embed/seMcqqnbZ5I' },
    { name: 'أفسوس', type: 'تراث', img: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=400&q=75', video: 'https://www.youtube.com/embed/mvPCtrZ1K00' },
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
    '/dest-vietnam.png?w=900&q=80',
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=80',
    'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?w=900&q=80',
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=900&q=80',
  ],
  places: [
    { name: 'خليج هالونج', type: 'طبيعة', img: '/dest-vietnam.png?w=400&q=75', video: 'https://www.youtube.com/embed/XRUw6-GoS24' },
    { name: 'هانوي', type: 'مدينة', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&q=75', video: 'https://www.youtube.com/embed/6yKlTn-LBFU' },
    { name: 'هوشيمن', type: 'مدينة', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=75', video: 'https://www.youtube.com/embed/D7F6pTXmvWw' },
    { name: 'هوي أن', type: 'تراث', img: 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?w=400&q=75', video: 'https://www.youtube.com/embed/owz2JyWMwkE' },
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
    { name: 'كولومبو', type: 'مدينة', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=75', video: 'https://www.youtube.com/embed/Ra4tN35bjbw' },
    { name: 'صخرة سيغيريا', type: 'تراث', img: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=400&q=75', video: 'https://www.youtube.com/embed/uJQz2uWr2E8' },
    { name: 'كاندي', type: 'ثقافة', img: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&q=75', video: 'https://www.youtube.com/embed/h287EIvXTtY' },
    { name: 'إيلا', type: 'طبيعة', img: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=400&q=75', video: 'https://www.youtube.com/embed/Q0TarLx56-c' },
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
    'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=80', 
  ],
  places: [
    { 
      name: 'مارينا باي', 
      type: 'معالم', 
      img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=75', 
      video: 'https://www.youtube.com/embed/3nA0vQWiI28' 
    },
    { 
      name: 'حديقة الطيور', 
      type: 'طبيعة', 
      img: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=75', 
      video: 'https://www.youtube.com/embed/JeJtrrRxE-k' 
    },
    { 
      name: 'سنتوسا', 
      type: 'ترفيه', 
      img: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&q=75', 
      video: 'https://www.youtube.com/embed/3BT-0_dJVwQ' 
    },
    { 
      name: 'شارع العرب', 
      type: 'تراث', 
      img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&q=75', 
      video: 'https://www.youtube.com/embed/PKVnTMUPI3k' 
    },
  ],
},
Egypt: {
  description:
    'مصر أسطورة التاريخ ومهد الحضارات، تجمع بين سحر الأهرامات الخالدة ونهر النيل العظيم وعجائب البحر الأحمر وشوارع القاهرة النابضة بالحياة.',
  climate: 'صحراوي جاف',
  bestTime: 'أكتوبر – أبريل',
  flightTime: '3.5 ساعة',
  rating: 4.7,
  highlights: ['أهرامات الجيزة', 'رحلات النيل', 'الغردقة وشرم الشيخ', 'المتحف المصري الكبير'],
  photos: [
    'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=900&q=80', // القاهرة والأهرامات
    'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=900&q=80', // الأقصر
    'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=900&q=80', // أسوان
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80', // شرم الشيخ
  ],
  places: [
    { 
      name: 'القاهرة والأهرامات', 
      type: 'تراث', 
      img: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=400&q=75', 
      video: 'https://www.youtube.com/embed/BapSQFJPMM0' 
    },
    { 
      name: 'الأقصر', 
      type: 'تاريخ', 
      img: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=400&q=75', 
      video: 'https://www.youtube.com/embed/l_Np9vgYcg0' 
    },
    { 
      name: 'أسوان', 
      type: 'طبيعة', 
      img: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=400&q=75', 
      video: 'https://www.youtube.com/embed/zDUccHozBww' 
    },
    { 
      name: 'شرم الشيخ', 
      type: 'ترفيه', 
      img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=75', 
      video: 'https://www.youtube.com/embed/4AaQkXIAebw' 
    },
  ],
},
China: {
  description:
    'الصين أرض التناقضات المذهلة، تجمع بين سور الصين العظيم والتاريخ الإمبراطوري العريق وناطحات السحاب المستقبلية والمناظر الطبيعية الساحرة.',
  climate: 'متنوع (معتدل إلى قاري)',
  bestTime: 'سبتمبر – نوفمبر',
  flightTime: '9 ساعات',
  rating: 4.7,
  highlights: ['سور الصين العظيم', 'المدينة المحرمة', 'جيش التيراكوتا', 'جبال تشانغجياجيه'],
  photos: [
    'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=900&q=80',
    'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=900&q=80',
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80',
    'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=900&q=80',
  ],
  places: [
    { name: 'بكين', type: 'تاريخ', img: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&q=75', video: 'https://www.youtube.com/embed/1WBTZrJSQZA' },
    { name: 'شانغهاي', type: 'مدينة', img: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400&q=75', video: 'https://www.youtube.com/embed/RqO7uq8_Qsc' },
    { name: 'تشانغجياجيه', type: 'طبيعة', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=75', video: 'https://www.youtube.com/embed/MIWXK7fPRTY' },
    { name: 'شيآن', type: 'تراث', img: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=400&q=75', video: 'https://www.youtube.com/embed/K5ifj5DrtpI' },
  ],
},
Russia: {
  description:
    'روسيا امبراطورية التنوع والحجم الهائل، تجمع بين الساحة الحمراء والقصور الملكية الفخمة وسحر الشفق القطبي وقطار السكك الحديدية العابرة لسيبيريا.',
  climate: 'قاري بارد',
  bestTime: 'مايو – سبتمبر',
  flightTime: '5.5 ساعة',
  rating: 4.6,
  highlights: ['الساحة الحمراء', 'قصر بيترهوف', 'متحف هيرميتاج', 'بحيرة بايكال'],
  photos: [
    'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=900&q=80', // موسكو / الساحة الحمراء
    'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?w=900&q=80', // سانت بطرسبرغ
    'https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=900&q=80', // بحيرة بايكال
    'https://images.unsplash.com/photo-1578637387939-43c525550085?w=900&q=80', // كازان
  ],
  places: [
    { 
      name: 'موسكو', 
      type: 'العاصمة', 
      img: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=400&q=75', 
      video: 'https://www.youtube.com/embed/7TWxSzf-gI8' 
    },
    { 
      name: 'سانت بطرسبرغ', 
      type: 'تراث', 
      img: 'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?w=400&q=75', 
      video: 'https://www.youtube.com/embed/zUEj7cm25XE' 
    },
    { 
      name: 'بحيرة بايكال', 
      type: 'طبيعة', 
      img: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=400&q=75', 
      video: 'https://www.youtube.com/embed/34N5G32791o' 
    },
    { 
      name: 'كازان', 
      type: 'ثقافة', 
      img: 'https://images.unsplash.com/photo-1578637387939-43c525550085?w=400&q=75', 
      video: 'https://www.youtube.com/embed/mGZ8OP1urIs' 
    },
  ],
},
Britain: {
  description:
    'بريطانيا عراقة التاريخ والرقي الملكي، تجمع بين سحر لندن الحديثة والتلال الخضراء الساحرة والقلوع الأثرية والثقافة العريقة.',
  climate: 'معتدل محيطي',
  bestTime: 'مايو – سبتمبر',
  flightTime: '6.5 ساعة',
  rating: 4.7,
  highlights: ['برج ساعة بيغ بن', 'قصر باكنغهام', 'بحيرة لوخ نيس', 'مرتفعات أسط his السكوتلاندية'],
  photos: [
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=80',
    'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=900&q=80',
    'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=900&q=80',
    'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=900&q=80',
  ],
  places: [
    { name: 'لندن', type: 'العاصمة', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=75', video: 'https://www.youtube.com/embed/jmoPo11ktN4' },
    { name: 'إدنبرة', type: 'تراث', img: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=400&q=75', video: 'https://www.youtube.com/embed/SRNyfBRhq0A' },
    { name: 'مانشستر', type: 'مدينة', img: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=400&q=75', video: 'https://www.youtube.com/embed/vGMABqZDGE8' },
    { name: 'أوكسفورد', type: 'ثقافة', img: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=400&q=75', video: 'https://www.youtube.com/embed/pa5JMF-A97E' },
  ],
},

};
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
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

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
        <div className="relative -mx-4 mb-5 h-52 overflow-hidden rounded-t-2xl sm:-mx-6 sm:h-68">
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
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center gap-1 rounded-xl bg-secondary/60 px-2 py-3 text-center">
              <Thermometer className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
              <span className="text-[10px] text-muted-foreground sm:text-xs">المناخ</span>
              <span className="text-xs font-semibold leading-tight sm:text-sm">{info.climate}</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl bg-secondary/60 px-2 py-3 text-center">
              <Sun className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
              <span className="text-[10px] text-muted-foreground sm:text-xs">أفضل وقت</span>
              <span className="text-xs font-semibold leading-tight sm:text-sm">{info.bestTime}</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl bg-secondary/60 px-2 py-3 text-center">
              <Plane className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
              <span className="text-[10px] text-muted-foreground sm:text-xs">وقت الرحلة</span>
              <span className="text-xs font-semibold leading-tight sm:text-sm">{info.flightTime}</span>
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
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {info.places.map((place) => (
                  <button
                    key={place.name}
                    onClick={() => place.video && setSelectedVideo(place.video)}
                    className={`overflow-hidden rounded-xl border border-border bg-card text-left transition-transform hover:scale-105 ${
                      place.video ? 'cursor-pointer' : ''
                    }`}
                  >
                    {/* Place photo */}
                    <div className="relative h-24 w-full sm:h-28">
                      <Image
                        src={place.img}
                        alt={place.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {place.video && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                          <div className="rounded-full bg-white p-2">
                            <svg className="h-5 w-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M5.5 2.5h9l-.8.8v11.4l.8.8h-9l.8-.8V3.3l-.8-.8zm2.4 1.6v10h5.2V4.1h-5.2z M9.8 6.5l4.4 2.5-4.4 2.5V6.5z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Place name + badge */}
                    <div className="flex items-center justify-between gap-1 px-2 py-2 sm:px-3 sm:py-2.5">
                      <span className="truncate text-xs font-medium sm:text-sm">{place.name}</span>
                      <span
                        className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium sm:px-2 sm:text-xs ${
                          placeTypeColors[place.type] ?? 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {place.type}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Video Modal */}
          {selectedVideo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
              <div className="relative w-full max-w-2xl rounded-2xl bg-black">
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute -right-10 -top-10 rounded-full bg-white p-2 text-black transition-opacity hover:opacity-80"
                  aria-label="إغلاق"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="aspect-video w-full">
                  <iframe
                    src={selectedVideo}
                    title="Place Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full rounded-2xl"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Programs CTA */}
          <div className="flex flex-col gap-3 rounded-xl bg-secondary px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <p className="text-sm text-muted-foreground">البرامج المتاحة</p>
              <p className="font-heading text-2xl font-bold text-primary">
                {destination.trips}
                <span className="mr-1 text-base font-medium text-muted-foreground">برنامج سياحي</span>
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
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
