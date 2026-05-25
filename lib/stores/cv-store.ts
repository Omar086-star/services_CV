import { create } from 'zustand'
import {
  CVData,
  ThemeSettings,
  DEFAULT_THEME_SETTINGS,
  Experience,
  Education,
  Skill,
  Language,
  Project,
  Certificate,
  CVSection,
} from '@/lib/types/cv'

type CVLanguage = 'ar' | 'en'

const getDefaultTitle = (language: CVLanguage) =>
  language === 'en' ? 'My Resume' : 'سيرتي الذاتية'

const createDefaultCVData = (
  language: CVLanguage
): CVData => ({
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
})

interface CVState {
  cvId: string | null
  title: string
  language: CVLanguage
  template: 'modern' | 'minimal'
  data: CVData
  themeSettings: ThemeSettings
  photoUrl: string | null
  backgroundUrl: string | null

  activeSection: CVSection
  isDirty: boolean
  isSaving: boolean
  sectionOrder: CVSection[]

  setCvId: (id: string | null) => void
  setTitle: (title: string) => void
  setLanguage: (language: CVLanguage) => void
  setTemplate: (template: 'modern' | 'minimal') => void
  setActiveSection: (section: CVSection) => void
  setPhotoUrl: (url: string | null) => void
  setBackgroundUrl: (url: string | null) => void
  setIsDirty: (isDirty: boolean) => void
  setIsSaving: (isSaving: boolean) => void
  setSectionOrder: (order: CVSection[]) => void

  updatePersonalInfo: (field: keyof CVData['personalInfo'], value: string) => void

  addExperience: (experience: Experience) => void
  updateExperience: (id: string, experience: Partial<Experience>) => void
  removeExperience: (id: string) => void
  reorderExperiences: (experiences: Experience[]) => void

  addEducation: (education: Education) => void
  updateEducation: (id: string, education: Partial<Education>) => void
  removeEducation: (id: string) => void
  reorderEducation: (education: Education[]) => void

  addSkill: (skill: Skill) => void
  updateSkill: (id: string, skill: Partial<Skill>) => void
  removeSkill: (id: string) => void
  reorderSkills: (skills: Skill[]) => void

  addLanguage: (language: Language) => void
  updateLanguage: (id: string, language: Partial<Language>) => void
  removeLanguage: (id: string) => void
  reorderLanguages: (languages: Language[]) => void

  addProject: (project: Project) => void
  updateProject: (id: string, project: Partial<Project>) => void
  removeProject: (id: string) => void
  reorderProjects: (projects: Project[]) => void

  addCertificate: (certificate: Certificate) => void
  updateCertificate: (id: string, certificate: Partial<Certificate>) => void
  removeCertificate: (id: string) => void
  reorderCertificates: (certificates: Certificate[]) => void

  updateThemeSetting: <K extends keyof ThemeSettings>(
    key: K,
    value: ThemeSettings[K]
  ) => void

  loadCV: (cv: {
    id: string
    title: string
    language?: CVLanguage
    template: 'modern' | 'minimal'
    data: CVData
    theme_settings: ThemeSettings
    photo_url?: string | null
    background_url?: string | null
  }) => void

  resetCV: (language?: CVLanguage) => void
}

const DEFAULT_SECTION_ORDER: CVSection[] = [
  'personalInfo',
  'experiences',
  'education',
  'skills',
  'languages',
  'projects',
  'certificates',
]

