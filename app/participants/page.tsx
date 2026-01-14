"use client"

import { useState, useMemo } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { PageHeader } from "@/components/page-header"
import { SearchInput } from "@/components/search-input"
import { ParticipantCard } from "@/components/participant-card"
import { participants } from "@/lib/mock-data"

export default function ParticipantsPage() {
  const [search, setSearch] = useState("")

  const filteredParticipants = useMemo(() => {
    if (!search.trim()) return participants

    const query = search.toLowerCase()
    return participants.filter(
      (p) => p.name.toLowerCase().includes(query) || p.email.toLowerCase().includes(query) || p.phone.includes(query),
    )
  }, [search])

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="설문참가자" />

      <main className="space-y-4 p-4">
        <SearchInput value={search} onChange={setSearch} placeholder="이름, 이메일, 전화번호 검색..." />

        <p className="text-xs text-muted-foreground">총 {filteredParticipants.length}명</p>

        <div className="space-y-2">
          {filteredParticipants.length > 0 ? (
            filteredParticipants.map((participant) => (
              <ParticipantCard key={participant.student_id} participant={participant} />
            ))
          ) : (
            <p className="py-12 text-center text-sm text-muted-foreground">검색 결과가 없습니다.</p>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
