import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-2xl">حدث خطأ</CardTitle>
            <CardDescription className="mt-2">
              عذراً، حدث خطأ أثناء معالجة طلبك
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            قد يكون الرابط منتهي الصلاحية أو تم استخدامه بالفعل.
            يرجى المحاولة مرة أخرى.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Link href="/auth/login" className="w-full">
            <Button className="w-full">
              تسجيل الدخول
            </Button>
          </Link>
          <Link href="/auth/sign-up" className="w-full">
            <Button variant="outline" className="w-full">
              إنشاء حساب جديد
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
