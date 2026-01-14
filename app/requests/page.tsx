"use client"

import { useState, useMemo } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { PageHeader } from "@/components/page-header"
import { FilterChips } from "@/components/filter-chips"
import { RequestCard } from "@/components/request-card"
import { appRequests } from "@/lib/mock-data"

const statusOptions = [
  { value: "접수" as const, label: "접수" },
  { value: "검토중" as const, label: "검토중" },
  { value: "진행" as const, label: "진행" },
  { value: "완료" as const, label: "완료" },
]

const priorityOptions = [
  { value: "높음" as const, label: "높음" },
  { value: "중간" as const, label: "중간" },
  { value: "낮음" as const, label: "낮음" },
]

const categoryOptions = [
  { value: "업무/생산성", label: "업무/생산성" },
  { value: "건강/웰빙", label: "건강/웰빙" },
  { value: "소통/커뮤니티", label: "소통/커뮤니티" },
]

export default function RequestsPage() {
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  const filteredRequests = useMemo(() => {
    let filtered = [...appRequests].sort(
      (a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime(),
    )

    if (statusFilter) {
      filtered = filtered.filter((r) => r.status === statusFilter)
    }
    if (priorityFilter) {
      filtered = filtered.filter((r) => r.priority === priorityFilter)
    }
    if (categoryFilter) {
      filtered = filtered.filter((r) => r.category === categoryFilter)
    }

    return filtered
  }, [statusFilter, priorityFilter, categoryFilter])

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="앱수요입력" />

      <main className="space-y-4 p-4">
        {/* Filters */}
        <div className="space-y-2">
          <p className="text-[10px] font-medium text-muted-foreground">진행상태</p>
          <FilterChips options={statusOptions} selected={statusFilter} onChange={setStatusFilter} />
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-medium text-muted-foreground">우선순위</p>
          <FilterChips options={priorityOptions} selected={priorityFilter} onChange={setPriorityFilter} />
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-medium text-muted-foreground">카테고리</p>
          <FilterChips options={categoryOptions} selected={categoryFilter} onChange={setCategoryFilter} />
        </div>

        <p className="text-xs text-muted-foreground">총 {filteredRequests.length}건</p>

        <div className="space-y-2">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => <RequestCard key={request.request_id} request={request} />)
          ) : (
            <p className="py-12 text-center text-sm text-muted-foreground">해당 조건의 요청이 없습니다.</p>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
