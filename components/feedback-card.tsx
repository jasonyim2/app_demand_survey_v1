import Link from "next/link"
import { Card } from "@/components/ui/card"
import type { Feedback } from "@/lib/types"
import { ChevronRight, MessageCircle } from "lucide-react"

interface FeedbackCardProps {
  feedback: Feedback
  showRequestId?: boolean
}

export function FeedbackCard({ feedback, showRequestId = true }: FeedbackCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Link href={`/feedback/${feedback.feedback_id}`}>
      <Card className="p-4 transition-all hover:shadow-md active:scale-[0.98]">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <MessageCircle className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {feedback.feedback_type}
              </span>
              {showRequestId && <span className="text-[10px] text-muted-foreground">{feedback.request_id}</span>}
            </div>
            <p className="line-clamp-2 text-sm text-foreground">{feedback.content}</p>
            {feedback.decision && <p className="truncate text-xs text-muted-foreground">결정: {feedback.decision}</p>}
            <p className="text-[10px] text-muted-foreground">{formatDate(feedback.created_at)}</p>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </div>
      </Card>
    </Link>
  )
}
