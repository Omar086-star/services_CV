'use client'

import { useCVStore } from '@/lib/stores/cv-store'
import { Certificate } from '@/lib/types/cv'
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

interface SortableCertificateItemProps {
  certificate: Certificate
  onUpdate: (id: string, data: Partial<Certificate>) => void
  onRemove: (id: string) => void
}

function SortableCertificateItem({ certificate, onUpdate, onRemove }: SortableCertificateItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: certificate.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Card ref={setNodeRef} style={style} className="relative">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <button
            type="button"
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </button>
          <h4 className="font-medium flex-1">
            {certificate.name || 'شهادة جديدة'}
          </h4>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(certificate.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>اسم الشهادة *</Label>
            <Input
              value={certificate.name}
              onChange={(e) => onUpdate(certificate.id, { name: e.target.value })}
              placeholder="AWS Solutions Architect"
            />
          </div>
          <div className="space-y-2">
            <Label>الجهة المانحة</Label>
            <Input
              value={certificate.issuer}
              onChange={(e) => onUpdate(certificate.id, { issuer: e.target.value })}
              placeholder="Amazon Web Services"
            />
          </div>
          <div className="space-y-2">
            <Label>تاريخ الحصول</Label>
            <Input
              type="month"
              value={certificate.date}
              onChange={(e) => onUpdate(certificate.id, { date: e.target.value })}
              dir="ltr"
              className="text-left"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function CertificatesForm() {
  const { data, addCertificate, updateCertificate, removeCertificate, reorderCertificates } = useCVStore()
  const { certificates } = data

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = certificates.findIndex((c) => c.id === active.id)
      const newIndex = certificates.findIndex((c) => c.id === over.id)
      reorderCertificates(arrayMove(certificates, oldIndex, newIndex))
    }
  }

  const handleAdd = () => {
    addCertificate({
      id: generateId(),
      name: '',
      issuer: '',
      date: '',
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">الشهادات</h3>
        <Button type="button" onClick={handleAdd} size="sm">
          <Plus className="h-4 w-4 ml-2" />
          إضافة شهادة
        </Button>
      </div>

      {certificates.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
          <p>لم تتم إضافة أي شهادات بعد</p>
          <p className="text-sm mt-1">انقر على &quot;إضافة شهادة&quot; للبدء</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={certificates.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {certificates.map((certificate) => (
                <SortableCertificateItem
                  key={certificate.id}
                  certificate={certificate}
                  onUpdate={updateCertificate}
                  onRemove={removeCertificate}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
