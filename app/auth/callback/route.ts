import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/builder'
  const lang = requestUrl.searchParams.get('lang') === 'en' ? 'en' : 'ar'

  if (code) {
    const supabase = await createClient()

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const redirectUrl = new URL(next, requestUrl.origin)

      if (!redirectUrl.searchParams.get('lang')) {
        redirectUrl.searchParams.set('lang', lang)
      }

      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.redirect(new URL(`/auth/error?lang=${lang}`, requestUrl.origin))
}