export function usePageMetadata(page?: { title: string }) {
  useSeoMeta({
    title: `${page?.title || 'Page not found'} | Leslie Tourish Psychotherapy`,
    robots: 'noindex, nofollow, noarchive',
  })
}
