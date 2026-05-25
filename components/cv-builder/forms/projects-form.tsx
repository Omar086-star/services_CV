'use client'

import { useSearchParams } from 'next/navigation'
import { useCVStore } from '@/lib/stores/cv-store'
import { Project } from '@/lib/types/cv'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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

interface SortableProjectItemProps {
  project: Project
  onUpdate: (
    id: string,
    data: Partial<Project>
  ) => void
  onRemove: (id: string) => void
  isEn: boolean
}

function SortableProjectItem({
  project,
  onUpdate,
  onRemove,
  isEn
}: SortableProjectItemProps) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: project.id
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
              project.name ||
              (isEn
                ? 'New Project'
                : 'مشروع جديد')
            }

          </h4>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() =>
              onRemove(project.id)
            }
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4"/>
          </Button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="space-y-2">

            <Label>
              {isEn
                ? 'Project Name *'
                : 'اسم المشروع *'}
            </Label>

            <Input
              value={project.name}
              onChange={(e)=>

                onUpdate(
                  project.id,
                  {
                    name:e.target.value
                  }
                )

              }
              placeholder={
                isEn
                  ? 'Task Management App'
                  : 'تطبيق إدارة المهام'
              }
            />

          </div>

          <div className="space-y-2">

            <Label>
              {isEn
                ? 'Link'
                : 'الرابط'}
            </Label>

            <Input
              value={project.link || ''}
              onChange={(e)=>

                onUpdate(
                  project.id,
                  {
                    link:e.target.value
                  }
                )

              }
              placeholder="https://github.com/..."
              dir="ltr"
              className="text-left"
            />

          </div>

        </div>

        <div className="space-y-2">

          <Label>

            {isEn
              ? 'Description'
              : 'الوصف'}

          </Label>

          <Textarea
            value={project.description}
            onChange={(e)=>

              onUpdate(
                project.id,
                {
                  description:e.target.value
                }
              )

            }
            placeholder={
              isEn
                ? 'Describe the project and technologies used...'
                : 'صف المشروع والتقنيات المستخدمة...'
            }
            rows={3}
          />

        </div>

      </CardContent>

    </Card>

  )
}

export function ProjectsForm() {

  const searchParams =
    useSearchParams()

  const isEn =
    searchParams.get('lang') === 'en'

  const {
    data,
    addProject,
    updateProject,
    removeProject,
    reorderProjects
  } = useCVStore()

  const { projects } = data

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
      projects.findIndex(
        p=>p.id===active.id
      )

      const newIndex =
      projects.findIndex(
        p=>p.id===over.id
      )

      reorderProjects(
        arrayMove(
          projects,
          oldIndex,
          newIndex
        )
      )

    }

  }

  const handleAdd=()=>{

    addProject({

      id:generateId(),
      name:'',
      description:'',
      link:''

    })

  }

  return (

    <div className="space-y-4">

      <div className="flex items-center justify-between">

        <h3 className="text-lg font-semibold">

          {isEn
            ? 'Projects'
            : 'المشاريع'}

        </h3>

        <Button
          type="button"
          onClick={handleAdd}
          size="sm"
        >

          <Plus className="h-4 w-4 ml-2"/>

          {isEn
            ? 'Add Project'
            : 'إضافة مشروع'}

        </Button>

      </div>

      {projects.length===0 ? (

        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">

          <p>

            {isEn
              ? 'No projects added yet'
              : 'لم تتم إضافة أي مشاريع بعد'}

          </p>

          <p className="text-sm mt-1">

            {isEn
              ? 'Click Add Project to start'
              : 'انقر على إضافة مشروع للبدء'}

          </p>

        </div>

      ) : (

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >

          <SortableContext
            items={projects.map(
              p=>p.id
            )}
            strategy={
              verticalListSortingStrategy
            }
          >

            <div className="space-y-4">

              {projects.map((project)=>(

                <SortableProjectItem
                  key={project.id}
                  project={project}
                  onUpdate={updateProject}
                  onRemove={removeProject}
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