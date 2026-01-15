"use client"

import { useState, useMemo } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { PageHeader } from "@/components/page-header"
import { SearchInput } from "@/components/search-input"
import { ParticipantCard } from "@/components/participant-card"
import { ParticipantCardSkeleton } from "@/components/skeletons/participant-card-skeleton"
import { useParticipants, useRequests } from "@/lib/hooks"

export default function ParticipantsPage() {
  const [search, setSearch] = useState("")

  const { students: participants, isLoading: participantsLoading, isError: participantsError } = useParticipants()
  const { requests, isLoading: requestsLoading } = useRequests()

  const isLoading = participantsLoading || requestsLoading
  const errorMsg = participantsError ? "데이터를 불러오는 중 오류가 발생했습니다." : null

  const filteredParticipants = useMemo(() => {
    if (!search.trim()) return participants

    const query = search.toLowerCase()
    return participants.filter(
      (p) => p.name.toLowerCase().includes(query) || p.email.toLowerCase().includes(query) || p.phone.includes(query),
    )
  }, [search, participants])

  // Calculate request metadata per student
  const getStudentMeta = (studentId: string) => {
    const studentRequests = requests.filter(r => r.student_id === studentId)
    const count = studentRequests.length

    let latest: string | undefined
    if (count > 0) {
      // Sort by submitted_at desc
      const sorted = [...studentRequests].sort((a, b) =>
        new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
      )
      latest = sorted[0].submitted_at
    }
    return { count, latest }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="설문참가자" />

      <main className="space-y-4 p-4">
        <SearchInput value={search} onChange={setSearch} placeholder="이름, 이메일, 전화번호 검색..." />

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <p>총 {isLoading ? "..." : filteredParticipants.length}명</p>
          {isLoading && <p>업데이트 중...</p>}
        </div>

        {errorMsg && (
          <p className="text-sm text-red-500">{errorMsg}</p>
        )}

        <div className="space-y-2">
          {isLoading && participants.length === 0 ? (
            // Skeleton Loading State
            Array.from({ length: 5 }).map((_, i) => (
              <ParticipantCardSkeleton key={i} />
            ))
          ) : filteredParticipants.length > 0 ? (
            filteredParticipants.map((participant) => {
              const { count, latest } = getStudentMeta(participant.student_id)
              return (
                <ParticipantCard
                  key={participant.student_id}
                  participant={participant}
                  requestCount={count}
                  latestRequestDate={latest}
                />
              )
            })
          ) : (
            <p className="py-12 text-center text-sm text-muted-foreground">검색 결과가 없습니다.</p>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
