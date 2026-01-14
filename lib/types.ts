// 설문참가자 (Students) 타입
export interface Student {
  student_id: string
  name: string
  email: string
  phone: string
  age_group: string // Changed from strict union to string for API compatibility
  job_status: string
  it_level: string // Changed from strict union to string for API compatibility
  cohort: string
  memo?: string
  created_at: string
}

// 앱수요입력 (Requests) 타입
export interface AppRequest {
  request_id: string
  student_id: string
  app_title: string
  surveyor_category: string
  admin_category: string
  current_issue: string
  desired_solution: string
  automation_needs?: string
  primary_device: string
  feedback_frequency: string
  submitted_at: string
  requester_name?: string
  status?: string
  priority?: string
}

// 피드백 (Feedback) 타입
export interface Feedback {
  feedback_id: string
  request_id: string
  created_at: string
  feedback_type: "긍정적" | "개선필요" | "제안" | "답변" | "안내"
  content: string
  attachment_url?: string
  decision: "확정" | "보류" | "반려" | ""
  follow_up_action?: string
  email_replied: boolean
}

// Category color mapping
export const categoryColors: Record<string, string> = {
  업무자동화: "bg-[#007aff]/10 text-[#007aff]",
  건강관리: "bg-[#34c759]/10 text-[#34c759]",
  교육학습: "bg-[#af52de]/10 text-[#af52de]",
  금융재테크: "bg-[#ff9500]/10 text-[#ff9500]",
  소통커뮤니티: "bg-[#ff2d55]/10 text-[#ff2d55]",
  일상생활: "bg-[#5ac8fa]/10 text-[#5ac8fa]",
  기타: "bg-[#8e8e93]/10 text-[#8e8e93]",
}

// Get initials from name
export function getInitials(name: string): string {
  return name.slice(0, 2)
}
