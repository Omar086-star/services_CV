'use client'

import { useCVStore } from '@/lib/stores/cv-store'
import { ModernTemplate, MinimalTemplate } from './templates'

export function CVPreview() {
  const { template } = useCVStore()

return (
  <div className="w-[210mm] min-h-[297mm] bg-white mx-auto overflow-hidden">
    {template === 'modern'
      ? <ModernTemplate/>
      : <MinimalTemplate/>
    }
  </div>
)
}
