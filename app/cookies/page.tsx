import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-8 md:p-12">

        <h1 className="text-3xl font-bold mb-8">
          سياسة ملفات تعريف الارتباط (Cookies)
        </h1>

 <Link
    href="/"
    className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:opacity-90 transition"
  >
    <ArrowRight className="h-4 w-4" />
    العودة للرئيسية
  </Link>

        <div className="space-y-8 text-slate-700 leading-8">

          <section>
            <h2 className="text-xl font-semibold mb-3">
              ما هي ملفات تعريف الارتباط؟
            </h2>

            <p>
              ملفات تعريف الارتباط (Cookies) هي ملفات صغيرة يتم تخزينها على جهاز المستخدم
              بهدف تحسين تجربة الاستخدام وتسهيل الوصول إلى الخدمات والمحتوى داخل المنصة.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              كيف نستخدم ملفات تعريف الارتباط؟
            </h2>

            <p>
              تستخدم المنصة ملفات تعريف الارتباط لتحسين الأداء، حفظ بيانات تسجيل الدخول،
              تحليل استخدام الموقع، وتقديم تجربة استخدام أكثر استقراراً وسهولة.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              أنواع ملفات تعريف الارتباط المستخدمة
            </h2>

            <ul className="list-disc pr-6 space-y-2">
              <li>ملفات ضرورية لتشغيل الموقع.</li>
              <li>ملفات لتحسين الأداء وتحليل الاستخدام.</li>
              <li>ملفات لحفظ تفضيلات المستخدم.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              إدارة ملفات تعريف الارتباط
            </h2>

            <p>
              يمكن للمستخدم التحكم بملفات تعريف الارتباط أو حذفها من خلال إعدادات المتصفح الخاص به،
              مع العلم أن بعض وظائف الموقع قد تتأثر عند تعطيلها.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              التواصل
            </h2>

            <p>
              لأي استفسارات متعلقة بسياسة الخصوصية أو ملفات تعريف الارتباط يمكن التواصل عبر:
            </p>

            <a
              href="https://www.nakhla-found.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://www.nakhla-found.com/
            </a>
          </section>

        </div>
      </div>
    </div>
  )
}