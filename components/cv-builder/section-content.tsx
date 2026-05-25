'use client'

import { useSearchParams } from 'next/navigation'
import { useCVStore } from '@/lib/stores/cv-store'

import {
  PersonalInfoForm,
  ExperienceForm,
  EducationForm,
  SkillsForm,
  LanguagesForm,
  ProjectsForm,
  CertificatesForm,
} from './forms'

import { PhotoUpload } from './photo-upload'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function SectionContent() {
  const searchParams = useSearchParams()

  const isEn =
    searchParams.get('lang') === 'en'

  const {
    activeSection,
    setActiveSection,
    sectionOrder,
  } = useCVStore()

  const currentIndex =
    sectionOrder.indexOf(activeSection)

  const nextSection =
    currentIndex < sectionOrder.length - 1
      ? sectionOrder[currentIndex + 1]
      : null

  const previousSection =
    currentIndex > 0
      ? sectionOrder[currentIndex - 1]
      : null

  return (
    <div className="space-y-6">

      {activeSection === 'personalInfo' && (
        <>
          <PhotoUpload />
          <PersonalInfoForm />
        </>
      )}

      {activeSection === 'experiences' &&
        <ExperienceForm />
      }

      {activeSection === 'education' &&
        <EducationForm />
      }

      {activeSection === 'skills' &&
        <SkillsForm />
      }

      {activeSection === 'languages' &&
        <LanguagesForm />
      }

      {activeSection === 'projects' &&
        <ProjectsForm />
      }

      {activeSection === 'certificates' &&
        <CertificatesForm />
      }

      {/* أزرار التنقل */}

      <div className="pt-8 border-t flex justify-between">

        <Button
          variant="outline"
          disabled={!previousSection}
          onClick={()=>{
            if(previousSection){
              setActiveSection(
                previousSection
              )
            }
          }}
        >

          {isEn ? (
            <>
              <ArrowLeft className="mr-2 h-4 w-4"/>
              Previous
            </>
          ) : (
            <>
              <ArrowRight className="ml-2 h-4 w-4"/>
              السابق
            </>
          )}

        </Button>

        <Button
          disabled={!nextSection}
          onClick={()=>{
            if(nextSection){
              setActiveSection(
                nextSection
              )
            }
          }}
        >

          {isEn ? (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4"/>
            </>
          ) : (
            <>
              التالي
              <ArrowLeft className="mr-2 h-4 w-4"/>
            </>
          )}

        </Button>

      </div>

    </div>
  )
}