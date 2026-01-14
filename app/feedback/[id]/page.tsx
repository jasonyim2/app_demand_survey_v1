"use client"

import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { IOSTabBar } from "@/components/ios-tab-bar"
import { CategoryBadge } from "@/components/category-badge"
import { getFeedbackById, getRequestById, getStudentById } from "@/lib/mock-data"
import { getInitials } from "@/lib/types"
import { cn } from "@/lib/utils"
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  CheckCircle,
  Clock,
  XCircle,
  Mail,
  ArrowRight,
} from "lucide-react"

const feedbackTypeStyles: Record<string, string> = {
  긍정적: "bg-[#34c759]/10 text-[#34c759]",
  개선필요: "bg-[#ff9500]/10 text-[#ff9500]",
  제안: "bg-[#007aff]/10 text-[#007aff]",
  답변: "bg-[#af52de]/10 text-[#af52de]",
  안내: "bg-[#5ac8fa]/10 text-[#5ac8fa]",
}

const decisionConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
  확정: { icon: CheckCircle, color: "text-[#34c759]", bg: "bg-[#34c759]/10" },
  보류: { icon: Clock, color: "text-[#ff9500]", bg: "bg-[#ff9500]/10" },
  반려: { icon: XCircle, color: "text-[#ff3b30]", bg: "bg-[#ff3b30]/10" },
}

export default function FeedbackDetailPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const feedback = getFeedbackById(id)

  if (!feedback) {
    router.push("/feedback")
    return null
  }

  const request = getRequestById(feedback.request_id)
  const student = request ? getStudentById(request.student_id) : null
  const decisionInfo = feedback.decision ? decisionConfig[feedback.decision] : null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-effect border-b border-[#e5e5ea]/50">
        <div className="flex items-center gap-3 px-4 pb-3 pt-14">
          <button onClick={() => router.back()} className="flex items-center gap-1 text-[#007aff]">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-[17px]">Back</span>
          </button>
        </div>
        <div className="px-4 pb-4">
          <h1 className="text-[34px] font-bold tracking-tight text-[#1c1c1e]">Feedback Detail</h1>
        </div>
      </header>

      <main className="space-y-4 p-4">
        {/* Header Card */}
        <div className="rounded-[20px] bg-card p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#007aff]/10">
              <MessageCircle className="h-7 w-7 text-[#007aff]" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-[13px] font-semibold",
                    feedbackTypeStyles[feedback.feedback_type] || feedbackTypeStyles["안내"],
                  )}
                >
                  {feedback.feedback_type}
                </span>
                <span className="text-[13px] text-[#8e8e93]">{feedback.feedback_id}</span>
              </div>
              <p className="mt-2 text-[15px] text-[#8e8e93]">{formatDate(feedback.created_at)}</p>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="rounded-[20px] bg-card p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#8e8e93]">Feedback Content</p>
          <div className="rounded-2xl bg-[#f2f2f7] p-4">
            <p className="whitespace-pre-wrap text-[17px] leading-7 text-[#1c1c1e]">{feedback.content}</p>
          </div>
        </div>

        {/* Decision Status */}
        {feedback.decision && decisionInfo && (
          <div className={cn("rounded-[20px] p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)]", decisionInfo.bg)}>
            <div className="flex items-center gap-3">
              <decisionInfo.icon className={cn("h-6 w-6", decisionInfo.color)} />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8e8e93]">Decision</p>
                <p className={cn("text-[20px] font-bold", decisionInfo.color)}>{feedback.decision}</p>
              </div>
            </div>
          </div>
        )}

        {/* Follow-up Action */}
        {feedback.follow_up_action && (
          <div className="rounded-[20px] bg-card p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <div className="mb-3 flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-[#8e8e93]" />
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8e8e93]">Follow-up Action</p>
            </div>
            <p className="text-[17px] leading-7 text-[#1c1c1e]">{feedback.follow_up_action}</p>
          </div>
        )}

        {/* Email Status */}
        <div className="rounded-[16px] bg-card p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className={cn("h-5 w-5", feedback.email_replied ? "text-[#34c759]" : "text-[#8e8e93]")} />
              <span className="text-[15px] text-[#1c1c1e]">이메일 회신</span>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-[13px] font-medium",
                feedback.email_replied ? "bg-[#34c759]/10 text-[#34c759]" : "bg-[#f2f2f7] text-[#8e8e93]",
              )}
            >
              {feedback.email_replied ? "완료" : "미회신"}
            </span>
          </div>
        </div>

        {/* Attachment */}
        {feedback.attachment_url && (
          <a href={feedback.attachment_url} target="_blank" rel="noopener noreferrer">
            <div className="card-tap flex items-center justify-between rounded-[16px] bg-[#007aff] p-4 shadow-[0_4px_12px_rgba(0,122,255,0.3)]">
              <div className="flex items-center gap-3">
                <ExternalLink className="h-5 w-5 text-white" />
                <span className="text-[17px] font-medium text-white">첨부 링크 열기</span>
              </div>
              <ChevronRight className="h-5 w-5 text-white/70" />
            </div>
          </a>
        )}

        {/* Related Request */}
        {request && (
          <section className="space-y-3">
            <p className="px-1 text-[13px] font-semibold uppercase tracking-wider text-[#8e8e93]">Related Request</p>
            <Link href={`/requests/${request.request_id}`}>
              <div className="card-tap rounded-[16px] bg-card p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[17px] font-semibold text-[#1c1c1e]">{request.app_title}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <CategoryBadge category={request.admin_category} />
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#c7c7cc]" />
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Related Student */}
        {student && (
          <section className="space-y-3">
            <p className="px-1 text-[13px] font-semibold uppercase tracking-wider text-[#8e8e93]">Requester</p>
            <Link href={`/students/${student.student_id}`}>
              <div className="card-tap flex items-center gap-3 rounded-[16px] bg-card p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e5e5ea]">
                  <span className="text-[15px] font-semibold text-[#3a3a3c]">{getInitials(student.name)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[17px] font-semibold text-[#1c1c1e]">{student.name}</h3>
                  <p className="text-[14px] text-[#8e8e93]">
                    {student.job_status} • {student.age_group}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-[#c7c7cc]" />
              </div>
            </Link>
          </section>
        )}
      </main>

      <IOSTabBar />
    </div>
  )
}
