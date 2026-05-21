import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-2xl">تحقق من بريدك الإلكتروني</CardTitle>
            <CardDescription className="mt-2">
              تم إرسال رابط التأكيد إلى بريدك الإلكتروني
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            يرجى التحقق من صندوق الوارد الخاص بك والنقر على رابط التأكيد لتفعيل حسابك.
            قد يستغرق وصول البريد بضع دقائق.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Link href="/auth/login" className="w-full">
            <Button variant="outline" className="w-full">
              العودة لتسجيل الدخول
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
