'use client'

import { useCVStore } from '@/lib/stores/cv-store'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function PersonalInfoForm() {
  const { data, updatePersonalInfo } = useCVStore()
  const { personalInfo } = data

  const searchParams = useSearchParams()

  const lang =
    searchParams.get('lang') === 'en'
      ? 'en'
      : 'ar'

  const isEn = lang === 'en'

  return (
    <div className="space-y-4">

      <h3 className="text-lg font-semibold">
        {isEn
          ? 'Personal Information'
          : 'المعلومات الشخصية'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="space-y-2">
          <Label htmlFor="fullName">
            {isEn
              ? 'Full Name *'
              : 'الاسم الكامل *'}
          </Label>

          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) =>
              updatePersonalInfo(
                'fullName',
                e.target.value
              )
            }
            placeholder={
              isEn
                ? 'John Smith'
                : 'أحمد محمد'
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">
            {isEn
              ? 'Job Title *'
              : 'المسمى الوظيفي *'}
          </Label>

          <Input
            id="jobTitle"
            value={personalInfo.jobTitle}
            onChange={(e) =>
              updatePersonalInfo(
                'jobTitle',
                e.target.value
              )
            }
            placeholder={
              isEn
                ? 'Software Engineer'
                : 'مهندس برمجيات'
            }
          />
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="space-y-2">
          <Label htmlFor="email">
            {isEn
              ? 'Email *'
              : 'البريد الإلكتروني *'}
          </Label>

          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) =>
              updatePersonalInfo(
                'email',
                e.target.value
              )
            }
            placeholder="email@example.com"
            dir="ltr"
            className="text-left"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            {isEn
              ? 'Phone Number *'
              : 'رقم الهاتف *'}
          </Label>

          <Input
            id="phone"
            type="tel"
            value={personalInfo.phone}
            onChange={(e) =>
              updatePersonalInfo(
                'phone',
                e.target.value
              )
            }
            placeholder="+1 555 000 000"
            dir="ltr"
            className="text-left"
          />
        </div>

      </div>

      <div className="space-y-2">
        <Label htmlFor="location">
          {isEn
            ? 'Location'
            : 'الموقع'}
        </Label>

        <Input
          id="location"
          value={personalInfo.location}
          onChange={(e) =>
            updatePersonalInfo(
              'location',
              e.target.value
            )
          }
          placeholder={
            isEn
              ? 'New York, USA'
              : 'الجمهورية العربية السورية'
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="space-y-2">
          <Label htmlFor="linkedin">
            LinkedIn
          </Label>

          <Input
            id="linkedin"
            value={personalInfo.linkedin || ''}
            onChange={(e) =>
              updatePersonalInfo(
                'linkedin',
                e.target.value
              )
            }
            placeholder="linkedin.com/in/username"
            dir="ltr"
            className="text-left"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">
            {isEn
              ? 'Website'
              : 'الموقع الإلكتروني'}
          </Label>

          <Input
            id="website"
            value={personalInfo.website || ''}
            onChange={(e) =>
              updatePersonalInfo(
                'website',
                e.target.value
              )
            }
            placeholder="www.example.com"
            dir="ltr"
            className="text-left"
          />
        </div>

      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">
          {isEn
            ? 'Summary'
            : 'نبذة مختصرة'}
        </Label>

        <Textarea
          id="summary"
          value={personalInfo.summary || ''}
          onChange={(e) =>
            updatePersonalInfo(
              'summary',
              e.target.value
            )
          }
          placeholder={
            isEn
              ? 'Write a short summary about yourself and your experience...'
              : 'اكتب نبذة مختصرة عن نفسك وخبراتك...'
          }
          rows={4}
        />
      </div>

    </div>
  )
}