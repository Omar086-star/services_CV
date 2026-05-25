import { CVBuilder } from '@/components/cv-builder'

export default async function BuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const params = await searchParams

  const language = params.lang === 'en' ? 'en' : 'ar'

  return <CVBuilder language={language} />
}