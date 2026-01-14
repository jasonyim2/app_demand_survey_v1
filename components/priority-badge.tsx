import { cn } from "@/lib/utils"

interface PriorityBadgeProps {
  priority: "높음" | "중간" | "낮음"
  size?: "sm" | "md"
}

const priorityStyles = {
  높음: "bg-[oklch(0.95_0.1_25)] text-[oklch(0.5_0.18_25)]",
  중간: "bg-[oklch(0.95_0.08_80)] text-[oklch(0.5_0.15_80)]",
  낮음: "bg-[oklch(0.95_0.06_180)] text-[oklch(0.45_0.12_180)]",
}

export function PriorityBadge({ priority, size = "sm" }: PriorityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        priorityStyles[priority],
      )}
    >
      {priority}
    </span>
  )
}
