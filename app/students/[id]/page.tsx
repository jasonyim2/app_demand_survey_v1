"use client"

import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import { IOSTabBar } from "@/components/ios-tab-bar"
import { CategoryBadge } from "@/components/category-badge"
import { fetchParticipants, fetchRequests } from "@/lib/api"
import type { Student, AppRequest } from "@/lib/types"
import { getInitials } from "@/lib/types"
import { ChevronLeft, ChevronRight, Mail, Phone, Calendar, Code, MessageSquare } from "lucide-react"

export default function StudentDetailPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [student, setStudent] = useState<Student | null>(null)
  const [requests, setRequests] = useState<AppRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const [pData, rData] = await Promise.all([
          fetchParticipants(),
          fetchRequests()
        ])
        const foundStudent = pData.find(s => s.student_id === id)
        if (foundStudent) {
          setStudent(foundStudent)
          const studentRequests = rData.filter(r => r.student_id === id)
          setRequests(studentRequests)
        } else {
          // If not found, we might redirect or just stay null
          // But let's handle it in render
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [id])


  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  if (!student) {
    // If loading finished and stduent is null
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <p>참가자를 찾을 수 없습니다.</p>
        <button onClick={() => router.push("/students")} className="text-blue-500 mt-4">돌아가기</button>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-effect border-b border-[#e5e5ea]/50">
        <div className="flex items-center gap-3 px-4 pb-3 pt-14">
          <button onClick={() => router.back()} className="flex items-center gap-1 text-[#007aff]">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-[17px]">Students</span>
          </button>
        </div>
      </header>

      <main className="p-4">
        {/* Profile Card */}
        <div className="rounded-[20px] bg-card p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e5e5ea]">
              <span className="text-[28px] font-semibold text-[#3a3a3c]">{getInitials(student.name)}</span>
            </div>
            <h1 className="mt-4 text-[28px] font-bold text-[#1c1c1e]">{student.name}</h1>
            <p className="mt-1 text-[17px] text-[#8e8e93]">
              {student.job_status} • {student.age_group}
            </p>
            <div className="mt-3 rounded-full bg-[#007aff]/10 px-3 py-1">
              <span className="text-[14px] font-medium text-[#007aff]">{student.cohort}</span>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-4 space-y-3">
          <div className="rounded-[16px] bg-card shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-4 border-b border-[#e5e5ea] p-4">
              <Mail className="h-5 w-5 text-[#007aff]" />
              <div>
                <p className="text-[13px] text-[#8e8e93]">이메일</p>
                <p className="text-[17px] text-[#1c1c1e]">{student.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-b border-[#e5e5ea] p-4">
              <Phone className="h-5 w-5 text-[#34c759]" />
              <div>
                <p className="text-[13px] text-[#8e8e93]">전화번호</p>
                <p className="text-[17px] text-[#1c1c1e]">{student.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-b border-[#e5e5ea] p-4">
              <Code className="h-5 w-5 text-[#af52de]" />
              <div>
                <p className="text-[13px] text-[#8e8e93]">IT/코딩 수준</p>
                <p className="text-[17px] text-[#1c1c1e]">{student.it_level}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <Calendar className="h-5 w-5 text-[#ff9500]" />
              <div>
                <p className="text-[13px] text-[#8e8e93]">등록일</p>
                <p className="text-[17px] text-[#1c1c1e]">{formatDate(student.created_at)}</p>
              </div>
            </div>
          </div>

          {/* Memo */}
          {student.memo && (
            <div className="rounded-[16px] bg-card p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
              <div className="mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#8e8e93]" />
                <span className="text-[13px] text-[#8e8e93]">메모</span>
              </div>
              <p className="text-[15px] text-[#3a3a3c]">{student.memo}</p>
            </div>
          )}
        </div>

        {/* Requests Section */}
        <section className="mt-6">
          <p className="mb-3 px-1 text-[13px] font-semibold uppercase tracking-wider text-[#8e8e93]">
            Requests ({requests.length})
          </p>
          {requests.length > 0 ? (
            <div className="overflow-hidden rounded-[16px] bg-card shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
              {requests.map((request, index) => (
                <Link key={request.request_id} href={`/requests/${request.request_id}`}>
                  <div
                    className={`card-tap flex items-center justify-between p-4 ${index !== requests.length - 1 ? "border-b border-[#e5e5ea]" : ""}`}
                  >
                    <div>
                      <h3 className="text-[17px] font-semibold text-[#1c1c1e]">{request.app_title}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <CategoryBadge category={request.admin_category} />
                        <span className="text-[13px] text-[#8e8e93]">
                          {new Date(request.submitted_at).toLocaleDateString("ko-KR", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-[#c7c7cc]" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-[16px] bg-card py-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
              <p className="text-center text-[15px] text-[#8e8e93]">No requests yet</p>
            </div>
          )}
        </section>
      </main>

      <IOSTabBar />
    </div>
  )
}
