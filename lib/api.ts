import { Student, AppRequest } from "./types"

const BASE_URL =
  "https://script.google.com/macros/s/AKfycbw2Bqz12Eh9QWvIRxz5mLvR8dvAoDpLVINzO9fqyxDjwCxVZYxwesqIluJJfzNiWhY4/exec"

// Helper function to pick the first defined value from a list of keys
function pickFirst(row: Record<string, any>, keys: string[]) {
  for (const k of keys) {
    const v = row?.[k]
    if (v !== undefined && v !== null && String(v).trim() !== "") return v
  }
  return undefined
}

// Helper to safely format dates to ISO string
function toISODate(value: any) {
  if (!value) return new Date().toISOString()
  const d1 = new Date(value)
  if (!Number.isNaN(d1.getTime())) return d1.toISOString()

  const asNum = Number(value)
  if (!Number.isNaN(asNum)) {
    const ms = asNum < 10_000_000_000 ? asNum * 1000 : asNum
    const d2 = new Date(ms)
    if (!Number.isNaN(d2.getTime())) return d2.toISOString()
  }
  return new Date().toISOString()
}

export async function fetchParticipants(): Promise<Student[]> {
  try {
    // No sheet param needed for default (participants)
    const url = new URL(BASE_URL)
    url.searchParams.set("t", String(Date.now())) // Prevent caching

    const res = await fetch(url.toString(), { cache: "no-store" })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    const data = await res.json()

    if (!Array.isArray(data)) return []

    return data.map((row: any, index: number) => {
      const student_id = String(pickFirst(row, ["student_id", "ID", "학번", "순번"]) ?? `STU${String(index + 1).padStart(3, '0')}`)
      return {
        student_id,
        name: String(pickFirst(row, ["name", "성명", "이름"]) ?? ""),
        email: String(pickFirst(row, ["email", "이메일"]) ?? ""),
        phone: String(pickFirst(row, ["phone", "전화번호", "연락처"]) ?? ""),
        age_group: String(pickFirst(row, ["age_group", "연령대"]) ?? "40대") as any,
        job_status: String(pickFirst(row, ["job_status", "직업", "직무"]) ?? ""),
        it_level: String(pickFirst(row, ["it_level", "IT수준", "정보화수준"]) ?? "초급") as any,
        cohort: String(pickFirst(row, ["cohort", "기수"]) ?? "1기"),
        memo: String(pickFirst(row, ["memo", "메모", "비고"]) ?? ""),
        created_at: toISODate(pickFirst(row, ["created_at", "등록일", "타임스탬프", "timestamp"])),
      }
    })
  } catch (error) {
    console.error("Failed to fetch participants:", error)
    return []
  }
}

export async function fetchRequests(): Promise<AppRequest[]> {
  try {
    const url = new URL(BASE_URL)
    url.searchParams.set("sheet", "앱수요입력")
    url.searchParams.set("t", String(Date.now()))

    const res = await fetch(url.toString(), { cache: "no-store" })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    const data = await res.json()

    if (!Array.isArray(data)) return []

    return data.map((row: any, index: number) => {
      // request_id is not critical here if missing, we can generate one
      const submitted_at = toISODate(pickFirst(row, ["submitted_at", "제출일시", "제출일", "timestamp", "Timestamp"]))
      const request_id = String(pickFirst(row, ["request_id", "요청ID", "ID"]) ?? `REQ-${submitted_at}-${index}`)
      // We might not have student_id in the request sheet directly if it's just a raw form submission
      // But let's check for it or name/email to match later if needed. 
      // For now, we'll try to get student_id if it exists, or use name as fallback linkage if logic requires it.
      // However, the current types.ts requires student_id.
      const student_id = String(pickFirst(row, ["student_id", "학번", "ID"]) ?? "") // Might be empty if not provided

      return {
        request_id,
        student_id,
        app_title: String(pickFirst(row, ["app_title", "앱제목", "제목", "희망 앱 제목"]) ?? ""),
        surveyor_category: String(pickFirst(row, ["surveyor_category", "설문자_앱카테고리", "카테고리"]) ?? ""),
        admin_category: String(pickFirst(row, ["admin_category", "관리자_앱카테고리"]) ?? ""),
        current_issue: String(pickFirst(row, ["current_issue", "현재_불편사항", "불편사항"]) ?? ""),
        desired_solution: String(pickFirst(row, ["desired_solution", "희망_해결방안", "해결방안"]) ?? ""),
        automation_needs: String(pickFirst(row, ["automation_needs", "자동화_필요성", "자동화"]) ?? ""),
        primary_device: String(pickFirst(row, ["primary_device", "주요_사용기기", "기기"]) ?? ""),
        feedback_frequency: String(pickFirst(row, ["feedback_frequency", "피드백_빈도", "빈도"]) ?? ""),
        submitted_at,
        requester_name: String(pickFirst(row, ["requester_name", "성명", "이름", "신청자"]) ?? ""),
        status: String(pickFirst(row, ["status", "상태", "진행상태"]) ?? "접수"),
        priority: String(pickFirst(row, ["priority", "우선순위"]) ?? ""),
      }
    })
  } catch (error) {
    console.error("Failed to fetch requests:", error)
    return []
  }
}
