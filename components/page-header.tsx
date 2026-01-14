import type React from "react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface PageHeaderProps {
  title: string
  backHref?: string
  children?: React.ReactNode
}

export function PageHeader({ title, backHref, children }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {backHref && (
            <Link
              href={backHref}
              className="flex h-8 w-8 items-center justify-center rounded-full text-primary transition-colors hover:bg-muted"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
          )}
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        </div>
        {children}
      </div>
    </header>
  )
}
