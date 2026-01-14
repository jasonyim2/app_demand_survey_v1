import { cn } from "@/lib/utils"
import { categoryColors } from "@/lib/types"

interface CategoryBadgeProps {
  category: string
  className?: string
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const colorClass = categoryColors[category] || categoryColors["기타"]

  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", colorClass, className)}
    >
      {category}
    </span>
  )
}
