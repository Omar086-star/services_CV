'use client'

import { useCVStore } from '@/lib/stores/cv-store'
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react'

function formatDate(dateString: string) {
  if (!dateString) return ''
  const [year, month] = dateString.split('-')
  const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
  return `${months[parseInt(month) - 1]} ${year}`
}

export function ModernTemplate() {
  const { data, themeSettings, photoUrl, sectionOrder } = useCVStore()
  const { personalInfo, experiences, education, skills, languages, projects, certificates } = data

  const imageUrl = photoUrl ? `/api/file?pathname=${encodeURIComponent(photoUrl)}` : null

  const renderSection = (section: string) => {
    switch (section) {
      case 'personalInfo':
        return null // Handled in header
      case 'experiences':
        if (experiences.length === 0) return null
        return (
          <div key="experiences" className="mb-6">
            <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: themeSettings.primaryColor, color: themeSettings.primaryColor }}>
              الخبرات العملية
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{exp.position}</h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500" dir="ltr">
                      {formatDate(exp.startDate)} - {exp.current ? 'حتى الآن' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      case 'education':
        if (education.length === 0) return null
        return (
          <div key="education" className="mb-6">
            <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: themeSettings.primaryColor, color: themeSettings.primaryColor }}>
              التعليم
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{edu.degree} - {edu.field}</h3>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                    </div>
                    <span className="text-xs text-gray-500" dir="ltr">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600 mt-1">المعدل: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      case 'projects':
        if (projects.length === 0) return null
        return (
          <div key="projects" className="mb-6">
            <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: themeSettings.primaryColor, color: themeSettings.primaryColor }}>
              المشاريع
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{proj.name}</h3>
                    {proj.link && (
                      <a href={proj.link} className="text-xs" style={{ color: themeSettings.accentColor }} dir="ltr">
                        {proj.link}
                      </a>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      case 'skills':
        return null // Handled in sidebar
      case 'languages':
        return null // Handled in sidebar
      case 'certificates':
        return null // Handled in sidebar
      default:
        return null
    }
  }

  const mainSections = sectionOrder.filter(s => ['experiences', 'education', 'projects'].includes(s))
  const sidebarSections = ['skills', 'languages', 'certificates']

  return (
    <div 
      className="w-full min-h-[297mm] bg-white text-gray-900 shadow-lg"
      style={{ 
        fontFamily: themeSettings.fontFamily,
        backgroundColor: themeSettings.backgroundColor,
      }}
    >
      {/* Header */}
      <div 
        className="p-6 text-white"
        style={{ backgroundColor: themeSettings.primaryColor }}
      >
        <div className="flex items-center gap-6">
          {themeSettings.showPhoto && imageUrl && (
            <div 
              className="w-28 h-28 bg-white/20 flex-shrink-0 overflow-hidden"
              style={{
                borderRadius: themeSettings.photoShape === 'circle' ? '50%' : themeSettings.photoShape === 'rounded' ? '0.5rem' : '0'
              }}
            >
              <img src={imageUrl} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{personalInfo.fullName || 'الاسم الكامل'}</h1>
            <p className="text-xl opacity-90 mt-1">{personalInfo.jobTitle || 'المسمى الوظيفي'}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm opacity-90">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span dir="ltr">{personalInfo.email}</span>
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">{personalInfo.phone}</span>
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {personalInfo.location}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-4 mt-2 text-sm opacity-90">
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  <span dir="ltr">{personalInfo.linkedin}</span>
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span dir="ltr">{personalInfo.website}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: themeSettings.primaryColor, color: themeSettings.primaryColor }}>
                نبذة مختصرة
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Main sections */}
          {mainSections.map(section => renderSection(section))}
        </div>

        {/* Sidebar */}
        <div className="w-64 p-6 bg-gray-50 border-r border-gray-200">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: themeSettings.primaryColor, color: themeSettings.primaryColor }}>
                المهارات
              </h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <span className="text-sm">{skill.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: themeSettings.primaryColor, color: themeSettings.primaryColor }}>
                اللغات
              </h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex items-center justify-between">
                    <span className="text-sm">{lang.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: themeSettings.primaryColor, color: themeSettings.primaryColor }}>
                الشهادات
              </h2>
              <div className="space-y-3">
                {certificates.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="text-sm font-medium">{cert.name}</h3>
                    <p className="text-xs text-gray-600">{cert.issuer}</p>
                    {cert.date && (
                      <p className="text-xs text-gray-500">{formatDate(cert.date)}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
