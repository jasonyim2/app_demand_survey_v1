"use client"

import { useEffect, useMemo, useState } from "react"
// 아래 두 줄은 v0가 만들어준 컴포넌트 위치와 파일명이 맞는지 확인 필요 (보통 맞습니다)
import { IOSTabBar } from "@/components/ios-tab-bar"
import { RequestCard } from "@/components/request-card"
import { RefreshCw } from "lucide-react"

/**
 * ✅ 영주님 GAS API 정보
 * - 기본 URL: 설문참가자 목록
 * - 앱수요입력 시트가 필요하면 ?sheet=앱수요입력
 */
const BASE_URL =
  "https://script.google.com/macros/s/AKfycby5Bp1T_Vcu3F4K98GMw6GWHrNSRIjau-91_pt9fR5o4cdGxi-lPshMrctc2nf6ZkXs/exec"

// 이 화면이 "앱 수요 요청" 리스트라면, 보통 앱수요입력 시트를 쓰는 게 맞습니다.
const SHEET_NAME = "앱수요입력"

// RequestCard가 기대하는 필드명이 프로젝트마다 조금씩 다를 수 있어서,
// 최대한 안전하게 "영문 키 + 원본(raw)"까지 함께 담아 전달합니다.
type RequestItem = {
  request_id: string
  submitted_at: string

  // 화면 표시/카드에서 자주 쓰는 후보 필드들
  app_name?: string
  title?: string
  description?: string
  requester_name?: string
  requester_email?: string
  department?: string
  status?: string
  priority?: string

  // 원본 한글 키를 포함한 raw 데이터 (디버깅/확장용)
  raw: Record<string, any>

  // 유연한 확장을 위한 인덱스 시그니처
  [key: string]: any
}

// ---- 한글 키 → 컴포넌트용 키 매핑 유틸 ----
function pickFirst(row: Record<string, any>, keys: string[]) {
  for (const k of keys) {
    const v = row?.[k]
    if (v !== undefined && v !== null && String(v).trim() !== "") return v
  }
  return undefined
}

function toISODate(value: any) {
  if (!value) return new Date().toISOString()

  // 이미 ISO 같은 문자열이면 그대로 시도
  const d1 = new Date(value)
  if (!Number.isNaN(d1.getTime())) return d1.toISOString()

  // 혹시 숫자 타임스탬프(밀리초/초) 형태면 보정
  const asNum = Number(value)
  if (!Number.isNaN(asNum)) {
    const ms = asNum < 10_000_000_000 ? asNum * 1000 : asNum
    const d2 = new Date(ms)
    if (!Number.isNaN(d2.getTime())) return d2.toISOString()
  }

  // 최후 fallback
  return new Date().toISOString()
}

function mapRowToRequest(row: Record<string, any>, index: number): RequestItem {
  // 1. 제출일시 찾기
  const submittedRaw = pickFirst(row, [
    "submitted_at",
    "제출일시",
    "제출일",
    "timestamp",
    "Timestamp",
  ])
  const submitted_at = toISODate(submittedRaw)

  // 2. ID 찾기 (없으면 날짜+순번으로 임시 생성)
  const requestIdRaw = pickFirst(row, ["request_id", "요청ID", "ID"])
  const request_id = String(requestIdRaw ?? `${submitted_at}-${index}`)

  // 3. 주요 데이터 매핑 (구글시트 헤더 -> 영어 변수)
  const requester_name = String(pickFirst(row, ["성명", "이름", "신청자", "requester_name"]) ?? "")
  const requester_email = String(pickFirst(row, ["이메일", "Email", "requester_email"]) ?? "")

  const title = String(pickFirst(row, ["제목", "앱제목", "희망 앱 제목", "title"]) ?? "")
  // 카테고리를 앱 이름처럼 쓸 수도 있습니다
  const app_name = String(pickFirst(row, ["앱명", "앱이름", "설문자_앱카테고리", "app_name"]) ?? "")
  
  // 상세 내용 (불편사항이나 희망사항을 합쳐서 보여줄 수도 있음)
  const description = String(pickFirst(row, ["요청내용", "앱 부재로 불편한 사항", "description"]) ?? "")

  const department = String(pickFirst(row, ["부서", "직업", "department"]) ?? "")
  const status = String(pickFirst(row, ["상태", "진행상태", "status"]) ?? "접수")
  const priority = String(pickFirst(row, ["우선순위", "priority"]) ?? "")

  // ✅ 데이터 조립 (여기가 수정되었습니다)
  return {
    request_id,
    submitted_at,
    requester_name, // 중복 제거됨
    requester_email,
    title,
    app_name,
    description,
    department,
    status,
    priority,
    raw: row,
    ...row, // 원본 데이터도 그대로 포함
  }
}

export default function RequestsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [requests, setRequests] = useState<RequestItem[]>([])

  const apiUrl = useMemo(() => {
    const u = new URL(BASE_URL)
    // GAS 코드에서 ?sheet= 파라미터를 처리하게 해뒀으므로 여기서 지정
    u.searchParams.set("sheet", SHEET_NAME)
    return u.toString()
  }, [])

  const loadRequests = async (opts?: { isUserRefresh?: boolean }) => {
    const isUserRefresh = Boolean(opts?.isUserRefresh)

    if (isUserRefresh) setIsRefreshing(true)
    else setIsLoading(true)

    setErrorMsg(null)

    const controller = new AbortController()

    try {
      // 구글 시트 캐싱 방지를 위해 시간값(t) 추가
      const url = new URL(apiUrl)
      url.searchParams.set("t", String(Date.now()))

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        signal: controller.signal,
      })

      if (!res.ok) {
        throw new Error(`API 응답 오류: ${res.status} ${res.statusText}`)
      }

      const data = await res.json()

      if (!Array.isArray(data)) {
        throw new Error("데이터 형식이 올바르지 않습니다. (배열이 아님)")
      }

      const mapped = data.map((row: any, idx: number) => mapRowToRequest(row ?? {}, idx))
      setRequests(mapped)
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setErrorMsg(err?.message ?? "데이터를 불러오는 중 오류가 발생했습니다.")
      }
    } finally {
      if (isUserRefresh) setIsRefreshing(false)
      else setIsLoading(false)
    }

    return () => controller.abort()
  }

  // 시작할 때 데이터 불러오기
  useEffect(() => {
    loadRequests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {/* RequestCard에 데이터를 통째로 넘깁니다. */}
            <RequestCard {...request} /> 
          </div>
        ))}
      </main>

      <IOSTabBar />
    </div>
  )
}
