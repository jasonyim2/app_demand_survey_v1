import Link from "next/link"
import { Card } from "@/components/ui/card"
import type { Participant } from "@/lib/types"
import { ChevronRight, User } from "lucide-react"

interface ParticipantCardProps {
  participant: Participant
  requestCount?: number
  latestRequestDate?: string
}

export function ParticipantCard({ participant, requestCount = 0, latestRequestDate }: ParticipantCardProps) {
  const latestRequest = latestRequestDate

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Link href={`/participants/${participant.student_id}`}>
      <Card className="p-4 transition-all hover:shadow-md active:scale-[0.98]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-foreground">{participant.name}</h3>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {participant.cohort}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>{participant.age_group}</span>
              <span>·</span>
              <span>{participant.job_status}</span>
              <span>·</span>
              <span>IT {participant.it_level}</span>
            </div>
            <div className="mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground">
              <span>요청 {requestCount}건</span>
              {latestRequest && <span>최근 {formatDate(latestRequest)}</span>}
            </div>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </div>
      </Card>
    </Link>
  )
}