export const useCVStore = create<CVState>((set) => ({
  cvId: null,
  language: 'ar',
  title: getDefaultTitle('ar'),
  template: 'modern',
  data: createDefaultCVData('ar'),
  themeSettings: DEFAULT_THEME_SETTINGS,
  photoUrl: null,
  backgroundUrl: null,
  activeSection: 'personalInfo',
  isDirty: false,
  isSaving: false,
  sectionOrder: DEFAULT_SECTION_ORDER,

  setCvId: (id) => set({ cvId: id }),
  setTitle: (title) => set({ title, isDirty: true }),

  setLanguage: (language) =>
    set((state) => ({
      language,
      title:
        state.title === 'سيرتي الذاتية' || state.title === 'My Resume'
          ? getDefaultTitle(language)
          : state.title,
      isDirty: true,
    })),

  setTemplate: (template) => set({ template, isDirty: true }),
  setActiveSection: (section) => set({ activeSection: section }),
  setPhotoUrl: (url) => set({ photoUrl: url, isDirty: true }),
  setBackgroundUrl: (url) => set({ backgroundUrl: url, isDirty: true }),
  setIsDirty: (isDirty) => set({ isDirty }),
  setIsSaving: (isSaving) => set({ isSaving }),
  setSectionOrder: (order) => set({ sectionOrder: order, isDirty: true }),

  updatePersonalInfo: (field, value) =>
    set((state) => ({
      data: {
        ...state.data,
        personalInfo: {
          ...state.data.personalInfo,
          [field]: value,
        },
      },
      isDirty: true,
    })),

  addExperience: (experience) =>
    set((state) => ({
      data: {
        ...state.data,
        experiences: [...state.data.experiences, experience],
      },
      isDirty: true,
    })),

  updateExperience: (id, experience) =>
    set((state) => ({
      data: {
        ...state.data,
        experiences: state.data.experiences.map((e) =>
          e.id === id ? { ...e, ...experience } : e
        ),
      },
      isDirty: true,
    })),

  removeExperience: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        experiences: state.data.experiences.filter((e) => e.id !== id),
      },
      isDirty: true,
    })),

  reorderExperiences: (experiences) =>
    set((state) => ({
      data: { ...state.data, experiences },
      isDirty: true,
    })),

  addEducation: (education) =>
    set((state) => ({
      data: {
        ...state.data,
        education: [...state.data.education, education],
      },
      isDirty: true,
    })),

  updateEducation: (id, education) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.map((e) =>
          e.id === id ? { ...e, ...education } : e
        ),
      },
      isDirty: true,
    })),

  removeEducation: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.filter((e) => e.id !== id),
      },
      isDirty: true,
    })),

  reorderEducation: (education) =>
    set((state) => ({
      data: { ...state.data, education },
      isDirty: true,
    })),

  addSkill: (skill) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: [...state.data.skills, skill],
      },
      isDirty: true,
    })),

  updateSkill: (id, skill) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.map((s) =>
          s.id === id ? { ...s, ...skill } : s
        ),
      },
      isDirty: true,
    })),

  removeSkill: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.filter((s) => s.id !== id),
      },
      isDirty: true,
    })),

  reorderSkills: (skills) =>
    set((state) => ({
      data: { ...state.data, skills },
      isDirty: true,
    })),

  addLanguage: (language) =>
    set((state) => ({
      data: {
        ...state.data,
        languages: [...state.data.languages, language],
      },
      isDirty: true,
    })),

  updateLanguage: (id, language) =>
    set((state) => ({
      data: {
        ...state.data,
        languages: state.data.languages.map((l) =>
          l.id === id ? { ...l, ...language } : l
        ),
      },
      isDirty: true,
    })),

  removeLanguage: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        languages: state.data.languages.filter((l) => l.id !== id),
      },
      isDirty: true,
    })),

  reorderLanguages: (languages) =>
    set((state) => ({
      data: { ...state.data, languages },
      isDirty: true,
    })),

  addProject: (project) =>
    set((state) => ({
      data: {
        ...state.data,
        projects: [...state.data.projects, project],
      },
      isDirty: true,
    })),

  updateProject: (id, project) =>
    set((state) => ({
      data: {
        ...state.data,
        projects: state.data.projects.map((p) =>
          p.id === id ? { ...p, ...project } : p
        ),
      },
      isDirty: true,
    })),

  removeProject: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        projects: state.data.projects.filter((p) => p.id !== id),
      },
      isDirty: true,
    })),

  reorderProjects: (projects) =>
    set((state) => ({
      data: { ...state.data, projects },
      isDirty: true,
    })),

  addCertificate: (certificate) =>
    set((state) => ({
      data: {
        ...state.data,
        certificates: [...state.data.certificates, certificate],
      },
      isDirty: true,
    })),

  updateCertificate: (id, certificate) =>
    set((state) => ({
      data: {
        ...state.data,
        certificates: state.data.certificates.map((c) =>
          c.id === id ? { ...c, ...certificate } : c
        ),
      },
      isDirty: true,
    })),

  removeCertificate: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        certificates: state.data.certificates.filter((c) => c.id !== id),
      },
      isDirty: true,
    })),

  reorderCertificates: (certificates) =>
    set((state) => ({
      data: { ...state.data, certificates },
      isDirty: true,
    })),

  updateThemeSetting: (key, value) =>
    set((state) => ({
      themeSettings: {
        ...state.themeSettings,
        [key]: value,
      },
      isDirty: true,
    })),

  loadCV: (cv) =>
    set({
      cvId: cv.id,
      title: cv.title,
      language: cv.language ?? 'ar',
      template: cv.template,
      data: cv.data,
      themeSettings: cv.theme_settings,
      photoUrl: cv.photo_url || null,
      backgroundUrl: cv.background_url || null,
      isDirty: false,
    }),

  resetCV: (language = 'ar') =>
    set({
      cvId: null,
      language,
      title: getDefaultTitle(language),
      template: 'modern',
      data: createDefaultCVData(language),
      themeSettings: DEFAULT_THEME_SETTINGS,
      photoUrl: null,
      backgroundUrl: null,
      activeSection: 'personalInfo',
      isDirty: false,
      sectionOrder: DEFAULT_SECTION_ORDER,
    }),
}))