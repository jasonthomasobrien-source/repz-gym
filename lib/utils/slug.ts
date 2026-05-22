export function nameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export function slugToName(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
