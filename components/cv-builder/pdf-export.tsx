'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Loader2 } from 'lucide-react'
import { CVPreview } from './cv-preview'

export function PDFExport() {
  const pdfRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  const handleDownload = async () => {
    if (!pdfRef.current) return

    setIsExporting(true)

    try {
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).default

      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: pdfRef.current.scrollWidth,
      })

      const imgData = canvas.toDataURL('image/png')

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pageWidth = 210
      const pageHeight = 297
      const imgWidth = pageWidth
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save('cv.pdf')
    } catch (error) {
      console.error(error)
      alert('فشل تحميل PDF')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <>
      <Button
        onClick={handleDownload}
        className="w-full"
        size="lg"
        disabled={isExporting}
      >
        {isExporting ? (
          <Loader2 className="h-5 w-5 ml-2 animate-spin" />
        ) : (
          <Download className="h-5 w-5 ml-2" />
        )}
        {isExporting ? 'جارٍ التحميل...' : 'تحميل PDF'}
      </Button>

      <div className="fixed -left-[99999px] top-0 bg-white">
        <div
          ref={pdfRef}
          className="bg-white"
          style={{
            width: '210mm',
            minHeight: '297mm',
          }}
        >
          <CVPreview />
        </div>
      </div>
    </>
  )
}