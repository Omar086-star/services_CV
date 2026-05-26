export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/builder', '/auth'],
    },
    sitemap: 'https://servicecv.edu-web.fr/sitemap.xml',
  }
}