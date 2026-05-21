'use client'

import { useCVStore } from '@/lib/stores/cv-store'
import { Language } from '@/lib/types/cv'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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

const LANGUAGE_LEVELS: Language['level'][] = ['مبتدئ', 'متوسط', 'متقدم', 'لغة أم']

interface SortableLanguageItemProps {
  language: Language
  onUpdate: (id: string, data: Partial<Language>) => void
  onRemove: (id: string) => void
}

function SortableLanguageItem({ language, onUpdate, onRemove }: SortableLanguageItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: language.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Card ref={setNodeRef} style={style} className="relative">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </button>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs">اللغة</Label>
              <Input
                value={language.name}
                onChange={(e) => onUpdate(language.id, { name: e.target.value })}
                placeholder="العربية"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">المستوى</Label>
              <Select
                value={language.level}
                onValueChange={(value) => onUpdate(language.id, { level: value as Language['level'] })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر المستوى" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
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
            onClick={() => onRemove(language.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function LanguagesForm() {
  const { data, addLanguage, updateLanguage, removeLanguage, reorderLanguages } = useCVStore()
  const { languages } = data

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = languages.findIndex((l) => l.id === active.id)
      const newIndex = languages.findIndex((l) => l.id === over.id)
      reorderLanguages(arrayMove(languages, oldIndex, newIndex))
    }
  }

  const handleAdd = () => {
    addLanguage({
      id: generateId(),
      name: '',
      level: 'متوسط',
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">اللغات</h3>
        <Button type="button" onClick={handleAdd} size="sm">
          <Plus className="h-4 w-4 ml-2" />
          إضافة لغة
        </Button>
      </div>

      {languages.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
          <p>لم تتم إضافة أي لغات بعد</p>
          <p className="text-sm mt-1">انقر على &quot;إضافة لغة&quot; للبدء</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={languages.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {languages.map((language) => (
                <SortableLanguageItem
                  key={language.id}
                  language={language}
                  onUpdate={updateLanguage}
                  onRemove={removeLanguage}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
