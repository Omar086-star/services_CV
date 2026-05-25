'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FileText, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  const lang = searchParams.get('lang') === 'en' ? 'en' : 'ar'
  const isEn = lang === 'en'

  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(
        isEn
          ? 'Incorrect email or password'
          : 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      )

      setIsLoading(false)
      return
    }

    router.push(`/builder?lang=${lang}`)
    router.refresh()
  }

  return (
    <div
      dir={isEn ? 'ltr' : 'rtl'}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-4"
    >
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <Link href="/auth/login?lang=ar">
          <Button variant="outline" size="sm">
            🇸🇦 العربية
          </Button>
        </Link>

        <Link href="/auth/login?lang=en">
          <Button variant="outline" size="sm">
            🇺🇸 English
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
            <FileText className="w-8 h-8 text-primary-foreground" />
          </div>

          <div>
            <CardTitle className="text-2xl">
              {isEn ? 'Login' : 'تسجيل الدخول'}
            </CardTitle>

            <CardDescription className="mt-2">
              {isEn
                ? 'Login to access your CV dashboard'
                : 'سجل دخولك للوصول إلى سيرتك الذاتية'}
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">
                {isEn ? 'Email Address' : 'البريد الإلكتروني'}
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                dir="ltr"
                className="text-left"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                {isEn ? 'Password' : 'كلمة المرور'}
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                dir="ltr"
                className="text-left"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2
                    className={isEn ? 'mr-2 h-4 w-4 animate-spin' : 'ml-2 h-4 w-4 animate-spin'}
                  />

                  {isEn
                    ? 'Logging in...'
                    : 'جارٍ تسجيل الدخول...'}
                </>
              ) : (
                isEn ? 'Login' : 'تسجيل الدخول'
              )}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              {isEn
                ? "Don't have an account?"
                : 'ليس لديك حساب؟'}{' '}

              <Link
                href={`/auth/sign-up?lang=${lang}`}
                className="text-primary hover:underline font-medium"
              >
                {isEn
                  ? 'Create new account'
                  : 'إنشاء حساب جديد'}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}