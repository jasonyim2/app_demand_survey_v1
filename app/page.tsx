"use client"

import { useMemo, useState } from "react"
import { IOSTabBar } from "@/components/ios-tab-bar"
import { RequestCard } from "@/components/request-card"
import { RequestCardSkeleton } from "@/components/skeletons/request-card-skeleton"
import { RefreshCw } from "lucide-react"
import { useRequests } from "@/lib/hooks"

export default function Home() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { requests, isLoading, isError, mutate } = useRequests()

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await mutate()
    setIsRefreshing(false)
  }

  // 최신순 정렬 (submitted_at 기준)
  const sortedRequests = useMemo(() => {
    return [...requests].sort((a, b) => {
      const bt = new Date(b.submitted_at).getTime()
      const at = new Date(a.submitted_at).getTime()
      return bt - at
    })
  }, [requests])

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

        <div className="flex justify-between items-center mt-1">
          <p className="text-[15px] text-[#8e8e93]">
            {isLoading ? "..." : `${sortedRequests.length}개의 요청`}
          </p>
          {isLoading && <p className="text-xs text-blue-500">업데이트 중...</p>}
        </div>

        {isError && (
          <p className="mt-2 text-[13px] text-red-600">
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        )}
      </header>

      {/* Content */}
      <main className="space-y-3 p-4">
        {isLoading && requests.length === 0 ? (
          // Skeleton Loading State
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
              <RequestCardSkeleton />
            </div>
          ))
        ) : !isLoading && !isError && sortedRequests.length === 0 ? (
          <div className="rounded-2xl border border-[#e5e5ea]/70 bg-white/60 p-4 text-[14px] text-[#8e8e93]">
            아직 표시할 요청이 없습니다.
          </div>
        ) : (
          sortedRequests.map((request, index) => (
            <div key={request.request_id} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
              <RequestCard request={request} studentName={request.requester_name} />
            </div>
          ))
        )}
      </main>

      <IOSTabBar />
    </div>
  )
}
