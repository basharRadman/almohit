'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, Users, Mail, Phone } from 'lucide-react'

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

export function DestinationBookingDialog({
  destination,
  open,
  onOpenChange,
}: DestinationBookingDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfPeople: '',
    preferredDate: '',
    notes: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Booking request:', { destination: destination?.name, ...formData })
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onOpenChange(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        numberOfPeople: '',
        preferredDate: '',
        notes: '',
      })
    }, 2000)
  }

  if (!destination) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="space-y-6">
        {/* Destination Image Card - Enhanced Design */}
        <div className="relative -mx-6 -mt-8 mb-6 overflow-hidden rounded-2xl">
          <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-white via-gray-100 to-slate-700">
            <Image
              src={destination.img || '/placeholder.svg'}
              alt={`صور من ${destination.name}`}
              fill
              className="object-cover opacity-100"
            />
            {/* Gradient Overlay - White fade to dark */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/70" />
            
            {/* Most Popular Badge */}
            {destination.tag && (
              <span className="absolute right-4 top-4 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground shadow-md">
                {destination.tag}
              </span>
            )}
            
            {/* Bottom Content */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 text-white">
              <div className="mb-3 flex items-center gap-2 text-sm text-white/90">
                <MapPin className="h-4 w-4" />
                <span>{destination.trips} برنامج سياحي</span>
              </div>
              <h2 className="font-heading text-3xl font-bold text-white text-balance">
                {destination.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Destination Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">الدولة</div>
              <div className="font-semibold">{destination.en}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">البرامج المتاحة</div>
              <div className="font-semibold">{destination.trips} برنامج</div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="rounded-lg bg-green-50 p-4 text-center">
            <p className="font-semibold text-green-900">
              شكراً لك! تم استقبال طلبك بنجاح
            </p>
            <p className="text-sm text-green-800">سيتم التواصل معك قريباً</p>
          </div>
        )}

        {!submitted && (
          <>
            <div className="border-t pt-6">
              <h3 className="mb-4 font-heading text-lg font-bold">
                اطلب عرضك السياحي
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="أدخل اسمك الكامل"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-right placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="example@email.com"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-right placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+966501234567"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-right placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Number of People */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    عدد الأشخاص
                  </label>
                  <select
                    name="numberOfPeople"
                    value={formData.numberOfPeople}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-right focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">اختر عدد الأشخاص</option>
                    <option value="1">شخص واحد</option>
                    <option value="2-3">شخصان إلى ثلاثة</option>
                    <option value="4-6">4 إلى 6 أشخاص</option>
                    <option value="7+">7 أشخاص فأكثر</option>
                  </select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    التاريخ المفضل للسفر
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-right focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    ملاحظات إضافية (اختياري)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="أخبرنا عن احتياجاتك الخاصة..."
                    rows={3}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-right placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <span>إرسال طلب الحجز</span>
                </Button>
              </form>
            </div>
          </>
        )}
      </div>
    </Dialog>
  )
}
