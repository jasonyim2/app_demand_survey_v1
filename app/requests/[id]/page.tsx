"use client"

import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import { IOSTabBar } from "@/components/ios-tab-bar"
import { CategoryIcon } from "@/components/category-icon"
import { CategoryBadge } from "@/components/category-badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { fetchRequests, fetchParticipants } from "@/lib/api"
import { getInitials } from "@/lib/types"
import type { Feedback, AppRequest, Student } from "@/lib/types"
import { ChevronLeft, Smartphone, Clock, AlertCircle, Lightbulb, Zap, ChevronRight, Plus, X, Send } from "lucide-react"

export default function RequestDetailPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [request, setRequest] = useState<AppRequest | null>(null)
  const [student, setStudent] = useState<Student | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // API doesn't support feedbacks yet
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [feedbackForm, setFeedbackForm] = useState({
    feedback_type: "답변" as Feedback["feedback_type"],
    content: "",
    attachment_url: "",
    decision: "",
    follow_up_action: "",
    email_replied: false,
  })

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const [rData, pData] = await Promise.all([
          fetchRequests(),
          fetchParticipants()
        ])
        const foundRequest = rData.find(r => r.request_id === id)
        if (foundRequest) {
          setRequest(foundRequest)
          if (foundRequest.student_id) {
            const foundStudent = pData.find(s => s.student_id === foundRequest.student_id)
            setStudent(foundStudent || null)
          }
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [id])

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <p>요청을 찾을 수 없습니다.</p>
        <button onClick={() => router.push("/requests")} className="text-blue-500 mt-4">목록으로</button>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const generateFeedbackId = () => {
    return `FB${String(Date.now()).slice(-6)}`
  }

  const handleSubmitFeedback = () => {
    const newFeedback: Feedback = {
      feedback_id: generateFeedbackId(),
      request_id: id,
      created_at: new Date().toISOString(),
      feedback_type: feedbackForm.feedback_type,
      content: feedbackForm.content,
      attachment_url: feedbackForm.attachment_url || undefined,
      decision: (feedbackForm.decision as Feedback["decision"]) || "",
      follow_up_action: feedbackForm.follow_up_action || undefined,
      email_replied: feedbackForm.email_replied,
    }

    console.log("Feedback submitted (Local only):", newFeedback)
    // Add to local state for demo purposes
    setFeedbacks(prev => [newFeedback, ...prev])

    setShowFeedbackForm(false)
    setFeedbackForm({
      feedback_type: "답변",
      content: "",
      attachment_url: "",
      decision: "",
      follow_up_action: "",
      email_replied: false,
    })
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* iOS-style Collapsible Header */}
      <header className="sticky top-0 z-40 glass-effect border-b border-[#e5e5ea]/50">
        <div className="flex items-center gap-3 px-4 pb-3 pt-14">
          <button onClick={() => router.back()} className="flex items-center gap-1 text-[#007aff]">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-[17px]">Back</span>
          </button>
        </div>
        <div className="px-4 pb-4">
          <h1 className="text-[34px] font-bold tracking-tight text-[#1c1c1e]">Request Detail</h1>
        </div>
      </header>

      <main className="space-y-4 p-4">
        {/* Request Header Card */}
        <div className="rounded-[20px] bg-card p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="flex gap-4">
            <CategoryIcon category={request.admin_category} className="h-14 w-14" />
            <div className="flex-1">
              <h2 className="text-[22px] font-bold text-[#1c1c1e]">{request.app_title}</h2>
              <p className="mt-1 text-[15px] text-[#8e8e93]">{formatDate(request.submitted_at)}</p>
              <div className="mt-3">
                <CategoryBadge category={request.admin_category} />
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: The Problem */}
        <div className="rounded-[20px] bg-card p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="mb-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-[#8e8e93]" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8e8e93]">
              Current Pain Points
            </span>
          </div>
          <p className="text-[17px] leading-7 text-[#1c1c1e]">{request.current_issue}</p>
        </div>

        {/* Section 2: The Vision */}
        <div className="rounded-[20px] bg-card p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-[#8e8e93]" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8e8e93]">Desired Solution</span>
          </div>
          <p className="text-[17px] leading-7 text-[#1c1c1e]">{request.desired_solution}</p>
          {request.automation_needs && (
            <div className="mt-4 rounded-xl bg-[#f2f2f7] p-3">
              <div className="mb-1.5 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#ff9500]" />
                <span className="text-[12px] font-medium text-[#8e8e93]">Automation</span>
              </div>
              <p className="text-[15px] text-[#3a3a3c]">{request.automation_needs}</p>
            </div>
          )}
        </div>

        {/* Section 3: Meta Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[16px] bg-card p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <Smartphone className="mb-2 h-5 w-5 text-[#007aff]" />
            <p className="text-[12px] text-[#8e8e93]">주 사용 기기</p>
            <p className="mt-1 text-[17px] font-semibold text-[#1c1c1e]">{request.primary_device}</p>
          </div>
          <div className="rounded-[16px] bg-card p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <Clock className="mb-2 h-5 w-5 text-[#34c759]" />
            <p className="text-[12px] text-[#8e8e93]">피드백 희망주기</p>
            <p className="mt-1 text-[17px] font-semibold text-[#1c1c1e]">{request.feedback_frequency}</p>
          </div>
        </div>

        {/* Student Info */}
        {student && (
          <section className="space-y-2">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-[#8e8e93]">Requester</p>
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

        {/* Feedbacks Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-[#8e8e93]">
              Feedback ({feedbacks.length})
            </p>
            <button
              onClick={() => setShowFeedbackForm(true)}
              className="flex items-center gap-1 text-[15px] font-medium text-[#007aff]"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>

          {feedbacks.length > 0 ? (
            <div className="space-y-3">
              {feedbacks.map((feedback) => (
                <Link key={feedback.feedback_id} href={`/feedback/${feedback.feedback_id}`}>
                  <div className="card-tap rounded-[16px] bg-card p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[#007aff]/10 px-2.5 py-1 text-[12px] font-medium text-[#007aff]">
                        {feedback.feedback_type}
                      </span>
                      <span className="text-[12px] text-[#8e8e93]">
                        {new Date(feedback.created_at).toLocaleDateString("ko-KR", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-[15px] text-[#3a3a3c]">{feedback.content}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-[16px] bg-card py-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
              <p className="text-center text-[15px] text-[#8e8e93]">No feedback yet</p>
            </div>
          )}
        </section>
      </main>

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg animate-slide-up overflow-y-auto rounded-t-[20px] bg-card p-5 pb-10">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-[20px] font-bold text-[#1c1c1e]">피드백 작성</h3>
              <button
                onClick={() => setShowFeedbackForm(false)}
                className="rounded-full bg-[#e5e5ea] p-2 transition-transform active:scale-95"
              >
                <X className="h-4 w-4 text-[#3a3a3c]" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Auto-filled fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[13px] text-[#8e8e93]">피드백 ID</Label>
                  <Input value="자동 생성" disabled className="rounded-xl bg-[#f2f2f7] text-[15px]" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[13px] text-[#8e8e93]">요청 ID</Label>
                  <Input value={id} disabled className="rounded-xl bg-[#f2f2f7] text-[15px]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[13px] text-[#8e8e93]">작성일시</Label>
                <Input
                  value={new Date().toLocaleString("ko-KR")}
                  disabled
                  className="rounded-xl bg-[#f2f2f7] text-[15px]"
                />
              </div>

              {/* Feedback Type */}
              <div className="space-y-2">
                <Label className="text-[15px] font-medium text-[#1c1c1e]">피드백 유형 *</Label>
                <div className="flex flex-wrap gap-2">
                  {(["긍정적", "개선필요", "제안", "답변", "안내"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFeedbackForm({ ...feedbackForm, feedback_type: type })}
                      className={`rounded-full px-4 py-2 text-[14px] font-medium transition-all active:scale-95 ${feedbackForm.feedback_type === type ? "bg-[#007aff] text-white" : "bg-[#f2f2f7] text-[#3a3a3c]"
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label className="text-[15px] font-medium text-[#1c1c1e]">피드백 내용 *</Label>
                <Textarea
                  placeholder="피드백 내용을 입력하세요..."
                  value={feedbackForm.content}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, content: e.target.value })}
                  className="min-h-[120px] resize-none rounded-xl text-[15px]"
                />
              </div>

              {/* Attachment URL */}
              <div className="space-y-2">
                <Label className="text-[15px] font-medium text-[#1c1c1e]">첨부링크</Label>
                <Input
                  type="url"
                  placeholder="https://..."
                  value={feedbackForm.attachment_url}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, attachment_url: e.target.value })}
                  className="rounded-xl text-[15px]"
                />
              </div>

              {/* Decision */}
              <div className="space-y-2">
                <Label className="text-[15px] font-medium text-[#1c1c1e]">결정사항</Label>
                <div className="flex gap-2">
                  {(["", "확정", "보류", "반려"] as const).map((decision) => (
                    <button
                      key={decision || "none"}
                      onClick={() => setFeedbackForm({ ...feedbackForm, decision })}
                      className={`rounded-full px-4 py-2 text-[14px] font-medium transition-all active:scale-95 ${feedbackForm.decision === decision
                          ? decision === "확정"
                            ? "bg-[#34c759] text-white"
                            : decision === "보류"
                              ? "bg-[#ff9500] text-white"
                              : decision === "반려"
                                ? "bg-[#ff3b30] text-white"
                                : "bg-[#007aff] text-white"
                          : "bg-[#f2f2f7] text-[#3a3a3c]"
                        }`}
                    >
                      {decision || "미정"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Follow-up Action */}
              <div className="space-y-2">
                <Label className="text-[15px] font-medium text-[#1c1c1e]">필요후속조치</Label>
                <Textarea
                  placeholder="필요한 후속 조치를 입력하세요..."
                  value={feedbackForm.follow_up_action}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, follow_up_action: e.target.value })}
                  className="min-h-[80px] resize-none rounded-xl text-[15px]"
                />
              </div>

              {/* Email Replied */}
              <div className="flex items-center justify-between rounded-xl bg-[#f2f2f7] p-4">
                <Label className="cursor-pointer text-[15px] font-medium text-[#1c1c1e]">이메일 회신여부</Label>
                <Switch
                  checked={feedbackForm.email_replied}
                  onCheckedChange={(checked) => setFeedbackForm({ ...feedbackForm, email_replied: checked })}
                />
              </div>

              <Button
                onClick={handleSubmitFeedback}
                disabled={!feedbackForm.content.trim()}
                className="w-full gap-2 rounded-xl bg-[#007aff] py-6 text-[17px] font-semibold hover:bg-[#0066d6]"
              >
                <Send className="h-5 w-5" />
                피드백 제출
              </Button>
            </div>
          </div>
        </div>
      )}

      <IOSTabBar />
    </div>
  )
}
