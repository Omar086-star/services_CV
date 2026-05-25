import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FileText, Plus, LogOut, Edit, Trash2, Clock } from 'lucide-react'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const params = await searchParams
  const lang = params.lang === 'en' ? 'en' : 'ar'
  const isEn = lang === 'en'

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/auth/login?lang=${lang}`)
  }

  const { data: cvs } = await supabase
    .from('cvs')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      isEn ? 'en-US' : 'ar-SA',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
    )
  }

  return (
    <div
      dir={isEn ? 'ltr' : 'rtl'}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href={`/dashboard?lang=${lang}`}
            className="flex items-center gap-2"
          >
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">
              {isEn ? 'CV Builder' : 'بناء السيرة الذاتية'}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/dashboard?lang=ar">
              <Button variant="outline" size="sm">
                🇸🇦 العربية
              </Button>
            </Link>

            <Link href="/dashboard?lang=en">
              <Button variant="outline" size="sm">
                🇺🇸 English
              </Button>
            </Link>

            <form action="/api/auth/signout" method="post">
              <Button variant="ghost" size="sm" type="submit">
                <LogOut
                  className={isEn ? 'h-4 w-4 mr-2' : 'h-4 w-4 ml-2'}
                />
                {isEn ? 'Logout' : 'خروج'}
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {isEn ? 'Welcome' : 'مرحباً بك'}
          </h1>

          <p className="text-muted-foreground">
            {isEn
              ? 'Create and manage your resumes easily'
              : 'قم بإنشاء وإدارة سيرتك الذاتية بسهولة'}
          </p>
        </div>

        <Link href={`/builder?lang=${lang}`}>
          <Card className="mb-8 hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-primary/30 bg-primary/5">
            <CardContent className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-primary" />
                </div>

                <h3 className="font-semibold text-lg mb-1">
                  {isEn ? 'Create a new resume' : 'إنشاء سيرة ذاتية جديدة'}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {isEn
                    ? 'Start from scratch and choose from available templates'
                    : 'ابدأ من الصفر واختر من بين القوالب المتاحة'}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        {cvs && cvs.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {isEn
                ? `Your resumes (${cvs.length})`
                : `سيرك الذاتية (${cvs.length})`}
            </h2>

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
                          <CardTitle className="text-base">
                            {cv.title}
                          </CardTitle>

                          <CardDescription className="text-xs">
                            {cv.template === 'modern'
                              ? isEn
                                ? 'Modern template'
                                : 'قالب عصري'
                              : isEn
                                ? 'Minimal template'
                                : 'قالب بسيط'}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center text-xs text-muted-foreground mb-4">
                      <Clock
                        className={isEn ? 'h-3 w-3 mr-1' : 'h-3 w-3 ml-1'}
                      />

                      {isEn ? 'Last updated: ' : 'آخر تعديل: '}
                      {formatDate(cv.updated_at)}
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/builder/${cv.id}?lang=${cv.language ?? lang}`}
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          <Edit
                            className={isEn ? 'h-4 w-4 mr-2' : 'h-4 w-4 ml-2'}
                          />

                          {isEn ? 'Edit' : 'تعديل'}
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

        {(!cvs || cvs.length === 0) && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-10 w-10 text-muted-foreground" />
              </div>

              <h3 className="font-semibold text-lg mb-2">
                {isEn ? 'No resumes yet' : 'لا توجد سير ذاتية بعد'}
              </h3>

              <p className="text-muted-foreground mb-4">
                {isEn
                  ? 'Start by creating your first resume'
                  : 'ابدأ بإنشاء سيرتك الذاتية الأولى'}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/builder?lang=ar">
                  <Button>
                    إنشاء سيرة ذاتية بالعربية
                  </Button>
                </Link>

                <Link href="/builder?lang=en">
                  <Button variant="outline">
                    Create English CV
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="bg-slate-950 text-white mt-16 border-t border-slate-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-white/20">
                  <img
                    src="/logoz.png"
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-bold text-lg">
                  {isEn ? 'CV Builder Platform' : 'منصة بناء السيرة الذاتية'}
                </h3>
              </div>

              <p className="text-slate-300 text-sm leading-7">
                {isEn
                  ? 'A free platform that supports students, young people, and job seekers by providing modern tools to create professional resumes.'
                  : 'منصة مجانية تهدف إلى دعم الطلاب والشباب والباحثين عن العمل عبر توفير أدوات حديثة لإنشاء سيرة ذاتية احترافية باللغة العربية وبمعايير تواكب سوق العمل المحلي والدولي.'}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">
                {isEn ? 'Our Mission' : 'رسالتنا'}
              </h3>

              <p className="text-slate-300 text-sm leading-7">
                {isEn
                  ? 'We believe access to job opportunities starts with presenting skills and experience professionally.'
                  : 'نؤمن أن الوصول إلى فرص العمل يبدأ من تقديم المهارات والخبرات بطريقة احترافية. لذلك نعمل على تمكين الشباب رقمياً وتسهيل دخولهم إلى سوق العمل وبناء مستقبل أفضل.'}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">
                {isEn ? 'About the Project' : 'عن المشروع'}
              </h3>

              <p className="text-slate-300 text-sm leading-7">
                {isEn ? 'This project is provided by ' : 'هذا المشروع مقدم من '}

                <a
                  href="https://www.nakhla-found.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-semibold hover:text-primary transition-colors underline underline-offset-4"
                >
                  {isEn
                    ? 'Nakhla Foundation for Motherhood and Childhood Care and Development'
                    : 'مؤسسة نخلة لتنمية ورعاية الأمومة والطفولة'}
                </a>

                {isEn
                  ? ', as part of its efforts to support education, vocational training, and digital skills.'
                  : '، ضمن جهودها في دعم التعليم والتأهيل المهني وتعزيز المهارات الرقمية لدى الشباب الطامحين بالعمل والاستقرار وبناء مستقبل أكثر أملاً.'}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <img
                src="/logoz.png"
                alt="Logo"
                className="h-4 w-4 object-cover"
              />

              <span>
                {isEn ? 'CV Builder Platform' : 'منصة بناء السيرة الذاتية'}
              </span>
            </div>

            <p className="text-center">
              {isEn
                ? '© 2026 All rights reserved — Nakhla Foundation for Motherhood and Childhood Care and Development'
                : '© 2026 جميع الحقوق محفوظة — مؤسسة نخلة لتنمية ورعاية الأمومة والطفولة'}
            </p>

            <Link href="/cookies" className="text-slate-300 hover:text-white">
              {isEn ? 'Cookies Policy' : 'سياسة ملفات تعريف الارتباط'}
            </Link>

            <Link href="/privacy" className="text-slate-300 hover:text-white">
              {isEn ? 'Privacy Policy' : 'سياسة الخصوصية'}
            </Link>

            <Link href="/terms" className="text-slate-300 hover:text-white">
              {isEn ? 'Terms' : 'الشروط والأحكام'}
            </Link>

            <Link
              href="/mentions-legales"
              className="text-slate-300 hover:text-white"
            >
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