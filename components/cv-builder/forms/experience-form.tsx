'use client'

import { useSearchParams } from 'next/navigation'
import { useCVStore } from '@/lib/stores/cv-store'
import { Experience } from '@/lib/types/cv'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
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

interface SortableExperienceItemProps {
  experience: Experience
  onUpdate: (id: string, data: Partial<Experience>) => void
  onRemove: (id: string) => void
  isEn: boolean
}

function SortableExperienceItem({
  experience,
  onUpdate,
  onRemove,
  isEn
}: SortableExperienceItemProps) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: experience.id
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (

    <Card
      ref={setNodeRef}
      style={style}
      className="relative"
    >

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

            {
              experience.position ||
              experience.company ||
              (isEn
                ? 'New Experience'
                : 'خبرة جديدة')
            }

          </h4>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(experience.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4"/>
          </Button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="space-y-2">

            <Label>
              {isEn
                ? 'Company / Organization *'
                : 'الشركة / المؤسسة *'}
            </Label>

            <Input
              value={experience.company}
              onChange={(e)=>
                onUpdate(
                  experience.id,
                  {
                    company:e.target.value
                  }
                )
              }
              placeholder={
                isEn
                  ? 'Google'
                  : 'اسم الشركة'
              }
            />

          </div>

          <div className="space-y-2">

            <Label>
              {isEn
                ? 'Job Title *'
                : 'المسمى الوظيفي *'}
            </Label>

            <Input
              value={experience.position}
              onChange={(e)=>
                onUpdate(
                  experience.id,
                  {
                    position:e.target.value
                  }
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

            <Label>
              {isEn
                ? 'Start Date'
                : 'تاريخ البداية'}
            </Label>

            <Input
              type="month"
              value={experience.startDate}
              onChange={(e)=>
                onUpdate(
                  experience.id,
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
                ? 'End Date'
                : 'تاريخ النهاية'}
            </Label>

            <Input
              type="month"
              value={experience.endDate}
              onChange={(e)=>
                onUpdate(
                  experience.id,
                  {
                    endDate:e.target.value
                  }
                )
              }
              disabled={experience.current}
              dir="ltr"
              className="text-left"
            />

          </div>

        </div>

        <div className="flex items-center gap-2">

          <Checkbox
            id={`current-${experience.id}`}
            checked={experience.current}
            onCheckedChange={(checked)=>

              onUpdate(
                experience.id,
                {
                  current:checked as boolean,
                  endDate:''
                }
              )

            }
          />

          <Label
            htmlFor={`current-${experience.id}`}
            className="text-sm cursor-pointer"
          >

            {isEn
              ? 'Currently working here'
              : 'أعمل هنا حالياً'}

          </Label>

        </div>

        <div className="space-y-2">

          <Label>

            {isEn
              ? 'Description & Responsibilities'
              : 'الوصف والمسؤوليات'}

          </Label>

          <Textarea
            value={experience.description}
            onChange={(e)=>

              onUpdate(
                experience.id,
                {
                  description:e.target.value
                }
              )

            }
            placeholder={
              isEn
                ? 'Describe your responsibilities and achievements...'
                : 'صف مسؤولياتك وإنجازاتك في هذا الدور...'
            }
            rows={3}
          />

        </div>

      </CardContent>

    </Card>

  )
}

export function ExperienceForm() {

  const searchParams = useSearchParams()

  const isEn =
    searchParams.get('lang') === 'en'

  const {
    data,
    addExperience,
    updateExperience,
    removeExperience,
    reorderExperiences
  } = useCVStore()

  const { experiences } = data

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(
      KeyboardSensor,
      {
        coordinateGetter:
        sortableKeyboardCoordinates
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
      experiences.findIndex(
        (e)=>e.id===active.id
      )

      const newIndex =
      experiences.findIndex(
        (e)=>e.id===over.id
      )

      reorderExperiences(
        arrayMove(
          experiences,
          oldIndex,
          newIndex
        )
      )

    }

  }

  const handleAdd=()=>{

    addExperience({

      id:generateId(),
      company:'',
      position:'',
      startDate:'',
      endDate:'',
      current:false,
      description:''

    })

  }

  return (

    <div className="space-y-4">

      <div className="flex items-center justify-between">

        <h3 className="text-lg font-semibold">

          {isEn
            ? 'Work Experience'
            : 'الخبرات العملية'}

        </h3>

        <Button
          type="button"
          onClick={handleAdd}
          size="sm"
        >

          <Plus className="h-4 w-4 ml-2"/>

          {isEn
            ? 'Add Experience'
            : 'إضافة خبرة'}

        </Button>

      </div>

      {experiences.length===0 ? (

        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">

          <p>

            {isEn
              ? 'No experiences yet'
              : 'لم تتم إضافة أي خبرات بعد'}

          </p>

          <p className="text-sm mt-1">

            {isEn
              ? 'Click Add Experience to start'
              : 'انقر على إضافة خبرة للبدء'}

          </p>

        </div>

      ) : (

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >

          <SortableContext
            items={experiences.map((e)=>e.id)}
            strategy={verticalListSortingStrategy}
          >

            <div className="space-y-4">

              {experiences.map((experience)=>(

                <SortableExperienceItem
                  key={experience.id}
                  experience={experience}
                  onUpdate={updateExperience}
                  onRemove={removeExperience}
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