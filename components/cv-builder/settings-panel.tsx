'use client'

import { useSearchParams } from 'next/navigation'
import { useCVStore } from '@/lib/stores/cv-store'
import { ARABIC_FONTS } from '@/lib/types/cv'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Palette,
  Type,
  Layout,
  Image as ImageIcon,
} from 'lucide-react'

const PRESET_COLORS = [
  {
    nameAr: 'أزرق داكن',
    nameEn: 'Dark Blue',
    value: '#1e40af',
  },
  {
    nameAr: 'أخضر',
    nameEn: 'Green',
    value: '#166534',
  },
  {
    nameAr: 'أحمر',
    nameEn: 'Red',
    value: '#991b1b',
  },
  {
    nameAr: 'بنفسجي',
    nameEn: 'Purple',
    value: '#6d28d9',
  },
  {
    nameAr: 'برتقالي',
    nameEn: 'Orange',
    value: '#c2410c',
  },
  {
    nameAr: 'رمادي',
    nameEn: 'Gray',
    value: '#374151',
  },
]

export function SettingsPanel() {
  const searchParams = useSearchParams()
  const isEn = searchParams.get('lang') === 'en'

  const {
    template,
    setTemplate,
    themeSettings,
    updateThemeSetting,
  } = useCVStore()

  return (
    <div className="space-y-6">

      {/* Template */}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Layout className="h-4 w-4" />
            {isEn ? 'Template' : 'القالب'}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <RadioGroup
            value={template}
            onValueChange={(value) =>
              setTemplate(value as 'modern' | 'minimal')
            }
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem
                value="modern"
                id="modern"
                className="peer sr-only"
              />

              <Label
                htmlFor="modern"
                className="flex flex-col items-center rounded-md border-2 border-muted bg-popover p-4 cursor-pointer hover:bg-accent peer-data-[state=checked]:border-primary"
              >
                <div className="w-full h-16 bg-primary/20 rounded mb-2 flex">
                  <div className="w-2/3 bg-primary/10"></div>
                  <div className="w-1/3 bg-primary/30"></div>
                </div>

                <span>
                  {isEn ? 'Modern' : 'عصري'}
                </span>
              </Label>
            </div>

            <div>
              <RadioGroupItem
                value="minimal"
                id="minimal"
                className="peer sr-only"
              />

              <Label
                htmlFor="minimal"
                className="flex flex-col items-center rounded-md border-2 border-muted bg-popover p-4 cursor-pointer hover:bg-accent peer-data-[state=checked]:border-primary"
              >
                <div className="w-full h-16 bg-muted rounded mb-2">
                  <div className="w-3/4 h-3 bg-primary/30 mx-auto mt-2 rounded"></div>
                  <div className="w-1/2 h-2 bg-primary/20 mx-auto mt-2 rounded"></div>
                </div>

                <span>
                  {isEn ? 'Minimal' : 'بسيط'}
                </span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Colors */}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Palette className="h-4 w-4" />
            {isEn ? 'Colors' : 'الألوان'}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div className="space-y-2">
            <Label>
              {isEn ? 'Primary Color' : 'اللون الأساسي'}
            </Label>

            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  title={isEn ? color.nameEn : color.nameAr}
                  onClick={() =>
                    updateThemeSetting(
                      'primaryColor',
                      color.value
                    )
                  }
                  className={`w-8 h-8 rounded-full border-2 ${
                    themeSettings.primaryColor === color.value
                      ? 'border-black scale-110'
                      : 'border-transparent'
                  }`}
                  style={{
                    backgroundColor: color.value,
                  }}
                />
              ))}

              <Input
                type="color"
                value={themeSettings.primaryColor}
                onChange={(e) =>
                  updateThemeSetting(
                    'primaryColor',
                    e.target.value
                  )
                }
                className="w-8 h-8 p-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              {isEn
                ? 'Accent Color'
                : 'لون التمييز'}
            </Label>

            <div className="flex gap-2">
              <Input
                type="color"
                value={themeSettings.accentColor}
                onChange={(e) =>
                  updateThemeSetting(
                    'accentColor',
                    e.target.value
                  )
                }
                className="w-10"
              />

              <Input
                value={themeSettings.accentColor}
                onChange={(e) =>
                  updateThemeSetting(
                    'accentColor',
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              {isEn
                ? 'Background Color'
                : 'لون الخلفية'}
            </Label>

            <div className="flex gap-2">
<Input
  type="text"
  value={themeSettings.backgroundColor}
  onChange={(e) => {
    let value = e.target.value.trim()

    if (!value.startsWith('#')) {
      value = `#${value.replace('#', '')}`
    }

    updateThemeSetting('backgroundColor', value)
  }}
  className="flex-1 font-mono text-sm"
  dir="ltr"
/>

              <Input
                value={themeSettings.backgroundColor}
                onChange={(e) =>
                  updateThemeSetting(
                    'backgroundColor',
                    e.target.value
                  )
                }
              />
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Fonts */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">

            <Type className="h-4 w-4"/>

            {isEn ? 'Typography' : 'الخط'}

          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div>
            <Label>
              {isEn ? 'Font Family' : 'نوع الخط'}
            </Label>

            <Select
              value={themeSettings.fontFamily}
              onValueChange={(value) =>
                updateThemeSetting(
                  'fontFamily',
                  value
                )
              }
            >
              <SelectTrigger>
                <SelectValue/>
              </SelectTrigger>

              <SelectContent>
                {ARABIC_FONTS.map((font)=>(
                  <SelectItem
                    key={font.value}
                    value={font.value}
                  >
                    {font.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

          </div>

        </CardContent>
      </Card>

      {/* Photo */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4"/>

            {isEn ? 'Photo' : 'الصورة'}
          </CardTitle>
        </CardHeader>

        <CardContent>

          <div className="flex items-center justify-between">

            <Label>
              {isEn
                ? 'Show Photo'
                : 'إظهار الصورة'}
            </Label>

            <Switch
              checked={themeSettings.showPhoto}
              onCheckedChange={(checked)=>
                updateThemeSetting(
                  'showPhoto',
                  checked
                )
              }
            />

          </div>

        </CardContent>
      </Card>

    </div>
  )
}