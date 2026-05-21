import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  await supabase
    .from('cvs')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  redirect('/dashboard')
}
