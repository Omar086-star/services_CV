'use client'

import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { CVPreview } from './cv-preview'

export function PDFExport() {
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    contentRef: printRef,

    documentTitle: 'CV',

    pageStyle: `
      @page{
        size:A4 portrait;
        margin:0;
      }

      html,body{
        width:210mm;
        height:297mm;
        margin:0;
        padding:0;
        background:white;
      }

      *{
        -webkit-print-color-adjust:exact !important;
        print-color-adjust:exact !important;
      }

      .print-container{
        width:210mm !important;
        min-height:297mm !important;
        overflow:hidden !important;
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

      {/* خارج الشاشة وليس داخل الواجهة */}
      <div
        className="fixed -left-[9999px] top-0"
      >
        <div
          ref={printRef}
          className="print-container bg-white"
        >
          <CVPreview />
        </div>
      </div>
    </>
  )
}