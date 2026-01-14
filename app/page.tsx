"use client"

import { useState } from "react"
import { IOSTabBar } from "@/components/ios-tab-bar"
import { RequestCard } from "@/components/request-card"
import { appRequests } from "@/lib/mock-data"
import { RefreshCw } from "lucide-react"

export default function RequestsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const sortedRequests = [...appRequests].sort(
    (a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime(),
  )

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
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
          >
            <RefreshCw className={`h-5 w-5 text-[#007aff] ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
        <p className="mt-1 text-[15px] text-[#8e8e93]">{sortedRequests.length}개의 앱 수요 요청</p>
      </header>

      {/* Content */}
      <main className="space-y-3 p-4">
        {sortedRequests.map((request, index) => (
          <div key={request.request_id} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
            <RequestCard request={request} />
          </div>
        ))}
      </main>

      <IOSTabBar />
    </div>
  )
}
