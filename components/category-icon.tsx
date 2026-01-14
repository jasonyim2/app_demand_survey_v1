import { cn } from "@/lib/utils"

interface CategoryIconProps {
  category: string
  className?: string
}

const categoryGradients: Record<string, string> = {
  업무자동화: "from-[#007aff] to-[#5ac8fa]",
  건강관리: "from-[#34c759] to-[#30d158]",
  교육학습: "from-[#af52de] to-[#bf5af2]",
  금융재테크: "from-[#ff9500] to-[#ffcc00]",
  소통커뮤니티: "from-[#ff2d55] to-[#ff375f]",
  일상생활: "from-[#5ac8fa] to-[#64d2ff]",
  기타: "from-[#8e8e93] to-[#aeaeb2]",
}

const categoryIcons: Record<string, string> = {
  업무자동화: "⚙️",
  건강관리: "💊",
  교육학습: "📚",
  금융재테크: "💰",
  소통커뮤니티: "💬",
  일상생활: "🏠",
  기타: "📱",
}

export function CategoryIcon({ category, className }: CategoryIconProps) {
  const gradient = categoryGradients[category] || categoryGradients["기타"]

  return (
    <div
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-sm",
        gradient,
        className,
      )}
    >
      <span className="text-lg">{categoryIcons[category] || "📱"}</span>
    </div>
  )
}
