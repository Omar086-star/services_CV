'use client'

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

export function SectionContent() {
  const { activeSection } = useCVStore()

  return (
    <div className="space-y-6">
      {activeSection === 'personalInfo' && (
        <>
          <PhotoUpload />
          <PersonalInfoForm />
        </>
      )}
      {activeSection === 'experiences' && <ExperienceForm />}
      {activeSection === 'education' && <EducationForm />}
      {activeSection === 'skills' && <SkillsForm />}
      {activeSection === 'languages' && <LanguagesForm />}
      {activeSection === 'projects' && <ProjectsForm />}
      {activeSection === 'certificates' && <CertificatesForm />}
    </div>
  )
}
