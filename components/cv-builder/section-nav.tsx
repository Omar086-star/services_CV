'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCVStore } from '@/lib/stores/cv-store'
import { CVSection, SECTION_LABELS_AR, SECTION_LABELS_EN } from '@/lib/types/cv'
import { cn } from '@/lib/utils'
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Languages,
  FolderOpen,
  Award,
  GripVertical,
} from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const SECTION_ICONS: Record<CVSection, React.ComponentType<{ className?: string }>> = {
  personalInfo: User,
  experiences: Briefcase,
  education: GraduationCap,
  skills: Wrench,
  languages: Languages,
  projects: FolderOpen,
  certificates: Award,
}

interface SortableSectionItemProps {
  section: CVSection
  isActive: boolean
  onClick: () => void
  label: string
}

function SortableSectionItem({
  section,
  isActive,
  onClick,
  label,
}: SortableSectionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const Icon = SECTION_ICONS[section]

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-muted'
      )}
      onClick={onClick}
    >
      <button
        type="button"
        className={cn(
          'cursor-grab active:cursor-grabbing p-1 rounded',
          isActive
            ? 'hover:bg-primary-foreground/20'
            : 'hover:bg-muted-foreground/20'
        )}
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <Icon className="h-5 w-5" />

      <span className="font-medium text-sm">
        {label}
      </span>
    </div>
  )
}

export function SectionNav() {
  const searchParams = useSearchParams()
  const isEn = searchParams.get('lang') === 'en'

  const {
    activeSection,
    setActiveSection,
    sectionOrder,
    setSectionOrder,
  } = useCVStore()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  if (!mounted) return null

  const labels = isEn ? SECTION_LABELS_EN : SECTION_LABELS_AR

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = sectionOrder.findIndex((s) => s === active.id)
      const newIndex = sectionOrder.findIndex((s) => s === over.id)

      setSectionOrder(arrayMove(sectionOrder, oldIndex, newIndex))
    }
  }

  return (
    <nav className="space-y-1">
      <p className="text-xs text-muted-foreground mb-2 px-3">
        {isEn ? 'Drag to reorder sections' : 'اسحب لإعادة ترتيب الأقسام'}
      </p>

      <DndContext
        id="cv-sections-dnd"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sectionOrder}
          strategy={verticalListSortingStrategy}
        >
          {sectionOrder.map((section) => (
            <SortableSectionItem
              key={section}
              section={section}
              label={labels[section]}
              isActive={activeSection === section}
              onClick={() => setActiveSection(section)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </nav>
  )
}