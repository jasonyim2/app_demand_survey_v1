"use client"

import { useRouter, useParams } from "next/navigation"
import { IOSTabBar } from "@/components/ios-tab-bar"
import { ChevronLeft } from "lucide-react"

export default function FeedbackDetailPage() {
  const router = useRouter()

  // API does not support fetching specific feedback yet.
  // So we just show a Not Found state.

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-effect border-b border-[#e5e5ea]/50">
        <div className="flex items-center gap-3 px-4 pb-3 pt-14">
          <button onClick={() => router.back()} className="flex items-center gap-1 text-[#007aff]">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-[17px]">Back</span>
          </button>
        </div>
      </header>

      <main className="space-y-4 p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-xl font-semibold text-gray-800">Feedback Not Found</h2>
        <p className="text-gray-500">The requested feedback could not be found.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
        >
          Go Home
        </button>
      </main>

      <IOSTabBar />
    </div>
  )
}
