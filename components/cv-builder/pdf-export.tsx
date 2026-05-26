'use client'

import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { useCVStore } from '@/lib/stores/cv-store'
import { ModernTemplate, MinimalTemplate } from './templates'

export function PDFExport() {
  const printRef = useRef<HTMLDivElement>(null)
  const { template } = useCVStore()

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'cv',
   pageStyle: `
@page{
  size:A4;
  margin:0;
}

html,
body{
  margin:0 !important;
  padding:0 !important;
  overflow:hidden !important;
  background:white !important;
}

body > *{
  display:none !important;
}

#cv-print-area{
  display:block !important;
  visibility:visible !important;
  position:absolute !important;
  inset:0 !important;
  width:210mm !important;
  min-height:297mm !important;
  background:#fff !important;
}

#cv-print-area *{
  visibility:visible !important;
}

*{
  -webkit-print-color-adjust:exact !important;
  print-color-adjust:exact !important;
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
  طباعة / حفظ PDF
</Button>
<p className="text-xs text-muted-foreground mt-2 text-center">
  على الهاتف اختر "حفظ كـ PDF" من نافذة الطباعة
</p>
<div
  id="cv-print-area"
  ref={printRef}
  style={{
    position:'fixed',
    left:'-99999px',
    top:0,
    width:'210mm',
    minHeight:'297mm',
    background:'#fff',
    overflow:'hidden'
  }}
>
        {template === 'modern' ? <ModernTemplate /> : <MinimalTemplate />}
      </div>
    </>
  )
}