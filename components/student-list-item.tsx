"use client"

import Link from "next/link"
import type { Student } from "@/lib/types"
import { getInitials } from "@/lib/types"
import { ChevronRight } from "lucide-react"

interface StudentListItemProps {
  student: Student
}

export function StudentListItem({ student }: StudentListItemProps) {
  return (
    <Link href={`/students/${student.student_id}`}>
      <div className="card-tap flex items-center gap-3 bg-card px-4 py-3 transition-colors hover:bg-[#f2f2f7]">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5e5ea]">
          <span className="text-sm font-semibold text-[#3a3a3c]">{getInitials(student.name)}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[17px] font-semibold text-[#1c1c1e]">{student.name}</h3>
          <p className="text-[14px] text-[#8e8e93]">
            {student.job_status} • {student.age_group}
          </p>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-[#c7c7cc]" />
      </div>
    </Link>
  )
}
