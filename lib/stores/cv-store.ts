import { create } from 'zustand'
import { 
  CVData, 
  ThemeSettings, 
  DEFAULT_CV_DATA, 
  DEFAULT_THEME_SETTINGS,
  Experience,
  Education,
  Skill,
  Language,
  Project,
  Certificate,
  CVSection
} from '@/lib/types/cv'

interface CVState {
  // CV Data
  cvId: string | null
  title: string
  template: 'modern' | 'minimal'
  data: CVData
  themeSettings: ThemeSettings
  photoUrl: string | null
  backgroundUrl: string | null
  
  // UI State
  activeSection: CVSection
  isDirty: boolean
  isSaving: boolean
  sectionOrder: CVSection[]
  
  // Actions
  setCvId: (id: string | null) => void
  setTitle: (title: string) => void
  setTemplate: (template: 'modern' | 'minimal') => void
  setActiveSection: (section: CVSection) => void
  setPhotoUrl: (url: string | null) => void
  setBackgroundUrl: (url: string | null) => void
  setIsDirty: (isDirty: boolean) => void
  setIsSaving: (isSaving: boolean) => void
  setSectionOrder: (order: CVSection[]) => void
  
  // Personal Info
  updatePersonalInfo: (field: keyof CVData['personalInfo'], value: string) => void
  
  // Experience
  addExperience: (experience: Experience) => void
  updateExperience: (id: string, experience: Partial<Experience>) => void
  removeExperience: (id: string) => void
  reorderExperiences: (experiences: Experience[]) => void
  
  // Education
  addEducation: (education: Education) => void
  updateEducation: (id: string, education: Partial<Education>) => void
  removeEducation: (id: string) => void
  reorderEducation: (education: Education[]) => void
  
  // Skills
  addSkill: (skill: Skill) => void
  updateSkill: (id: string, skill: Partial<Skill>) => void
  removeSkill: (id: string) => void
  reorderSkills: (skills: Skill[]) => void
  
  // Languages
  addLanguage: (language: Language) => void
  updateLanguage: (id: string, language: Partial<Language>) => void
  removeLanguage: (id: string) => void
  reorderLanguages: (languages: Language[]) => void
  
  // Projects
  addProject: (project: Project) => void
  updateProject: (id: string, project: Partial<Project>) => void
  removeProject: (id: string) => void
  reorderProjects: (projects: Project[]) => void
  
  // Certificates
  addCertificate: (certificate: Certificate) => void
  updateCertificate: (id: string, certificate: Partial<Certificate>) => void
  removeCertificate: (id: string) => void
  reorderCertificates: (certificates: Certificate[]) => void
  
  // Theme
  updateThemeSetting: <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => void
  
  // Bulk Actions
  loadCV: (cv: {
    id: string
    title: string
    template: 'modern' | 'minimal'
    data: CVData
    theme_settings: ThemeSettings
    photo_url?: string | null
    background_url?: string | null
  }) => void
  resetCV: () => void
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
  // Initial State
  cvId: null,
  title: 'سيرتي الذاتية',
  template: 'modern',
  data: DEFAULT_CV_DATA,
  themeSettings: DEFAULT_THEME_SETTINGS,
  photoUrl: null,
  backgroundUrl: null,
  activeSection: 'personalInfo',
  isDirty: false,
  isSaving: false,
  sectionOrder: DEFAULT_SECTION_ORDER,
  
  // Basic Setters
  setCvId: (id) => set({ cvId: id }),
  setTitle: (title) => set({ title, isDirty: true }),
  setTemplate: (template) => set({ template, isDirty: true }),
  setActiveSection: (section) => set({ activeSection: section }),
  setPhotoUrl: (url) => set({ photoUrl: url, isDirty: true }),
  setBackgroundUrl: (url) => set({ backgroundUrl: url, isDirty: true }),
  setIsDirty: (isDirty) => set({ isDirty }),
  setIsSaving: (isSaving) => set({ isSaving }),
  setSectionOrder: (order) => set({ sectionOrder: order, isDirty: true }),
  
  // Personal Info
  updatePersonalInfo: (field, value) => set((state) => ({
    data: {
      ...state.data,
      personalInfo: { ...state.data.personalInfo, [field]: value },
    },
    isDirty: true,
  })),
  
  // Experience
  addExperience: (experience) => set((state) => ({
    data: { ...state.data, experiences: [...state.data.experiences, experience] },
    isDirty: true,
  })),
  updateExperience: (id, experience) => set((state) => ({
    data: {
      ...state.data,
      experiences: state.data.experiences.map((e) =>
        e.id === id ? { ...e, ...experience } : e
      ),
    },
    isDirty: true,
  })),
  removeExperience: (id) => set((state) => ({
    data: {
      ...state.data,
      experiences: state.data.experiences.filter((e) => e.id !== id),
    },
    isDirty: true,
  })),
  reorderExperiences: (experiences) => set((state) => ({
    data: { ...state.data, experiences },
    isDirty: true,
  })),
  
