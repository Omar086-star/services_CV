import { CVBuilder } from '@/components/cv-builder'

export default async function EditCVPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <CVBuilder cvId={id} />
}
