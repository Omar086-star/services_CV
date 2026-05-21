import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { data: cv, error } = await supabase
      .from('cvs')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error || !cv) {
      return NextResponse.json({ error: 'السيرة الذاتية غير موجودة' }, { status: 404 })
    }

    return NextResponse.json({ cv })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await request.json()
    const { title, template, data, theme_settings, photo_url, background_url } = body

    const updateData: Record<string, unknown> = {}
    if (title !== undefined) updateData.title = title
    if (template !== undefined) updateData.template = template
    if (data !== undefined) updateData.data = data
    if (theme_settings !== undefined) updateData.theme_settings = theme_settings
    if (photo_url !== undefined) updateData.photo_url = photo_url
    if (background_url !== undefined) updateData.background_url = background_url

    const { data: cv, error } = await supabase
      .from('cvs')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating CV:', error)
      return NextResponse.json({ error: 'فشل في تحديث السيرة الذاتية' }, { status: 500 })
    }

    return NextResponse.json({ cv })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const { error } = await supabase
      .from('cvs')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error deleting CV:', error)
      return NextResponse.json({ error: 'فشل في حذف السيرة الذاتية' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}
