// CV Data Types

export type CVLanguage = 'ar' | 'en'

export type SkillLevel =
  | 'مبتدئ'
  | 'متوسط'
  | 'متقدم'
  | 'خبير'
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'Expert'

export type LanguageLevel =
  | 'مبتدئ'
  | 'متوسط'
  | 'متقدم'
  | 'لغة أم'
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'Native'

export interface PersonalInfo {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  location: string
  linkedin?: string
  website?: string
  summary?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface Skill {
  id: string
  name: string
  level: SkillLevel
}

export interface Language {
  id: string
  name: string
  level: LanguageLevel
}

export interface Project {
  id: string
  name: string
  description: string
  link?: string
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  date: string
}

export interface CVData {
  personalInfo: PersonalInfo
  experiences: Experience[]
  education: Education[]
  skills: Skill[]
  languages: Language[]
  projects: Project[]
  certificates: Certificate[]
}

export interface ThemeSettings {
  primaryColor: string
  fontFamily: string
  fontSize: 'small' | 'medium' | 'large'
  layout: 'single' | 'double'
  showPhoto: boolean
  photoShape: 'circle' | 'square' | 'rounded'
  backgroundColor: string
  accentColor: string
}

export interface CV {
  id: string
  user_id: string
  title: string
  language?: CVLanguage
  template: 'modern' | 'minimal'
  data: CVData
  theme_settings: ThemeSettings
  photo_url?: string
  background_url?: string
  created_at: string
  updated_at: string
}

export type CVSection =
  | 'personalInfo'
  | 'experiences'
  | 'education'
  | 'skills'
  | 'languages'
  | 'projects'
  | 'certificates'

export const DEFAULT_CV_DATA: CVData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
  },
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  projects: [],
  certificates: [],
}

export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  primaryColor: '#1e40af',
  fontFamily: 'Noto Kufi Arabic',
  fontSize: 'medium',
  layout: 'double',
  showPhoto: true,
  photoShape: 'circle',
  backgroundColor: '#ffffff',
  accentColor: '#3b82f6',
}

export const ARABIC_FONTS = [
  { name: 'Noto Kufi Arabic', value: 'Noto Kufi Arabic' },
  { name: 'Tajawal', value: 'Tajawal' },
  { name: 'Cairo', value: 'Cairo' },
  { name: 'Amiri', value: 'Amiri' },
  { name: 'Almarai', value: 'Almarai' },
] as const

export const SECTION_LABELS_AR: Record<CVSection, string> = {
  personalInfo: 'المعلومات الشخصية',
  experiences: 'الخبرات العملية',
  education: 'التعليم',
  skills: 'المهارات',
  languages: 'اللغات',
  projects: 'المشاريع',
  certificates: 'الشهادات',
}

export const SECTION_LABELS_EN: Record<CVSection, string> = {
  personalInfo: 'Personal Information',
  experiences: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  languages: 'Languages',
  projects: 'Projects',
  certificates: 'Certificates',
}

export const SECTION_LABELS = SECTION_LABELS_AR