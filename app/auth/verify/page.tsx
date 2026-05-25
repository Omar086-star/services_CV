// app/auth/verify/page.tsx

import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MailCheck } from 'lucide-react'

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{
    email?: string
    lang?: string
  }>
}) {
  const params = await searchParams

  const email = params.email
  const lang = params.lang === 'en' ? 'en' : 'ar'
  const isEn = lang === 'en'

  return (
    <div
      dir={isEn ? 'ltr' : 'rtl'}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-4"
    >
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <Link href="/auth/verify?lang=ar">
          <Button variant="outline" size="sm">
            🇸🇦 العربية
          </Button>
        </Link>

        <Link href="/auth/verify?lang=en">
          <Button variant="outline" size="sm">
            🇺🇸 English
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
            <MailCheck className="w-8 h-8 text-primary-foreground" />
          </div>

          <CardTitle className="text-2xl">
            {isEn
              ? 'Verify your email'
              : 'تحقق من بريدك الإلكتروني'}
          </CardTitle>

          <CardDescription>
            {isEn
              ? 'We sent a verification link to:'
              : 'أرسلنا رابط التحقق إلى:'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {email && (
            <p
              className="font-medium text-primary break-all"
              dir="ltr"
            >
              {email}
            </p>
          )}

          <p className="text-sm text-muted-foreground">
            {isEn
              ? 'Open your email and click the activation link to complete your registration.'
              : 'افتح بريدك الإلكتروني واضغط على رابط التفعيل لإكمال إنشاء الحساب.'}
          </p>

          <Link
            href={`/auth/login?lang=${lang}`}
            className="inline-block"
          >
            <Button>
              {isEn
                ? 'Back to login'
                : 'العودة إلى تسجيل الدخول'}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}