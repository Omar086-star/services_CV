'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useCVStore } from '@/lib/stores/cv-store'
import { createClient } from '@/lib/supabase/client'
import { SectionNav } from './section-nav'
import { SectionContent } from './section-content'
import { CVPreview } from './cv-preview'
import { SettingsPanel } from './settings-panel'
import { PDFExport } from './pdf-export'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  FileText,
  Settings,
  Eye,
  Save,
  Loader2,
  LogOut,
  ChevronRight,
  Menu,
} from 'lucide-react'
import Link from 'next/link'

interface CVBuilderProps {
  cvId?: string
  language?: 'ar' | 'en'
}

export function CVBuilder({
  cvId,
  language = 'ar',
}: CVBuilderProps) {
  const router = useRouter()
  const supabase = createClient()

  const [activeTab, setActiveTab] = useState<
    'edit' | 'preview' | 'settings'
  >('edit')

  const [isMobileNavOpen, setIsMobileNavOpen] =
    useState(false)

  const isEn = language === 'en'

  const {
    title,
    setTitle,
    template,
    data,
    themeSettings,
    photoUrl,
    backgroundUrl,
    isDirty,
    isSaving,
    setIsSaving,
    setIsDirty,
    loadCV,
    setCvId,
  } = useCVStore()

  useEffect(() => {
    if (cvId) {
      loadExistingCV(cvId)
    }
  }, [cvId])

  const loadExistingCV = async (id: string) => {
    try {
      const response = await fetch(`/api/cv/${id}`)

      if (!response.ok) {
        router.push(`/builder?lang=${language}`)
        return
      }

      const { cv } = await response.json()

      loadCV(cv)
    } catch (error) {
      console.error('Error loading CV:', error)

      router.push(`/builder?lang=${language}`)
    }
  }

  const handleSave = useCallback(async () => {
    setIsSaving(true)

    try {
      const cvData = {
        title,
        template,
        data,
        theme_settings: themeSettings,
        photo_url: photoUrl,
        background_url: backgroundUrl,
        language,
      }

      let response: Response

      if (cvId) {
        response = await fetch(`/api/cv/${cvId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cvData),
        })
      } else {
        response = await fetch('/api/cv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cvData),
        })
      }

      if (!response.ok) {
        throw new Error('Save failed')
      }

      const { cv } = await response.json()

      if (!cvId) {
        setCvId(cv.id)

        router.push(
          `/builder/${cv.id}?lang=${language}`
        )
      }

      setIsDirty(false)
    } catch (error) {
      console.error('Save error:', error)

      alert(
        isEn
          ? 'Failed to save the resume. Please try again.'
          : 'فشل في حفظ السيرة الذاتية. يرجى المحاولة مرة أخرى.'
      )
    } finally {
      setIsSaving(false)
    }
  }, [
    title,
    template,
    data,
    themeSettings,
    photoUrl,
    backgroundUrl,
    cvId,
    language,
  ])

  const handleLogout = async () => {
    await supabase.auth.signOut()

    router.push(`/auth/login?lang=${language}`)
    router.refresh()
  }

  return (
    <div
      dir={isEn ? 'ltr' : 'rtl'}
      className="min-h-screen bg-background flex flex-col"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet
              open={isMobileNavOpen}
              onOpenChange={setIsMobileNavOpen}
            >
              <SheetTrigger
                asChild
                className="lg:hidden"
              >
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side={isEn ? 'left' : 'right'}
                className="w-80"
              >
                <SheetHeader>
                  <SheetTitle>
                    {isEn
                      ? 'Sections'
                      : 'الأقسام'}
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6">
                  <SectionNav />
                </div>
              </SheetContent>
            </Sheet>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 hover:opacity-80"
            >
              <FileText className="h-6 w-6 text-primary" />

              <span className="font-bold text-lg hidden sm:inline">
                {isEn
                  ? 'CV Builder'
                  : 'بناء السيرة الذاتية'}
              </span>
            </Link>

            <ChevronRight className="h-4 w-4 text-muted-foreground hidden sm:inline" />

            <Input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-40 sm:w-56 h-9 text-sm"
              placeholder={
                isEn
                  ? 'Resume title'
                  : 'عنوان السيرة الذاتية'
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={isSaving || !isDirty}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Save
                    className={
                      isEn
                        ? 'h-4 w-4 mr-2'
                        : 'h-4 w-4 ml-2'
                    }
                  />

                  <span className="hidden sm:inline">
                    {isEn ? 'Save' : 'حفظ'}
                  </span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />

              <span
                className={
                  isEn
                    ? 'hidden sm:inline ml-2'
                    : 'hidden sm:inline mr-2'
                }
              >
                {isEn ? 'Logout' : 'خروج'}
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Tabs */}
      <div className="lg:hidden border-b bg-background">
        <Tabs
          value={activeTab}
          onValueChange={(v) =>
            setActiveTab(
              v as typeof activeTab
            )
          }
        >
          <TabsList className="w-full justify-start rounded-none h-12 bg-transparent p-0">
            <TabsTrigger
              value="edit"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              <Settings
                className={
                  isEn
                    ? 'h-4 w-4 mr-2'
                    : 'h-4 w-4 ml-2'
                }
              />

              {isEn ? 'Edit' : 'تحرير'}
            </TabsTrigger>

            <TabsTrigger
              value="preview"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              <Eye
                className={
                  isEn
                    ? 'h-4 w-4 mr-2'
                    : 'h-4 w-4 ml-2'
                }
              />

              {isEn ? 'Preview' : 'معاينة'}
            </TabsTrigger>

            <TabsTrigger
              value="settings"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              <Settings
                className={
                  isEn
                    ? 'h-4 w-4 mr-2'
                    : 'h-4 w-4 ml-2'
                }
              />

              {isEn ? 'Settings' : 'إعدادات'}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-l bg-muted/30 p-4 overflow-y-auto">
          <SectionNav />
        </aside>

        {/* Main Editor */}
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Mobile */}
          <div className="lg:hidden flex-1 overflow-y-auto">
            {activeTab === 'edit' && (
              <div className="p-4">
                <SectionContent />
              </div>
            )}

            {activeTab === 'preview' && (
              <div className="p-4 bg-muted/30">
                <div className="max-w-[210mm] mx-auto transform scale-[0.6] origin-top">
                  <CVPreview />
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="p-4 space-y-4">
                <SettingsPanel />
                <PDFExport />
              </div>
            )}
          </div>

          {/* Desktop Editor */}
          <div className="hidden lg:block flex-1 p-6 overflow-y-auto border-l">
            <SectionContent />
          </div>

          {/* Desktop Preview */}
          <div className="hidden lg:flex flex-col w-[420px] bg-muted/30 border-l">
            <div className="flex-1 overflow-y-auto p-4">
              <div className="transform scale-[0.45] origin-top">
                <CVPreview />
              </div>
            </div>

            <div className="p-4 border-t bg-background">
              <PDFExport />
            </div>
          </div>
        </main>

        {/* Desktop Settings */}
        <aside className="hidden lg:block w-72 border-l bg-background p-4 overflow-y-auto">
          <h2 className="font-semibold mb-4">
            {isEn ? 'Settings' : 'الإعدادات'}
          </h2>

          <SettingsPanel />
        </aside>
      </div>
    </div>
  )
}