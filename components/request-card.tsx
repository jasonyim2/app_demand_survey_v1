"use client"

import Link from "next/link"
import type { AppRequest } from "@/lib/types"
import { CategoryBadge } from "@/components/category-badge"
import { CategoryIcon } from "@/components/category-icon"
// import { getStudentById } from "@/lib/mock-data"
import { ChevronRight } from "lucide-react"

interface RequestCardProps {
  request: AppRequest
  studentName?: string
}

export function RequestCard({ request, studentName }: RequestCardProps) {
  // const student = getStudentById(request.student_id)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Link href={`/requests/${request.request_id}`}>
      <div className="card-tap rounded-2xl bg-card p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <div className="flex gap-3">
          <CategoryIcon category={request.admin_category} />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between">
              <h3 className="text-[17px] font-bold text-[#1c1c1e]">{request.app_title}</h3>
              <ChevronRight className="h-5 w-5 shrink-0 text-[#c7c7cc]" />
            </div>
            <p className="mt-0.5 text-[13px] text-[#8e8e93]">
              {request.surveyor_category} • {formatDate(request.submitted_at)}
            </p>
            <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[#3a3a3c]">{request.current_issue}</p>
            <div className="mt-3 flex items-center justify-between">
              <CategoryBadge category={request.admin_category} />
              {studentName && <span className="text-[12px] text-[#8e8e93]">{studentName}</span>}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
