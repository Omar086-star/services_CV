// app/auth/verify/page.tsx

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MailCheck } from 'lucide-react'

export default function VerifyPage({
  searchParams,
}: {
  searchParams: { email?: string }
}) {
  const email = searchParams.email

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-4" dir="rtl">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
            <MailCheck className="w-8 h-8 text-primary-foreground" />
          </div>

          <CardTitle className="text-2xl">
            تحقق من بريدك الإلكتروني
          </CardTitle>

          <CardDescription>
            أرسلنا رابط التحقق إلى:
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {email && (
            <p className="font-medium text-primary break-all" dir="ltr">
              {email}
            </p>
          )}

          <p className="text-sm text-muted-foreground">
            افتح بريدك الإلكتروني واضغط على رابط التفعيل لإكمال إنشاء الحساب.
          </p>

          <Link href="/auth/login" className="text-primary hover:underline font-medium">
            العودة إلى تسجيل الدخول
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}