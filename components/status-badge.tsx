import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "접수" | "검토중" | "진행" | "완료"
  size?: "sm" | "md"
}

const statusStyles = {
  접수: "bg-[oklch(0.95_0.08_250)] text-[oklch(0.45_0.15_250)]",
  검토중: "bg-[oklch(0.95_0.08_80)] text-[oklch(0.5_0.15_80)]",
  진행: "bg-[oklch(0.95_0.08_150)] text-[oklch(0.45_0.15_150)]",
  완료: "bg-[oklch(0.95_0.08_160)] text-[oklch(0.4_0.12_160)]",
}

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  )
}
