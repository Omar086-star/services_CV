'use client'

import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { CVPreview } from './cv-preview'

export function PDFExport() {
  const previewRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: 'cv',
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
        <Download className="h-5 w-5 ml-2" />
        تحميل PDF
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