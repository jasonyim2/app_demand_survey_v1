import { notFound } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import { PageHeader } from "@/components/page-header"
import { RequestCard } from "@/components/request-card"
import { Card } from "@/components/ui/card"
import { getParticipantById, getRequestsByParticipant, getRequestCountByParticipant } from "@/lib/mock-data"
import { User, Mail, Phone, Briefcase, Monitor, StickyNote } from "lucide-react"

interface Props {
  params: Promise<{ id: string }>
}

export default async function ParticipantDetailPage({ params }: Props) {
  const { id } = await params
  const participant = getParticipantById(id)

  if (!participant) {
    notFound()
  }

  const requests = getRequestsByParticipant(id)
  const requestCount = getRequestCountByParticipant(id)

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="참가자 상세" backHref="/participants" />

      <main className="space-y-4 p-4">
        {/* Profile Card */}
        <Card className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <User className="h-7 w-7 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-foreground">{participant.name}</h2>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {participant.cohort}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {participant.age_group} · 요청 {requestCount}건
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{participant.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{participant.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{participant.job_status}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Monitor className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">IT 수준: {participant.it_level}</span>
            </div>
            {participant.memo && (
              <div className="flex items-start gap-3 text-sm">
                <StickyNote className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{participant.memo}</span>
              </div>
            )}
          </div>
        </Card>

        {/* Requests Section */}
        <section className="space-y-3">
          <h3 className="text-xs font-medium text-muted-foreground">이 참가자의 앱수요입력 ({requests.length}건)</h3>
          <div className="space-y-2">
            {requests.length > 0 ? (
              requests.map((request) => <RequestCard key={request.request_id} request={request} />)
            ) : (
              <Card className="py-8">
                <p className="text-center text-sm text-muted-foreground">등록된 앱수요입력이 없습니다.</p>
              </Card>
            )}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
