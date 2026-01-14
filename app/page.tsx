"use client"

import { useEffect, useMemo, useState } from "react"
import { IOSTabBar } from "@/components/ios-tab-bar"
import { RequestCard } from "@/components/request-card"
import { RefreshCw } from "lucide-react"
import { fetchRequests } from "@/lib/api"
import type { AppRequest } from "@/lib/types"

export default function RequestsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [requests, setRequests] = useState<AppRequest[]>([])

  const loadRequests = async (opts?: { isUserRefresh?: boolean }) => {
    const isUserRefresh = Boolean(opts?.isUserRefresh)

    if (isUserRefresh) setIsRefreshing(true)
    else setIsLoading(true)

    setErrorMsg(null)

    try {
      const data = await fetchRequests()
      setRequests(data)
    } catch (err: any) {
      setErrorMsg(err?.message ?? "데이터를 불러오는 중 오류가 발생했습니다.")
    } finally {
      if (isUserRefresh) setIsRefreshing(false)
      else setIsLoading(false)
    }
  }

  // 시작할 때 데이터 불러오기
  useEffect(() => {
    loadRequests()
  }, [])

  // 최신순 정렬 (submitted_at 기준)
  const sortedRequests = useMemo(() => {
    return [...requests].sort((a, b) => {
      const bt = new Date(b.submitted_at).getTime()
      const at = new Date(a.submitted_at).getTime()
      return bt - at
    })
  }, [requests])

  const handleRefresh = () => {
    loadRequests({ isUserRefresh: true })
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-effect border-b border-[#e5e5ea]/50 px-4 pb-3 pt-14">
        <div className="flex items-center justify-between">
          <h1 className="text-[34px] font-bold tracking-tight text-[#1c1c1e]">Requests</h1>
          <button
            onClick={handleRefresh}
            className="rounded-full p-2 transition-colors hover:bg-[#e5e5ea]"
            aria-label="Refresh"
            disabled={isLoading || isRefreshing}
          >
            <RefreshCw className={`h-5 w-5 text-[#007aff] ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>

        <p className="mt-1 text-[15px] text-[#8e8e93]">
          {isLoading ? "업데이트 중..." : `${sortedRequests.length}개의 요청`}
        </p>

        {errorMsg && (
          <p className="mt-2 text-[13px] text-red-600">
            {errorMsg}
          </p>
        )}
      </header>

      {/* Content */}
      <main className="space-y-3 p-4">
        {!isLoading && !errorMsg && sortedRequests.length === 0 && (
          <div className="rounded-2xl border border-[#e5e5ea]/70 bg-white/60 p-4 text-[14px] text-[#8e8e93]">
            아직 표시할 요청이 없습니다.
          </div>
        )}

        {sortedRequests.map((request, index) => (
          <div key={request.request_id} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
            <RequestCard request={request} studentName={request.requester_name} />
          </div>
        ))}
      </main>

      <IOSTabBar />
    </div>
  )
}
