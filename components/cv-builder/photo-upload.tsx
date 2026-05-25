'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCVStore } from '@/lib/stores/cv-store'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Camera, Loader2, Trash2, User } from 'lucide-react'

export function PhotoUpload() {
  const { photoUrl, setPhotoUrl } = useCVStore()
  const [isUploading, setIsUploading] = useState(false)

  const searchParams = useSearchParams()
  const isEn = searchParams.get('lang') === 'en'

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const { pathname } = await response.json()
      setPhotoUrl(pathname)
    } catch (error) {
      console.error('Upload error:', error)

      alert(
        isEn
          ? 'Failed to upload the image. Please try again.'
          : 'فشل في رفع الصورة. يرجى المحاولة مرة أخرى.'
      )
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    setPhotoUrl(null)
  }

  const imageUrl = photoUrl
    ? `/api/file?pathname=${encodeURIComponent(photoUrl)}`
    : null

  return (
    <div className="space-y-3">
      <Label>
        {isEn ? 'Profile Photo' : 'الصورة الشخصية'}
      </Label>

      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-dashed border-border">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={isEn ? 'Profile photo' : 'الصورة الشخصية'}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-10 h-10 text-muted-foreground" />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="relative">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2
                    className={
                      isEn
                        ? 'h-4 w-4 mr-2 animate-spin'
                        : 'h-4 w-4 ml-2 animate-spin'
                    }
                  />

                  {isEn ? 'Uploading...' : 'جارٍ الرفع...'}
                </>
              ) : (
                <>
                  <Camera
                    className={
                      isEn
                        ? 'h-4 w-4 mr-2'
                        : 'h-4 w-4 ml-2'
                    }
                  />

                  {photoUrl
                    ? isEn
                      ? 'Change Photo'
                      : 'تغيير الصورة'
                    : isEn
                      ? 'Upload Photo'
                      : 'رفع صورة'}
                </>
              )}
            </Button>
          </div>

          {photoUrl && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-destructive hover:text-destructive"
            >
              <Trash2
                className={
                  isEn
                    ? 'h-4 w-4 mr-2'
                    : 'h-4 w-4 ml-2'
                }
              />

              {isEn ? 'Remove Photo' : 'إزالة الصورة'}
            </Button>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {isEn
          ? 'Supported formats: JPG, PNG, WebP (maximum 5 MB)'
          : 'الصيغ المدعومة: JPG, PNG, WebP (الحد الأقصى 5 ميجابايت)'}
      </p>
    </div>
  )
}