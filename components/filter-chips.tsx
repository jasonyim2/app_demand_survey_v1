"use client"

import { cn } from "@/lib/utils"

interface FilterChipsProps<T extends string> {
  options: { value: T; label: string }[]
  selected: T | null
  onChange: (value: T | null) => void
}

export function FilterChips<T extends string>({ options, selected, onChange }: FilterChipsProps<T>) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <button
        onClick={() => onChange(null)}
        className={cn(
          "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
          selected === null ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80",
        )}
      >
        전체
      </button>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(selected === option.value ? null : option.value)}
          className={cn(
            "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
            selected === option.value
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
