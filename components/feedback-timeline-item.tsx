"use client"

import Link from "next/link"
import type { Feedback } from "@/lib/types"
// import { getRequestById } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface FeedbackTimelineItemProps {
  feedback: Feedback
}

const feedbackTypeStyles: Record<string, string> = {
  긍정적: "bg-[#34c759]/10 text-[#34c759]",
  개선필요: "bg-[#ff9500]/10 text-[#ff9500]",
  제안: "bg-[#007aff]/10 text-[#007aff]",
  답변: "bg-[#af52de]/10 text-[#af52de]",
  안내: "bg-[#5ac8fa]/10 text-[#5ac8fa]",
}

const decisionStyles: Record<string, { bg: string; dot: string }> = {
  확정: { bg: "bg-[#34c759]", dot: "bg-[#34c759]" },
  보류: { bg: "bg-[#ff9500]", dot: "bg-[#ff9500]" },
  반려: { bg: "bg-[#ff3b30]", dot: "bg-[#ff3b30]" },
}

export function FeedbackTimelineItem({ feedback }: FeedbackTimelineItemProps) {
  // const request = getRequestById(feedback.request_id)
  const request: any = null // Placeholder

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const decisionStyle = feedback.decision ? decisionStyles[feedback.decision] : null

  return (
    <Link href={`/feedback/${feedback.feedback_id}`}>
      <div className="card-tap relative pl-6">
        {/* Timeline dot */}
        <div className={cn("absolute left-0 top-2 h-3 w-3 rounded-full", decisionStyle?.dot || "bg-[#c7c7cc]")} />
        {/* Timeline line */}
        <div className="absolute bottom-0 left-[5px] top-5 w-[2px] bg-[#e5e5ea]" />

        <div className="rounded-2xl bg-card p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-semibold",
                feedbackTypeStyles[feedback.feedback_type] || feedbackTypeStyles["안내"],
              )}
            >
              {feedback.feedback_type}
            </span>
            <span className="text-[12px] text-[#8e8e93]">{formatDate(feedback.created_at)}</span>
          </div>

          {/* Request title */}
          {request && <p className="mt-2 text-[13px] font-medium text-[#007aff]">{request.app_title}</p>}

          {/* Content bubble */}
          <div className="mt-2 rounded-2xl bg-[#f2f2f7] p-3">
            <p className="text-[15px] leading-relaxed text-[#1c1c1e]">{feedback.content}</p>
          </div>

          {/* Decision status */}
          {feedback.decision && (
            <div className="mt-3 flex items-center gap-2">
              <div className={cn("h-2 w-2 rounded-full", decisionStyle?.dot)} />
              <span className="text-[13px] font-medium text-[#3a3a3c]">{feedback.decision}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
