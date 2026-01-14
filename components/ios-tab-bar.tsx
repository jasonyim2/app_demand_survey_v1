"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MessageSquareMore, Users, Inbox } from "lucide-react"

const tabs = [
  {
    name: "Requests",
    href: "/",
    icon: MessageSquareMore,
  },
  {
    name: "Feedback",
    href: "/feedback",
    icon: Inbox,
  },
  {
    name: "Students",
    href: "/students",
    icon: Users,
  },
]

export function IOSTabBar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname.startsWith("/requests")
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-[#e5e5ea]/50">
      <div className="mx-auto flex h-[84px] max-w-lg items-end justify-around pb-6">
        {tabs.map((tab) => {
          const active = isActive(tab.href)
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-1 px-6 py-2 transition-all duration-200",
                active ? "text-[#007aff]" : "text-[#8e8e93]",
              )}
            >
              <tab.icon
                className={cn("h-6 w-6 transition-transform duration-200", active && "scale-110")}
                strokeWidth={active ? 2 : 1.5}
              />
              <span className="text-[10px] font-medium">{tab.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
