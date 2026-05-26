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
 description:
    'منصة مجانية لإنشاء سيرة ذاتية احترافية باللغة العربية والإنجليزية، مقدمة من مؤسسة نخلة لتنمية ورعاية الأمومة والطفولة.',
   generator: 'EDU-NAKHLA',
     keywords: [
    'CV',
    'Resume',
    'سيرة ذاتية',
    'بناء السيرة الذاتية',
    'CV Builder',
    'Nakhla Foundation',
  ],
  openGraph: {
    title: 'منصة بناء السيرة الذاتية',
    description: 'أنشئ سيرتك الذاتية بالعربية أو الإنجليزية خلال دقائق.',
    url: 'https://servicecv.edu-web.fr',
    siteName: 'CV Builder',
    images: ['/opengraph-image.png'],
    locale: 'ar_AR',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/logo.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/logo.png',
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
