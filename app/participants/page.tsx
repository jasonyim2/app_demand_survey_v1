"use client"

import { useState, useMemo, useEffect } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { PageHeader } from "@/components/page-header"
import { SearchInput } from "@/components/search-input"
import { ParticipantCard } from "@/components/participant-card"
import { fetchParticipants, fetchRequests } from "@/lib/api"
import type { Student, AppRequest } from "@/lib/types"

export default function ParticipantsPage() {
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [participants, setParticipants] = useState<Student[]>([])
  const [requests, setRequests] = useState<AppRequest[]>([])
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const [pData, rData] = await Promise.all([
          fetchParticipants(),
          fetchRequests()
        ])
        setParticipants(pData)
        setRequests(rData)
      } catch (err) {
        console.error(err)
        setErrorMsg("데이터를 불러오는 중 오류가 발생했습니다.")
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

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
          <p>총 {filteredParticipants.length}명</p>
          {isLoading && <p>업데이트 중...</p>}
        </div>

        {errorMsg && (
          <p className="text-sm text-red-500">{errorMsg}</p>
        )}

        <div className="space-y-2">
          {isLoading && participants.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">데이터를 불러오는 중입니다...</div>
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
