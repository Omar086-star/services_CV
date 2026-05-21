'use client'

import { useCVStore } from '@/lib/stores/cv-store'
import { ModernTemplate, MinimalTemplate } from './templates'

export function CVPreview() {
  const { template } = useCVStore()

  return (
    <div className="cv-header ">
      {template === 'modern' ? <ModernTemplate /> : <MinimalTemplate />}
    </div>
  )
}
