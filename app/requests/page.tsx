"use client"

import { useState, useMemo, useEffect } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { PageHeader } from "@/components/page-header"
import { FilterChips } from "@/components/filter-chips"
import { RequestCard } from "@/components/request-card"
import { fetchRequests } from "@/lib/api"
import type { AppRequest } from "@/lib/types"

const statusOptions = [
  { value: "접수", label: "접수" },
  { value: "검토중", label: "검토중" },
  { value: "진행", label: "진행" },
  { value: "완료", label: "완료" },
]

const priorityOptions = [
  { value: "높음", label: "높음" },
  { value: "중간", label: "중간" },
  { value: "낮음", label: "낮음" },
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

  const [requests, setRequests] = useState<AppRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const data = await fetchRequests()
        setRequests(data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredRequests = useMemo(() => {
    let filtered = [...requests].sort(
      (a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime(),
    )

    if (statusFilter) {
      filtered = filtered.filter((r) => r.status === statusFilter || r.status?.includes(statusFilter))
    }
    if (priorityFilter) {
      filtered = filtered.filter((r) => r.priority === priorityFilter)
    }
    if (categoryFilter) {
      // API response uses mapped keys but we should check which field corresponds to category.
      // In types.ts/api.ts we have surveyor_category and admin_category.
      // The mock data used just 'category' but types.ts doesn't have it?
      // Wait, let's check types.ts again. AppRequest has surveyor_category and admin_category.
      // But the original code had `r.category`.
      // The original `mapRowToRequest` in `app/page.tsx` didn't have `category`.
      // The original `lib/types.ts` has `surveyor_category`.
      // The original `lib/mock-data.ts` had... let's check Step 58.
      // Mock data had `surveyor_category` and `admin_category`.
      // But `app/requests/page.tsx` line 46 used `r.category`.
      // This implies `AppRequest` type in global/mock was different or I missed something.
      // Or `category` was an optional field?
      // Let's assume surveyor_category is the one to use for now.
      filtered = filtered.filter((r) => r.surveyor_category === categoryFilter || r.admin_category === categoryFilter)
    }

    return filtered
  }, [statusFilter, priorityFilter, categoryFilter, requests])

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

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <p>총 {filteredRequests.length}건</p>
          {isLoading && <p>로딩 중...</p>}
        </div>

        <div className="space-y-2">
          {isLoading && requests.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">데이터를 불러오는 중입니다...</div>
          ) : filteredRequests.length > 0 ? (
            filteredRequests.map((request) => <RequestCard key={request.request_id} request={request} studentName={request.requester_name} />)
          ) : (
            <p className="py-12 text-center text-sm text-muted-foreground">해당 조건의 요청이 없습니다.</p>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
