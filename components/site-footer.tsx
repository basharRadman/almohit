import { Compass, Mail, Phone, MapPin } from "lucide-react"

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-7.3 8.3L23 22h-6.8l-5.3-6.9L4.8 22H1.7l7.8-8.9L1 2h7l4.8 6.3L18.9 2Zm-2.4 18h1.9L7.6 4H5.6l10.9 16Z" />
    </svg>
  )
}

const socials = [
  { label: "فيسبوك", icon: FacebookIcon },
  { label: "إنستغرام", icon: InstagramIcon },
  { label: "منصة إكس", icon: XIcon },
]

const destinationLinks = ["المالديف", "ماليزيا", "تايلاند", "تركيا", "إندونيسيا", "سنغافورة"]
const companyLinks = ["من نحن", "خدماتنا", "المدونة", "الوظائف", "تواصل معنا"]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Compass className="h-6 w-6" />
              </div>
              <div className="font-heading text-lg font-bold leading-tight">
                المحيط
                <span className="block text-xs font-normal text-muted-foreground">للسياحة والسفر</span>
              </div>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              شريكك الموثوق لاكتشاف أجمل وجهات آسيا والعالم برحلات مصممة خصيصاً لك.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={s.label}
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-heading font-bold">الوجهات</h4>
            <ul className="space-y-2.5">
              {destinationLinks.map((l) => (
                <li key={l}>
                  <a href="#destinations" className="text-muted-foreground transition-colors hover:text-primary">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading font-bold">الشركة</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l}>
                  <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading font-bold">تواصل معنا</h4>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span dir="ltr">+90 500 000 0000</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span dir="ltr">info@m-arabi.com</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>إسطنبول، تركيا</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()} شركة المحيط للسياحة والسفر
        </div>
      </div>
    </footer>
  )
}
