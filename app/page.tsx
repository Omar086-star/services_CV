import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Sparkles, Layout, Download, Globe, Palette } from 'lucide-react'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  const features = [
    {
      icon: Sparkles,
      title: 'تصميم عصري',
      description: 'قوالب احترافية مصممة خصيصاً للسوق العربي',
    },
    {
      icon: Layout,
      title: 'سحب وإفلات',
      description: 'رتب أقسام سيرتك الذاتية بسهولة تامة',
    },
    {
      icon: Download,
      title: 'تصدير PDF',
      description: 'حمل سيرتك الذاتية بصيغة PDF عالية الجودة',
    },
    {
      icon: Globe,
      title: 'دعم كامل للعربية',
      description: 'واجهة عربية بالكامل مع دعم RTL',
    },
    {
      icon: Palette,
      title: 'تخصيص كامل',
      description: 'اختر الألوان والخطوط التي تناسبك',
    },
    {
      icon: FileText,
      title: 'قوالب متعددة',
      description: 'اختر من بين قوالب عصرية وبسيطة',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">بناء السيرة الذاتية</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">تسجيل الدخول</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>ابدأ مجاناً</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
            أنشئ سيرتك الذاتية
            <span className="text-primary"> باللغة العربية</span>
            <br />
            في دقائق
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            منصة احترافية لإنشاء السيرة الذاتية بقوالب عصرية وأدوات سهلة الاستخدام.
            صممت خصيصاً لدعم اللغة العربية بشكل كامل.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                <Sparkles className="h-5 w-5 ml-2" />
                ابدأ الآن مجاناً
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                لدي حساب
              </Button>
            </Link>
          </div>
        </div>

        {/* Preview Card */}
        <div className="max-w-4xl mx-auto mb-20">
          <Card className="overflow-hidden shadow-2xl border-0">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-primary to-primary/80 p-8 text-white">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold">أ</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">أحمد محمد</h3>
                    <p className="text-lg opacity-90 mb-3">مهندس برمجيات</p>
                    <div className="flex flex-wrap gap-4 text-sm opacity-80">
                      <span>ahmed@email.com</span>
                      <span>+966 50 000 0000</span>
                      <span>الرياض</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 flex gap-8">
                <div className="flex-1">
                  <h4 className="font-bold text-primary mb-3 border-b-2 border-primary pb-1">الخبرات العملية</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold">مطور Full Stack</p>
                      <p className="text-sm text-muted-foreground">شركة التقنية الحديثة</p>
                    </div>
                    <div>
                      <p className="font-semibold">مطور Frontend</p>
                      <p className="text-sm text-muted-foreground">شركة الابتكار الرقمي</p>
                    </div>
                  </div>
                </div>
                <div className="w-48 bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold text-primary mb-3 border-b-2 border-primary pb-1">المهارات</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>React.js</span>
                      <span className="text-muted-foreground">خبير</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Node.js</span>
                      <span className="text-muted-foreground">متقدم</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Python</span>
                      <span className="text-muted-foreground">متوسط</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            لماذا تختار منصتنا؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-2xl mx-auto text-center mt-20">
          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-10">
              <h2 className="text-2xl font-bold mb-4">
                جاهز لإنشاء سيرتك الذاتية؟
              </h2>
              <p className="opacity-90 mb-6">
                انضم الآن وابدأ في بناء سيرة ذاتية احترافية تميزك عن الآخرين
              </p>
              <Link href="/auth/sign-up">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  إنشاء حساب مجاني
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span>بناء السيرة الذاتية</span>
          </div>
          <p>جميع الحقوق محفوظة 2024</p>
        </div>
      </footer>
    </div>
  )
}
