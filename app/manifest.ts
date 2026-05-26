export default function manifest() {
  return {
    name: 'منصة بناء السيرة الذاتية',
    short_name: 'CV Builder',
    description: 'إنشاء سيرة ذاتية احترافية بالعربية والإنجليزية',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}