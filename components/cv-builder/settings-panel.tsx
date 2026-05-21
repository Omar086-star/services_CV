'use client'

import { useCVStore } from '@/lib/stores/cv-store'
import { ARABIC_FONTS } from '@/lib/types/cv'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Palette, Type, Layout, Image as ImageIcon } from 'lucide-react'

const PRESET_COLORS = [
  { name: 'أزرق داكن', value: '#1e40af' },
  { name: 'أخضر', value: '#166534' },
  { name: 'أحمر', value: '#991b1b' },
  { name: 'بنفسجي', value: '#6d28d9' },
  { name: 'برتقالي', value: '#c2410c' },
  { name: 'رمادي', value: '#374151' },
]

export function SettingsPanel() {
  const { 
    template, 
    setTemplate, 
    themeSettings, 
    updateThemeSetting 
  } = useCVStore()

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Layout className="h-4 w-4" />
            القالب
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={template}
            onValueChange={(value) => setTemplate(value as 'modern' | 'minimal')}
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
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
              >
                <div className="w-full h-16 bg-primary/20 rounded mb-2 flex">
                  <div className="w-2/3 h-full bg-primary/10"></div>
                  <div className="w-1/3 h-full bg-primary/30"></div>
                </div>
                <span className="text-sm font-medium">عصري</span>
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
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
              >
                <div className="w-full h-16 bg-muted rounded mb-2">
                  <div className="w-3/4 h-3 bg-primary/30 mx-auto mt-2 rounded"></div>
                  <div className="w-1/2 h-2 bg-primary/20 mx-auto mt-2 rounded"></div>
                </div>
                <span className="text-sm font-medium">بسيط</span>
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
            الألوان
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>اللون الأساسي</Label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => updateThemeSetting('primaryColor', color.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    themeSettings.primaryColor === color.value
                      ? 'border-foreground scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
              <Input
                type="color"
                value={themeSettings.primaryColor}
                onChange={(e) => updateThemeSetting('primaryColor', e.target.value)}
                className="w-8 h-8 p-0 border-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>لون التمييز</Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={themeSettings.accentColor}
                onChange={(e) => updateThemeSetting('accentColor', e.target.value)}
                className="w-10 h-10 p-0 border-0 cursor-pointer"
              />
              <Input
                type="text"
                value={themeSettings.accentColor}
                onChange={(e) => updateThemeSetting('accentColor', e.target.value)}
                className="flex-1 font-mono text-sm"
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>لون الخلفية</Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={themeSettings.backgroundColor}
                onChange={(e) => updateThemeSetting('backgroundColor', e.target.value)}
                className="w-10 h-10 p-0 border-0 cursor-pointer"
              />
              <Input
                type="text"
                value={themeSettings.backgroundColor}
                onChange={(e) => updateThemeSetting('backgroundColor', e.target.value)}
                className="flex-1 font-mono text-sm"
                dir="ltr"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Type className="h-4 w-4" />
            الخط
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>نوع الخط</Label>
            <Select
              value={themeSettings.fontFamily}
              onValueChange={(value) => updateThemeSetting('fontFamily', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ARABIC_FONTS.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <span style={{ fontFamily: font.value }}>{font.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>حجم الخط</Label>
            <Select
              value={themeSettings.fontSize}
              onValueChange={(value) => updateThemeSetting('fontSize', value as 'small' | 'medium' | 'large')}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">صغير</SelectItem>
                <SelectItem value="medium">متوسط</SelectItem>
                <SelectItem value="large">كبير</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Photo Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <ImageIcon className="h-4 w-4" />
            الصورة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="showPhoto">إظهار الصورة</Label>
            <Switch
              id="showPhoto"
              checked={themeSettings.showPhoto}
              onCheckedChange={(checked) => updateThemeSetting('showPhoto', checked)}
            />
          </div>

          {themeSettings.showPhoto && (
            <div className="space-y-2">
              <Label>شكل الصورة</Label>
              <RadioGroup
                value={themeSettings.photoShape}
                onValueChange={(value) => updateThemeSetting('photoShape', value as 'circle' | 'square' | 'rounded')}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="circle" id="circle" />
                  <Label htmlFor="circle" className="cursor-pointer">دائري</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="rounded" id="rounded" />
                  <Label htmlFor="rounded" className="cursor-pointer">مستدير</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="square" id="square" />
                  <Label htmlFor="square" className="cursor-pointer">مربع</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
