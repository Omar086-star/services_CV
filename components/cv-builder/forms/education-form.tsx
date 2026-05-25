'use client'

import { useSearchParams } from 'next/navigation'
import { useCVStore } from '@/lib/stores/cv-store'
import { Education } from '@/lib/types/cv'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Trash2, GripVertical } from 'lucide-react'

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

function generateId() {
  return Math.random().toString(36).substring(2, 9)
}

interface SortableEducationItemProps {
  education: Education
  onUpdate: (id: string, data: Partial<Education>) => void
  onRemove: (id: string) => void
  isEn: boolean
}

function SortableEducationItem({
  education,
  onUpdate,
  onRemove,
  isEn,
}: SortableEducationItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: education.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Card ref={setNodeRef} style={style} className="relative">
      <CardContent className="p-4 space-y-4">

        <div className="flex items-center gap-2">

          <button
            type="button"
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </button>

          <h4 className="font-medium flex-1">
            {education.degree ||
              education.institution ||
              (isEn
                ? 'New Education'
                : 'شهادة جديدة')}
          </h4>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(education.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="space-y-2">

            <Label>
              {isEn
                ? 'Institution *'
                : 'المؤسسة التعليمية *'}
            </Label>

            <Input
              value={education.institution}
              onChange={(e) =>
                onUpdate(
                  education.id,
                  {
                    institution:e.target.value
                  }
                )
              }
              placeholder={
                isEn
                  ? 'Harvard University'
                  : 'جامعة الملك سعود'
              }
            />

          </div>

          <div className="space-y-2">

            <Label>
              {isEn
                ? 'Degree *'
                : 'الدرجة العلمية *'}
            </Label>

            <Input
              value={education.degree}
              onChange={(e) =>
                onUpdate(
                  education.id,
                  {
                    degree:e.target.value
                  }
                )
              }
              placeholder={
                isEn
                  ? 'Bachelor Degree'
                  : 'بكالوريوس'
              }
            />

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="space-y-2">

            <Label>
              {isEn
                ? 'Field of Study'
                : 'التخصص'}
            </Label>

            <Input
              value={education.field}
              onChange={(e) =>
                onUpdate(
                  education.id,
                  {
                    field:e.target.value
                  }
                )
              }
              placeholder={
                isEn
                  ? 'Computer Science'
                  : 'علوم الحاسب'
              }
            />

          </div>

          <div className="space-y-2">

            <Label>
              {isEn
                ? 'GPA'
                : 'المعدل التراكمي'}
            </Label>

            <Input
              value={education.gpa || ''}
              onChange={(e) =>
                onUpdate(
                  education.id,
                  {
                    gpa:e.target.value
                  }
                )
              }
              placeholder="3.8 / 4.0"
              dir="ltr"
              className="text-left"
            />

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="space-y-2">

            <Label>
              {isEn
                ? 'Start Date'
                : 'تاريخ البداية'}
            </Label>

            <Input
              type="month"
              value={education.startDate}
              onChange={(e) =>
                onUpdate(
                  education.id,
                  {
                    startDate:e.target.value
                  }
                )
              }
              dir="ltr"
              className="text-left"
            />

          </div>

          <div className="space-y-2">

            <Label>
              {isEn
                ? 'Graduation Date'
                : 'تاريخ التخرج'}
            </Label>

            <Input
              type="month"
              value={education.endDate}
              onChange={(e) =>
                onUpdate(
                  education.id,
                  {
                    endDate:e.target.value
                  }
                )
              }
              dir="ltr"
              className="text-left"
            />

          </div>

        </div>

      </CardContent>
    </Card>
  )
}

export function EducationForm() {

  const searchParams = useSearchParams()

  const isEn =
    searchParams.get('lang') === 'en'

  const {
    data,
    addEducation,
    updateEducation,
    removeEducation,
    reorderEducation
  } = useCVStore()

  const { education } = data

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(
      KeyboardSensor,
      {
        coordinateGetter:
          sortableKeyboardCoordinates,
      }
    )
  )

  const handleDragEnd = (
    event: DragEndEvent
  ) => {

    const { active, over } = event

    if (
      over &&
      active.id !== over.id
    ) {

      const oldIndex =
        education.findIndex(
          (e) => e.id === active.id
        )

      const newIndex =
        education.findIndex(
          (e) => e.id === over.id
        )

      reorderEducation(
        arrayMove(
          education,
          oldIndex,
          newIndex
        )
      )
    }
  }

  const handleAdd = () => {
    addEducation({
      id: generateId(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    })
  }

  return (

    <div className="space-y-4">

      <div className="flex items-center justify-between">

        <h3 className="text-lg font-semibold">
          {isEn
            ? 'Education'
            : 'التعليم'}
        </h3>

        <Button
          type="button"
          onClick={handleAdd}
          size="sm"
        >
          <Plus className="h-4 w-4 ml-2" />

          {isEn
            ? 'Add Education'
            : 'إضافة شهادة'}
        </Button>

      </div>

      {education.length === 0 ? (

        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">

          <p>
            {isEn
              ? 'No education records yet'
              : 'لم تتم إضافة أي شهادات تعليمية بعد'}
          </p>

          <p className="text-sm mt-1">

            {isEn
              ? 'Click Add Education to start'
              : 'انقر على إضافة شهادة للبدء'}

          </p>

        </div>

      ) : (

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >

          <SortableContext
            items={education.map((e) => e.id)}
            strategy={verticalListSortingStrategy}
          >

            <div className="space-y-4">

              {education.map((edu) => (

                <SortableEducationItem
                  key={edu.id}
                  education={edu}
                  onUpdate={updateEducation}
                  onRemove={removeEducation}
                  isEn={isEn}
                />

              ))}

            </div>

          </SortableContext>

        </DndContext>

      )}

    </div>
  )
}