"use client"

import { useState } from "react"
import { IOSTabBar } from "@/components/ios-tab-bar"
import { StudentListItem } from "@/components/student-list-item"
import { StudentListItemSkeleton } from "@/components/skeletons/student-list-item-skeleton"
import { useParticipants } from "@/lib/hooks"
import type { Student } from "@/lib/types"
import { Search } from "lucide-react"

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const { students, isLoading } = useParticipants()

  const filteredStudents = students.filter(
    (student) =>
      student.name.includes(searchQuery) ||
      student.job_status.includes(searchQuery) ||
      student.age_group.includes(searchQuery),
  )

  // Group by cohort
  const groupedByCohort = filteredStudents.reduce(
    (acc, student) => {
      const cohort = student.cohort
      if (!acc[cohort]) {
        acc[cohort] = []
      }
      acc[cohort].push(student)
      return acc
    },
    {} as Record<string, Student[]>,
  )

  const sortedCohorts = Object.keys(groupedByCohort).sort()

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-effect border-b border-[#e5e5ea]/50 px-4 pb-3 pt-14">
        <h1 className="text-[34px] font-bold tracking-tight text-[#1c1c1e]">Students</h1>
        <div className="flex justify-between items-center mt-1">
          <p className="text-[15px] text-[#8e8e93]">{isLoading ? "..." : students.length}명의 설문 참가자</p>
          {isLoading && <p className="text-xs text-blue-500">로딩 중...</p>}
        </div>

        {/* Search Bar */}
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#e5e5ea]/60 px-3 py-2">
          <Search className="h-4 w-4 text-[#8e8e93]" />
          <input
            type="text"
            placeholder="이름, 직업, 연령대 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-[15px] text-[#1c1c1e] placeholder:text-[#8e8e93] focus:outline-none"
          />
        </div>
      </header>

      {/* Inset Grouped List */}
      <main className="p-4">
        {isLoading && students.length === 0 ? (
          // Skeleton Loading State
          <div className="overflow-hidden rounded-xl bg-card shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={i !== 5 ? "border-b border-[#e5e5ea]" : ""}>
                <StudentListItemSkeleton />
              </div>
            ))}
          </div>
        ) : sortedCohorts.map((cohort) => (
          <section key={cohort} className="mb-6">
            <p className="mb-2 px-4 text-[13px] font-semibold uppercase tracking-wider text-[#8e8e93]">{cohort}</p>
            <div className="overflow-hidden rounded-xl bg-card shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
              {groupedByCohort[cohort].map((student, index) => (
                <div
                  key={student.student_id}
                  className={index !== groupedByCohort[cohort].length - 1 ? "border-b border-[#e5e5ea]" : ""}
                >
                  <StudentListItem student={student} />
                </div>
              ))}
            </div>
          </section>
        ))}

        {!isLoading && filteredStudents.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-[17px] text-[#8e8e93]">검색 결과가 없습니다</p>
          </div>
        )}
      </main>

      <IOSTabBar />
    </div>
  )
}
