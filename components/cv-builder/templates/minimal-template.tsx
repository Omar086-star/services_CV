'use client'

import { useCVStore } from '@/lib/stores/cv-store'
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react'

function formatDate(dateString: string) {
  if (!dateString) return ''
  const [year, month] = dateString.split('-')
  const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
  return `${months[parseInt(month) - 1]} ${year}`
}

export function MinimalTemplate() {
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
          <div key="experiences" className="mb-8">
            <h2 
              className="text-lg font-semibold mb-4 uppercase tracking-wide"
              style={{ color: themeSettings.primaryColor }}
            >
              الخبرات العملية
            </h2>
            <div className="space-y-5 border-r-2 pr-4" style={{ borderColor: themeSettings.accentColor }}>
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-sm" style={{ color: themeSettings.primaryColor }}>{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap" dir="ltr">
                      {formatDate(exp.startDate)} - {exp.current ? 'حتى الآن' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      case 'education':
        if (education.length === 0) return null
        return (
          <div key="education" className="mb-8">
            <h2 
              className="text-lg font-semibold mb-4 uppercase tracking-wide"
              style={{ color: themeSettings.primaryColor }}
            >
              التعليم
            </h2>
            <div className="space-y-5 border-r-2 pr-4" style={{ borderColor: themeSettings.accentColor }}>
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree} {edu.field && `- ${edu.field}`}</h3>
                      <p className="text-sm" style={{ color: themeSettings.primaryColor }}>{edu.institution}</p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap" dir="ltr">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600 mt-1">المعدل التراكمي: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      case 'skills':
        if (skills.length === 0) return null
        return (
          <div key="skills" className="mb-8">
            <h2 
              className="text-lg font-semibold mb-4 uppercase tracking-wide"
              style={{ color: themeSettings.primaryColor }}
            >
              المهارات
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span 
                  key={skill.id}
                  className="px-3 py-1 text-sm rounded-full text-white"
                  style={{ backgroundColor: themeSettings.primaryColor }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )
      case 'languages':
        if (languages.length === 0) return null
        return (
          <div key="languages" className="mb-8">
            <h2 
              className="text-lg font-semibold mb-4 uppercase tracking-wide"
              style={{ color: themeSettings.primaryColor }}
            >
              اللغات
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {languages.map((lang) => (
                <div key={lang.id} className="flex items-center justify-between">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-sm text-gray-500">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        )
      case 'projects':
        if (projects.length === 0) return null
        return (
          <div key="projects" className="mb-8">
            <h2 
              className="text-lg font-semibold mb-4 uppercase tracking-wide"
              style={{ color: themeSettings.primaryColor }}
            >
              المشاريع
            </h2>
            <div className="space-y-4 border-r-2 pr-4" style={{ borderColor: themeSettings.accentColor }}>
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                  {proj.link && (
                    <a 
                      href={proj.link} 
                      className="text-sm underline"
                      style={{ color: themeSettings.accentColor }}
                      dir="ltr"
                    >
                      {proj.link}
                    </a>
                  )}
                  {proj.description && (
                    <p className="text-sm text-gray-600 mt-1">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      case 'certificates':
        if (certificates.length === 0) return null
        return (
          <div key="certificates" className="mb-8">
            <h2 
              className="text-lg font-semibold mb-4 uppercase tracking-wide"
              style={{ color: themeSettings.primaryColor }}
            >
              الشهادات
            </h2>
            <div className="space-y-3">
              {certificates.map((cert) => (
                <div key={cert.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-500">{cert.issuer}</p>
                  </div>
                  {cert.date && (
                    <span className="text-sm text-gray-400">{formatDate(cert.date)}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div 
      className="w-full min-h-[297mm] bg-white text-gray-900 shadow-lg p-8"
      style={{ 
        fontFamily: themeSettings.fontFamily,
        backgroundColor: themeSettings.backgroundColor,
      }}
    >
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: themeSettings.primaryColor }}>
        {themeSettings.showPhoto && imageUrl && (
          <div 
            className="w-32 h-32 mx-auto mb-4 overflow-hidden"
            style={{
              borderRadius: themeSettings.photoShape === 'circle' ? '50%' : themeSettings.photoShape === 'rounded' ? '0.5rem' : '0',
              border: `3px solid ${themeSettings.primaryColor}`
            }}
          >
            <img src={imageUrl} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <h1 
          className="text-3xl font-bold mb-1"
          style={{ color: themeSettings.primaryColor }}
        >
          {personalInfo.fullName || 'الاسم الكامل'}
        </h1>
        <p className="text-xl text-gray-600 mb-4">{personalInfo.jobTitle || 'المسمى الوظيفي'}</p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
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

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 
            className="text-lg font-semibold mb-4 uppercase tracking-wide"
            style={{ color: themeSettings.primaryColor }}
          >
            نبذة مختصرة
          </h2>
          <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Content sections in order */}
      {sectionOrder.map(section => renderSection(section))}
    </div>
  )
}
