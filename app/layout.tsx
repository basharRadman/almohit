import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cairo, Tajawal } from 'next/font/google'
import './globals.css'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-cairo',
})

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal',
})

export const metadata: Metadata = {
  title: 'شركة المحيط للسياحة والسفر | Almohit Travel and Tours',
  description:
    'شركة المحيط للسياحة والسفر — باكجات سياحية متكاملة، حجوزات طيران وفنادق، وجولات خاصة إلى ماليزيا وتايلاند والمالديف وأجمل وجهات آسيا والعالم بأفضل الأسعار.',
  generator: 'v0.app',
  keywords: [
    'سياحة',
    'سفر',
    'ماليزيا',
    'تايلاند',
    'المالديف',
    'باكجات سياحية',
    'حجز فنادق',
    'المحيط للسياحة',
  ],
}

export const viewport: Viewport = {
  themeColor: '#0a6a72',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${tajawal.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
