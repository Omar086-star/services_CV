'use client'

import { useSearchParams } from 'next/navigation'
import { useCVStore } from '@/lib/stores/cv-store'
import { Skill } from '@/lib/types/cv'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import {
  Plus,
  Trash2,
  GripVertical
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

function generateId() {
  return Math.random().toString(36).substring(2, 9)
}

const ARABIC_LEVELS: Skill['level'][] = [
  'مبتدئ',
  'متوسط',
  'متقدم',
  'خبير'
]

const ENGLISH_LEVELS: Skill['level'][] = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert'
]

interface SortableSkillItemProps {
  skill: Skill
  onUpdate: (
    id: string,
    data: Partial<Skill>
  ) => void
  onRemove: (id: string) => void
  isEn: boolean
}

function SortableSkillItem({
  skill,
  onUpdate,
  onRemove,
  isEn
}: SortableSkillItemProps) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: skill.id
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const levels =
    isEn
      ? ENGLISH_LEVELS
      : ARABIC_LEVELS

  return (

    <Card
      ref={setNodeRef}
      style={style}
      className="relative"
    >

      <CardContent className="p-4">

        <div className="flex items-center gap-4">

          <button
            type="button"
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground"/>
          </button>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="space-y-1">

              <Label className="text-xs">

                {isEn
                  ? 'Skill'
                  : 'المهارة'}

              </Label>

              <Input
                value={skill.name}
                onChange={(e)=>

                  onUpdate(
                    skill.id,
                    {
                      name:e.target.value
                    }
                  )

                }
                placeholder={
                  isEn
                    ? 'JavaScript'
                    : 'جافاسكربت'
                }
              />

            </div>

            <div className="space-y-1">

              <Label className="text-xs">

                {isEn
                  ? 'Level'
                  : 'المستوى'}

              </Label>

              <Select
                value={skill.level}
                onValueChange={(value)=>

                  onUpdate(
                    skill.id,
                    {
                      level:value as Skill['level']
                    }
                  )

                }
              >

                <SelectTrigger>

                  <SelectValue
                    placeholder={
                      isEn
                        ? 'Select level'
                        : 'اختر المستوى'
                    }
                  />

                </SelectTrigger>

                <SelectContent>

                  {levels.map((level)=>(

                    <SelectItem
                      key={level}
                      value={level}
                    >
                      {level}
                    </SelectItem>

                  ))}

                </SelectContent>

              </Select>

            </div>

          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={()=>
              onRemove(skill.id)
            }
            className="text-destructive hover:text-destructive"
          >

            <Trash2 className="h-4 w-4"/>

          </Button>

        </div>

      </CardContent>

    </Card>

  )
}

export function SkillsForm() {

  const searchParams =
    useSearchParams()

  const isEn =
    searchParams.get('lang') === 'en'

  const {
    data,
    addSkill,
    updateSkill,
    removeSkill,
    reorderSkills
  } = useCVStore()

  const { skills } = data

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

    const {
      active,
      over
    } = event

    if (
      over &&
      active.id !== over.id
    ) {

      const oldIndex =
      skills.findIndex(
        s=>s.id===active.id
      )

      const newIndex =
      skills.findIndex(
        s=>s.id===over.id
      )

      reorderSkills(
        arrayMove(
          skills,
          oldIndex,
          newIndex
        )
      )

    }

  }

  const handleAdd=()=>{

    addSkill({

      id:generateId(),
      name:'',
      level:
        isEn
          ? 'Intermediate'
          : 'متوسط'

    })

  }

  return (

    <div className="space-y-4">

      <div className="flex items-center justify-between">

        <h3 className="text-lg font-semibold">

          {isEn
            ? 'Skills'
            : 'المهارات'}

        </h3>

        <Button
          type="button"
          onClick={handleAdd}
          size="sm"
        >

          <Plus className="h-4 w-4 ml-2"/>

          {isEn
            ? 'Add Skill'
            : 'إضافة مهارة'}

        </Button>

      </div>

      {skills.length===0 ? (

        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">

          <p>

            {isEn
              ? 'No skills added yet'
              : 'لم تتم إضافة أي مهارات بعد'}

          </p>

          <p className="text-sm mt-1">

            {isEn
              ? 'Click Add Skill to start'
              : 'انقر على إضافة مهارة للبدء'}

          </p>

        </div>

      ) : (

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >

          <SortableContext
            items={skills.map(
              s=>s.id
            )}
            strategy={
              verticalListSortingStrategy
            }
          >

            <div className="space-y-2">

              {skills.map((skill)=>(

                <SortableSkillItem
                  key={skill.id}
                  skill={skill}
                  onUpdate={updateSkill}
                  onRemove={removeSkill}
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