import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-8 md:p-12">

        <h1 className="text-3xl font-bold mb-8">
          سياسة الخصوصية
        </h1>
 <Link
    href="/"
    className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:opacity-90 transition"
  >
    <ArrowRight className="h-4 w-4" />
    العودة للرئيسية
  </Link>

        <div className="space-y-8 text-slate-700 leading-8">

          <p>
            تلتزم منصة بناء السيرة الذاتية بحماية خصوصية المستخدمين وضمان
            التعامل الآمن مع البيانات الشخصية وفق القوانين المعمول بها.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              البيانات التي نقوم بجمعها
            </h2>

            <ul className="list-disc pr-6 space-y-2">
              <li>البريد الإلكتروني وبيانات الحساب.</li>
              <li>محتوى السيرة الذاتية والمعلومات المهنية.</li>
              <li>بيانات تقنية متعلقة باستخدام المنصة.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              استخدام البيانات
            </h2>

            <p>
              يتم استخدام البيانات لتحسين تجربة المستخدم وتوفير خدمات إنشاء
              السيرة الذاتية وحماية الحسابات وتحسين الأداء التقني للمنصة.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              حماية البيانات
            </h2>

            <p>
              نعمل على اتخاذ الإجراءات التقنية المناسبة لحماية المعلومات
              الشخصية ومنع الوصول غير المصرح به إليها.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}