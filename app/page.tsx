import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  FileText,
  Sparkles,
  Layout,
  Download,
  Globe,
  Palette,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'

export default async function Home({
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

  if (user) {
    redirect(`/dashboard?lang=${lang}`)
  }

  const features = isEn
    ? [
        { icon: Sparkles, title: 'Modern Design', description: 'Professional templates for today’s job market' },
        { icon: Layout, title: 'Easy Builder', description: 'Organize your CV sections smoothly' },
        { icon: Download, title: 'PDF Export', description: 'Download your resume in high quality PDF' },
        { icon: Globe, title: 'Arabic & English', description: 'Create your CV in the language you need' },
        { icon: Palette, title: 'Customization', description: 'Choose colors, fonts, and layout' },
        { icon: FileText, title: 'Multiple Templates', description: 'Modern and simple CV templates' },
      ]
    : [
        { icon: Sparkles, title: 'تصميم عصري', description: 'قوالب احترافية مناسبة لسوق العمل' },
        { icon: Layout, title: 'بناء سهل', description: 'رتّب أقسام سيرتك الذاتية بسهولة' },
        { icon: Download, title: 'تصدير PDF', description: 'حمّل سيرتك الذاتية بجودة عالية' },
        { icon: Globe, title: 'عربي وإنجليزي', description: 'أنشئ سيرتك باللغة التي تناسبك' },
        { icon: Palette, title: 'تخصيص كامل', description: 'اختر الألوان والخطوط والتنسيق' },
        { icon: FileText, title: 'قوالب متعددة', description: 'قوالب عصرية وبسيطة جاهزة' },
      ]

  const examples = isEn
    ? [
        { name: 'Sarah Johnson', role: 'Marketing Specialist', city: 'Paris, France', skills: ['SEO', 'Branding', 'Content'] },
        { name: 'Adam Miller', role: 'Web Developer', city: 'Lille, France', skills: ['React', 'Node.js', 'UI'] },
        { name: 'Maya Wilson', role: 'Project Assistant', city: 'Brussels, Belgium', skills: ['Planning', 'Reports', 'NGO'] },
        { name: 'Omar Al Mulla', role: 'Consulting & Solutions', city: 'France - Lille', skills: ['Strategy', 'Training', 'Digital'] },
      ]
    : [
        { name: 'سارة أحمد', role: 'اختصاصية تسويق', city: 'باريس - فرنسا', skills: ['SEO', 'المحتوى', 'الهوية'] },
        { name: 'آدم خالد', role: 'مطور ويب', city: 'ليل - فرنسا', skills: ['React', 'Node.js', 'UI'] },
        { name: 'مايا حسن', role: 'مساعدة مشاريع', city: 'بروكسل - بلجيكا', skills: ['تخطيط', 'تقارير', 'جمعيات'] },
        { name: 'عمر الملا', role: 'استشارات وحلول', city: 'France - Lille', skills: ['استراتيجية', 'تدريب', 'رقمنة'] },
      ]

  return (
    <div
      dir={isEn ? 'ltr' : 'rtl'}
      className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative"
    >
      <style>{`
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-18px) scale(1.05); }
        }
        @keyframes scrollCards {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .float-blob { animation: floatBlob 6s ease-in-out infinite; }
        .scroll-cards { animation: scrollCards 24s linear infinite; }
        .scroll-cards:hover { animation-play-state: paused; }
      `}</style>

      <div className="absolute top-24 left-10 w-40 h-40 bg-blue-300/30 rounded-full blur-3xl float-blob" />
      <div className="absolute top-64 right-12 w-56 h-56 bg-indigo-300/30 rounded-full blur-3xl float-blob" />
      <div className="absolute bottom-24 left-1/3 w-48 h-48 bg-cyan-300/20 rounded-full blur-3xl float-blob" />

      <header className="container mx-auto px-4 py-6 relative z-10">
        <nav className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">
              {isEn ? 'CV Builder' : 'بناء السيرة الذاتية'}
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link href="/?lang=ar">
              <Button variant={isEn ? 'outline' : 'default'} size="sm">العربية</Button>
            </Link>
            <Link href="/?lang=en">
              <Button variant={isEn ? 'default' : 'outline'} size="sm">English</Button>
            </Link>
            <Link href={`/auth/login?lang=${lang}`}>
              <Button variant="ghost">{isEn ? 'Login' : 'تسجيل الدخول'}</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-14 relative z-10">
        <section className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border px-4 py-2 mb-6 shadow-sm">
            <Globe className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              {isEn
                ? 'Create your CV in Arabic or English from one platform'
                : 'أنشئ سيرتك الذاتية بالعربية أو الإنجليزية من منصة واحدة'}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {isEn ? (
              <>
                Build a professional CV
                <span className="text-primary"> in minutes</span>
              </>
            ) : (
              <>
                أنشئ سيرة ذاتية احترافية
                <span className="text-primary"> خلال دقائق</span>
              </>
            )}
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            {isEn
              ? 'Choose your language, fill in your information, preview your resume, and download it as PDF.'
              : 'اختر اللغة، أدخل معلوماتك، شاهد المعاينة مباشرة، ثم حمّل سيرتك الذاتية بصيغة PDF.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link href="/builder?lang=ar">
              <Card className="border-2 hover:border-primary hover:shadow-xl transition-all cursor-pointer">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="text-start">
                    <h3 className="font-bold text-lg">CV عربي</h3>
                    <p className="text-sm text-muted-foreground">سيرة ذاتية باللغة العربية</p>
                  </div>
                  <ArrowLeft className="h-5 w-5 text-primary" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/builder?lang=en">
              <Card className="border-2 hover:border-primary hover:shadow-xl transition-all cursor-pointer">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="text-start">
                    <h3 className="font-bold text-lg">English CV</h3>
                    <p className="text-sm text-muted-foreground">Create your resume in English</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto mb-20 overflow-hidden">
          <div className="flex gap-6 scroll-cards w-max">
            {[...examples, ...examples].map((example, index) => (
              <Card key={index} className="w-[340px] shrink-0 shadow-2xl border-0 overflow-hidden bg-white">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-white">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                        {example.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{example.name}</h3>
                        <p className="opacity-90">{example.role}</p>
                        <p className="text-xs opacity-75 mt-1">{example.city}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="font-bold text-primary mb-3 border-b pb-1">
                      {isEn ? 'Key Skills' : 'المهارات الرئيسية'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {example.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {isEn ? 'Why choose our platform?' : 'لماذا تختار منصتنا؟'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all bg-white/90">
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
        </section>

        <section className="max-w-2xl mx-auto text-center mt-20">
          <Card className="bg-primary text-primary-foreground border-0 shadow-2xl">
            <CardContent className="p-10">
              <h2 className="text-2xl font-bold mb-4">
                {isEn ? 'Ready to create your CV?' : 'جاهز لإنشاء سيرتك الذاتية؟'}
              </h2>
              <p className="opacity-90 mb-6">
                {isEn
                  ? 'Start now and build a resume that helps you stand out.'
                  : 'ابدأ الآن وابنِ سيرة ذاتية تساعدك على التميز.'}
              </p>
              <Link href={`/builder?lang=${lang}`}>
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  {isEn ? 'Start Now' : 'ابدأ الآن'}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
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