import type { Metadata } from 'next'
import { Noto_Kufi_Arabic, Tajawal, Cairo, Amiri, Almarai } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoKufiArabic = Noto_Kufi_Arabic({ 
  subsets: ['arabic'],
  variable: '--font-noto-kufi',
  display: 'swap',
})

const tajawal = Tajawal({ 
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
  display: 'swap',
})

const cairo = Cairo({ 
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
})

const amiri = Amiri({ 
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
})

const almarai = Almarai({ 
  subsets: ['arabic'],
  weight: ['300', '400', '700', '800'],
  variable: '--font-almarai',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'بناء السيرة الذاتية | CV Builder',
  description: 'منصة احترافية لإنشاء السيرة الذاتية باللغة العربية',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
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
      className={`${notoKufiArabic.variable} ${tajawal.variable} ${cairo.variable} ${amiri.variable} ${almarai.variable}`}
    >
      <body className="font-sans antialiased bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
