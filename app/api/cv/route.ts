import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { CVData, ThemeSettings, DEFAULT_CV_DATA, DEFAULT_THEME_SETTINGS } from '@/lib/types/cv'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { data: cvs, error } = await supabase
      .from('cvs')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching CVs:', error)
      return NextResponse.json({ error: 'فشل في جلب السير الذاتية' }, { status: 500 })
    }

    return NextResponse.json({ cvs })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await request.json()
    const { title, template, data, theme_settings, photo_url, background_url } = body

    const { data: cv, error } = await supabase
      .from('cvs')
      .insert({
        user_id: user.id,
        title: title || 'سيرتي الذاتية',
        template: template || 'modern',
        data: data || DEFAULT_CV_DATA,
        theme_settings: theme_settings || DEFAULT_THEME_SETTINGS,
        photo_url,
        background_url,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating CV:', error)
      return NextResponse.json({ error: 'فشل في إنشاء السيرة الذاتية' }, { status: 500 })
    }

    return NextResponse.json({ cv })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}
