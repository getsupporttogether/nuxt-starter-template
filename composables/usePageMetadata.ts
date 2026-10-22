export function usePageMetadata(page?: { title: string }) {
  useSeoMeta({
    title: `${page?.title || 'Page not found'} | Leslie Tourish Psychotherapy`,
    description: 'Phase 1 design preview. Original website content is awaiting migration and approval.',
    robots: 'noindex, nofollow, noarchive',
  })
}
