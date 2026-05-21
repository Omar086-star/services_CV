import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-8 md:p-12">

        <h1 className="text-3xl font-bold mb-8">
          Mentions légales
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
              Éditeur du site
            </h2>

            <p>
              Plateforme de création de CV proposée par
              <strong> Nakhla Foundation for Motherhood and Childhood Care and Development</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              Hébergement
            </h2>

            <p>
              Le site est hébergé par Vercel Inc.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              Protection des données
            </h2>

            <p>
              Les données personnelles sont traitées conformément au RGPD et utilisées uniquement
              dans le cadre des services proposés par la plateforme.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              Contact
            </h2>

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