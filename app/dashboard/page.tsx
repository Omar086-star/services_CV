import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Plus, LogOut, Edit, Trash2, Clock } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: cvs } = await supabase
    .from('cvs')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">بناء السيرة الذاتية</span>
          </Link>
          
          <form action="/api/auth/signout" method="post">
            <Button variant="ghost" size="sm" type="submit">
              <LogOut className="h-4 w-4 ml-2" />
              خروج
            </Button>
          </form>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">مرحباً بك</h1>
          <p className="text-muted-foreground">
            قم بإنشاء وإدارة سيرتك الذاتية بسهولة
          </p>
        </div>

        {/* Create New CV */}
        <Link href="/builder">
          <Card className="mb-8 hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-primary/30 bg-primary/5">
            <CardContent className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">إنشاء سيرة ذاتية جديدة</h3>
                <p className="text-sm text-muted-foreground">ابدأ من الصفر واختر من بين القوالب المتاحة</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* CV List */}
        {cvs && cvs.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4">سيرك الذاتية ({cvs.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cvs.map((cv) => (
                <Card key={cv.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{cv.title}</CardTitle>
                          <CardDescription className="text-xs">
                            {cv.template === 'modern' ? 'قالب عصري' : 'قالب بسيط'}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-xs text-muted-foreground mb-4">
                      <Clock className="h-3 w-3 ml-1" />
                      آخر تعديل: {formatDate(cv.updated_at)}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/builder/${cv.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Edit className="h-4 w-4 ml-2" />
                          تعديل
                        </Button>
                      </Link>
                      <DeleteCVButton cvId={cv.id} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {(!cvs || cvs.length === 0) && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">لا توجد سير ذاتية بعد</h3>
              <p className="text-muted-foreground mb-4">
                ابدأ بإنشاء سيرتك الذاتية الأولى
              </p>
              <Link href="/builder">
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  إنشاء سيرة ذاتية
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>


      {/* Footer */}
<footer className="bg-slate-950 text-white mt-16 border-t border-slate-800">
  <div className="container mx-auto px-4 py-12">

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* About */}
      <div>
        <div className="flex items-center gap-2 mb-4">
<div className="w-24 h-24 rounded-full overflow-hidden border border-white/20">
  <img
    src="/logoz.png"
    alt="Logo"
    className="w-full h-full object-cover"
  />
</div>
          <h3 className="font-bold text-lg">منصة بناء السيرة الذاتية</h3>
        </div>

        <p className="text-slate-300 text-sm leading-7">
          منصة مجانية تهدف إلى دعم الطلاب والشباب والباحثين عن العمل
          عبر توفير أدوات حديثة لإنشاء سيرة ذاتية احترافية باللغة العربية
          وبمعايير تواكب سوق العمل المحلي والدولي.
        </p>
      </div>

      {/* Mission */}
      <div>
        <h3 className="font-bold text-lg mb-4">رسالتنا</h3>

        <p className="text-slate-300 text-sm leading-7">
          نؤمن أن الوصول إلى فرص العمل يبدأ من تقديم المهارات والخبرات
          بطريقة احترافية. لذلك نعمل على تمكين الشباب رقمياً وتسهيل
          دخولهم إلى سوق العمل وبناء مستقبل أفضل.
        </p>
      </div>

      {/* Organization */}
      <div>
        <h3 className="font-bold text-lg mb-4">عن المشروع</h3>

<p className="text-slate-300 text-sm leading-7">
  هذا المشروع مقدم من

  <a
    href="https://www.nakhla-found.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white font-semibold hover:text-primary transition-colors underline underline-offset-4"
  >
    {' '}مؤسسة نخلة لتنمية ورعاية الأمومة والطفولة
  </a>

  ، ضمن جهودها في دعم التعليم والتأهيل المهني
  وتعزيز المهارات الرقمية لدى الشباب الطامحين بالعمل
  والاستقرار وبناء مستقبل أكثر أملاً.
</p>
      </div>

    </div>

    {/* Bottom */}
    <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">

      <div className="flex items-center gap-2">
  <img
    src="/logoz.png"
    alt="Logo"
    className="h-4 w-4 object-cover"
  />        <span>منصة بناء السيرة الذاتية</span>
      </div>

      <p className="text-center">
        © 2026 جميع الحقوق محفوظة — مؤسسة نخلة لتنمية ورعاية الأمومة والطفولة
      </p>

<Link
  href="/cookies"
  className="text-slate-300 hover:text-white transition-colors"
>
  سياسة ملفات تعريف الارتباط
</Link>
<Link href="/privacy" className="text-slate-300 hover:text-white">
  سياسة الخصوصية
</Link>

<Link href="/terms" className="text-slate-300 hover:text-white">
  الشروط والأحكام
</Link>

<Link href="/mentions-legales" className="text-slate-300 hover:text-white">
  Mentions légales
</Link>
    </div>
  </div>
</footer>
    </div>
  )
}

function DeleteCVButton({ cvId }: { cvId: string }) {
  return (
    <form action={`/api/cv/${cvId}/delete`} method="post">
      <Button 
        variant="ghost" 
        size="sm" 
        type="submit"
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </form>
  )
}
