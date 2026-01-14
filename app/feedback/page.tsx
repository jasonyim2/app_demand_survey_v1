"use client"

import { useMemo } from "react"
import { IOSTabBar } from "@/components/ios-tab-bar"
import { FeedbackTimelineItem } from "@/components/feedback-timeline-item"
// import { feedbacks } from "@/lib/mock-data"

export default function FeedbackPage() {
  // Since we don't have API for feedbacks, we show empty state or local mock. 
  // User requested to replace mock data. So we show empty state.
  const sortedFeedbacks: any[] = []

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-effect border-b border-[#e5e5ea]/50 px-4 pb-3 pt-14">
        <h1 className="text-[34px] font-bold tracking-tight text-[#1c1c1e]">Feedback Loop</h1>
        <p className="mt-1 text-[15px] text-[#8e8e93]">{sortedFeedbacks.length}건의 피드백 기록</p>
      </header>

      {/* Timeline Feed */}
      <main className="p-4">
        <div className="space-y-4">
          {sortedFeedbacks.map((feedback, index) => (
            <div key={feedback.feedback_id} className="animate-slide-up" style={{ animationDelay: `${index * 30}ms` }}>
              <FeedbackTimelineItem feedback={feedback} />
            </div>
          ))}
        </div>

        {sortedFeedbacks.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-[17px] text-[#8e8e93]">아직 피드백이 없습니다</p>
          </div>
        )}
      </main>

      <IOSTabBar />
    </div>
  )
}
