'use client'

import { useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useReactToPrint } from 'react-to-print'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { CVPreview } from './cv-preview'

export function PDFExport() {
  const previewRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()

  const isEn = searchParams.get('lang') === 'en'

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: isEn ? 'resume' : 'cv',
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }

      body {
        margin: 0;
        background: white;
      }

      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    `,
  })

  return (
    <>
      <Button
        onClick={handlePrint}
        className="w-full"
        size="lg"
      >
        <Download className={isEn ? 'h-5 w-5 mr-2' : 'h-5 w-5 ml-2'} />
        {isEn ? 'Download PDF' : 'تحميل PDF'}
      </Button>

      <div
        ref={previewRef}
        className="bg-white"
      >
        <CVPreview />
      </div>
    </>
  )
}