import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-8 md:p-12">

        <h1 className="text-3xl font-bold mb-8">
          الشروط والأحكام
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
            باستخدامك لهذه المنصة فإنك توافق على الالتزام بالشروط والأحكام التالية.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              استخدام المنصة
            </h2>

            <p>
              تتيح المنصة للمستخدمين إنشاء وإدارة السير الذاتية للاستخدام الشخصي والمهني.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              مسؤولية المستخدم
            </h2>

            <p>
              يتحمل المستخدم مسؤولية صحة المعلومات التي يقوم بإدخالها وعدم استخدام
              المنصة لأي أغراض غير قانونية أو مضرة.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              الملكية الفكرية
            </h2>

            <p>
              جميع التصاميم والمحتويات الخاصة بالمنصة محمية بحقوق الملكية الفكرية.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}