  // Education
  addEducation: (education) => set((state) => ({
    data: { ...state.data, education: [...state.data.education, education] },
    isDirty: true,
  })),
  updateEducation: (id, education) => set((state) => ({
    data: {
      ...state.data,
      education: state.data.education.map((e) =>
        e.id === id ? { ...e, ...education } : e
      ),
    },
    isDirty: true,
  })),
  removeEducation: (id) => set((state) => ({
    data: {
      ...state.data,
      education: state.data.education.filter((e) => e.id !== id),
    },
    isDirty: true,
  })),
  reorderEducation: (education) => set((state) => ({
    data: { ...state.data, education },
    isDirty: true,
  })),
  
  // Skills
  addSkill: (skill) => set((state) => ({
    data: { ...state.data, skills: [...state.data.skills, skill] },
    isDirty: true,
  })),
  updateSkill: (id, skill) => set((state) => ({
    data: {
      ...state.data,
      skills: state.data.skills.map((s) =>
        s.id === id ? { ...s, ...skill } : s
      ),
    },
    isDirty: true,
  })),
  removeSkill: (id) => set((state) => ({
    data: {
      ...state.data,
      skills: state.data.skills.filter((s) => s.id !== id),
    },
    isDirty: true,
  })),
  reorderSkills: (skills) => set((state) => ({
    data: { ...state.data, skills },
    isDirty: true,
  })),
  
  // Languages
  addLanguage: (language) => set((state) => ({
    data: { ...state.data, languages: [...state.data.languages, language] },
    isDirty: true,
  })),
  updateLanguage: (id, language) => set((state) => ({
    data: {
      ...state.data,
      languages: state.data.languages.map((l) =>
        l.id === id ? { ...l, ...language } : l
      ),
    },
    isDirty: true,
  })),
  removeLanguage: (id) => set((state) => ({
    data: {
      ...state.data,
      languages: state.data.languages.filter((l) => l.id !== id),
    },
    isDirty: true,
  })),
  reorderLanguages: (languages) => set((state) => ({
    data: { ...state.data, languages },
    isDirty: true,
  })),
  
  // Projects
  addProject: (project) => set((state) => ({
    data: { ...state.data, projects: [...state.data.projects, project] },
    isDirty: true,
  })),
  updateProject: (id, project) => set((state) => ({
    data: {
      ...state.data,
      projects: state.data.projects.map((p) =>
        p.id === id ? { ...p, ...project } : p
      ),
    },
    isDirty: true,
  })),
  removeProject: (id) => set((state) => ({
    data: {
      ...state.data,
      projects: state.data.projects.filter((p) => p.id !== id),
    },
    isDirty: true,
  })),
  reorderProjects: (projects) => set((state) => ({
    data: { ...state.data, projects },
    isDirty: true,
  })),
  
  // Certificates
  addCertificate: (certificate) => set((state) => ({
    data: { ...state.data, certificates: [...state.data.certificates, certificate] },
    isDirty: true,
  })),
  updateCertificate: (id, certificate) => set((state) => ({
    data: {
      ...state.data,
      certificates: state.data.certificates.map((c) =>
        c.id === id ? { ...c, ...certificate } : c
      ),
    },
    isDirty: true,
  })),
  removeCertificate: (id) => set((state) => ({
    data: {
      ...state.data,
      certificates: state.data.certificates.filter((c) => c.id !== id),
    },
    isDirty: true,
  })),
  reorderCertificates: (certificates) => set((state) => ({
    data: { ...state.data, certificates },
    isDirty: true,
  })),
  
  // Theme
  updateThemeSetting: (key, value) => set((state) => ({
    themeSettings: { ...state.themeSettings, [key]: value },
    isDirty: true,
  })),
  
  // Bulk Actions
  loadCV: (cv) => set({
    cvId: cv.id,
    title: cv.title,
    template: cv.template,
    data: cv.data,
    themeSettings: cv.theme_settings,
    photoUrl: cv.photo_url || null,
    backgroundUrl: cv.background_url || null,
    isDirty: false,
  }),
  
  resetCV: () => set({
    cvId: null,
    title: 'سيرتي الذاتية',
    template: 'modern',
    data: DEFAULT_CV_DATA,
    themeSettings: DEFAULT_THEME_SETTINGS,
    photoUrl: null,
    backgroundUrl: null,
    activeSection: 'personalInfo',
    isDirty: false,
    sectionOrder: DEFAULT_SECTION_ORDER,
  }),
}))
