'use client'

import { useCVStore } from '@/lib/stores/cv-store'
import { ModernTemplate, MinimalTemplate } from './templates'

type CVPreviewProps = {
  printMode?: boolean
}

export function CVPreview({ printMode = false }: CVPreviewProps) {
  const { template } = useCVStore()

  if (printMode) {
    return (
      <div
        style={{
          width: '794px',
          minHeight: '1123px',
          background: '#ffffff',
          overflow: 'hidden',
        }}
      >
        {template === 'modern' ? <ModernTemplate /> : <MinimalTemplate />}
      </div>
    )
  }

  return (
    <div className="cv-header">
      {template === 'modern' ? <ModernTemplate /> : <MinimalTemplate />}
    </div>
  )
}