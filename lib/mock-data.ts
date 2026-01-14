import type { Student, AppRequest, Feedback } from "./types"

export const students: Student[] = [
  {
    student_id: "STU001",
    name: "김영희",
    email: "younghee@email.com",
    phone: "010-1234-5678",
    age_group: "50대",
    job_status: "자영업",
    it_level: "초급",
    cohort: "1기",
    memo: "열정적인 참가자",
    created_at: "2025-01-05T10:00:00Z",
  },
  {
    student_id: "STU002",
    name: "이철수",
    email: "chulsu@email.com",
    phone: "010-2345-6789",
    age_group: "60대",
    job_status: "은퇴",
    it_level: "초급",
    cohort: "1기",
    memo: "",
    created_at: "2025-01-06T14:30:00Z",
  },
  {
    student_id: "STU003",
    name: "박민수",
    email: "minsu@email.com",
    phone: "010-3456-7890",
    age_group: "40대",
    job_status: "회사원",
    it_level: "중급",
    cohort: "2기",
    created_at: "2025-01-08T09:15:00Z",
  },
  {
    student_id: "STU004",
    name: "정수연",
    email: "sooyeon@email.com",
    phone: "010-4567-8901",
    age_group: "50대",
    job_status: "프리랜서",
    it_level: "초급",
    cohort: "2기",
    memo: "디자인 관심",
    created_at: "2025-01-09T11:00:00Z",
  },
  {
    student_id: "STU005",
    name: "최준호",
    email: "junho@email.com",
    phone: "010-5678-9012",
    age_group: "60대",
    job_status: "자영업",
    it_level: "초급",
    cohort: "1기",
    created_at: "2025-01-10T16:45:00Z",
  },
  {
    student_id: "STU006",
    name: "한미경",
    email: "mikyung@email.com",
    phone: "010-6789-0123",
    age_group: "40대",
    job_status: "주부",
    it_level: "고급",
    cohort: "2기",
    memo: "IT 전문가",
    created_at: "2025-01-11T08:00:00Z",
  },
]

export const appRequests: AppRequest[] = [
  {
    request_id: "REQ001",
    student_id: "STU001",
    app_title: "재고관리 앱",
    surveyor_category: "업무자동화",
    admin_category: "업무자동화",
    current_issue:
      "엑셀로 재고를 관리하는데 실수가 많고 시간이 오래 걸림. 특히 바쁜 시즌에는 재고 파악이 어려워서 고객에게 잘못된 정보를 전달하는 경우가 종종 발생합니다.",
    desired_solution: "바코드 스캔으로 쉽게 입출고 관리하고 싶음",
    automation_needs: "재고 부족 시 자동 알림",
    primary_device: "스마트폰",
    feedback_frequency: "주 1회",
    submitted_at: "2025-01-10T14:00:00Z",
  },
  {
    request_id: "REQ002",
    student_id: "STU002",
    app_title: "건강기록 앱",
    surveyor_category: "건강관리",
    admin_category: "건강관리",
    current_issue:
      "혈압, 혈당 수치를 수첩에 기록하는데 불편함. 병원에 갈 때마다 수첩을 찾아야 하고, 의사 선생님께 보여드리기도 번거롭습니다.",
    desired_solution: "간단하게 기록하고 그래프로 보고 싶음",
    primary_device: "태블릿",
    feedback_frequency: "월 2회",
    submitted_at: "2025-01-11T09:30:00Z",
  },
  {
    request_id: "REQ003",
    student_id: "STU003",
    app_title: "일정공유 앱",
    surveyor_category: "소통커뮤니티",
    admin_category: "소통커뮤니티",
    current_issue: "가족들과 일정 공유가 어려움. 각자 바쁘다 보니 중요한 일정을 놓치는 경우가 많습니다.",
    desired_solution: "가족 캘린더를 함께 볼 수 있으면 좋겠음",
    automation_needs: "일정 전 알림",
    primary_device: "스마트폰",
    feedback_frequency: "주 1회",
    submitted_at: "2025-01-12T11:15:00Z",
  },
  {
    request_id: "REQ004",
    student_id: "STU004",
    app_title: "포트폴리오 앱",
    surveyor_category: "업무자동화",
    admin_category: "업무자동화",
    current_issue:
      "작업물을 보여줄 때마다 파일을 찾아야 함. 클라이언트에게 전문적으로 보이고 싶은데 매번 허둥지둥하게 됩니다.",
    desired_solution: "깔끔하게 작업물을 정리해서 보여주고 싶음",
    primary_device: "태블릿",
    feedback_frequency: "월 1회",
    submitted_at: "2025-01-08T15:00:00Z",
  },
  {
    request_id: "REQ005",
    student_id: "STU001",
    app_title: "고객관리 앱",
    surveyor_category: "업무자동화",
    admin_category: "업무자동화",
    current_issue:
      "단골 고객 정보를 메모장에 적어두는데 찾기 어려움. 고객이 왔을 때 이전 구매 이력을 바로 확인하고 싶습니다.",
    desired_solution: "고객별 구매 이력과 연락처를 쉽게 관리",
    automation_needs: "생일 알림, 재방문 알림",
    primary_device: "스마트폰",
    feedback_frequency: "주 1회",
    submitted_at: "2025-01-13T10:00:00Z",
  },
  {
    request_id: "REQ006",
    student_id: "STU005",
    app_title: "매출분석 앱",
    surveyor_category: "금융재테크",
    admin_category: "금융재테크",
    current_issue: "매일 매출을 계산기로 정리하는데 월별 비교가 어려움",
    desired_solution: "일별/월별 매출 추이를 한눈에 보고 싶음",
    primary_device: "스마트폰",
    feedback_frequency: "월 1회",
    submitted_at: "2025-01-14T08:30:00Z",
  },
  {
    request_id: "REQ007",
    student_id: "STU006",
    app_title: "레시피 관리 앱",
    surveyor_category: "일상생활",
    admin_category: "일상생활",
    current_issue: "요리 레시피를 여기저기 메모해두어서 찾기 힘듦",
    desired_solution: "나만의 레시피북을 만들고 싶음",
    primary_device: "태블릿",
    feedback_frequency: "월 2회",
    submitted_at: "2025-01-14T10:00:00Z",
  },
]

export const feedbacks: Feedback[] = [
  {
    feedback_id: "FB001",
    request_id: "REQ001",
    feedback_type: "답변",
    content:
      "기본 화면 설계 완료했습니다. 바코드 스캔 기능 테스트 중이며, 다음 주에 프로토타입을 전달드릴 예정입니다. 추가로 원하시는 기능이 있으시면 말씀해주세요.",
    decision: "확정",
    follow_up_action: "프로토타입 전달 후 피드백 수집",
    email_replied: true,
    created_at: "2025-01-12T10:00:00Z",
  },
  {
    feedback_id: "FB002",
    request_id: "REQ001",
    feedback_type: "제안",
    content:
      "재고 카테고리 분류 방식에 대해 확인이 필요합니다. 대분류/중분류/소분류로 나눌지, 아니면 태그 방식으로 자유롭게 분류할지 의견 부탁드립니다.",
    decision: "보류",
    email_replied: false,
    created_at: "2025-01-11T14:30:00Z",
  },
  {
    feedback_id: "FB003",
    request_id: "REQ002",
    feedback_type: "안내",
    content:
      "건강 기록 앱 검토 완료했습니다. 시중에 유사한 앱이 많으나, 사용자님의 니즈에 맞춘 단순화된 버전으로 진행 가능합니다. 큰 글씨와 직관적인 UI를 중점으로 설계하겠습니다.",
    decision: "확정",
    follow_up_action: "UI 디자인 시안 작성",
    email_replied: true,
    created_at: "2025-01-12T16:00:00Z",
  },
  {
    feedback_id: "FB004",
    request_id: "REQ004",
    feedback_type: "긍정적",
    content:
      "포트폴리오 앱 개발이 완료되었습니다. 사용자 테스트 결과 만족도가 매우 높았습니다. 추후 업데이트가 필요하시면 언제든 연락주세요.",
    decision: "확정",
    attachment_url: "https://example.com/portfolio-final",
    email_replied: true,
    created_at: "2025-01-10T11:00:00Z",
  },
  {
    feedback_id: "FB005",
    request_id: "REQ005",
    feedback_type: "개선필요",
    content:
      "고객관리 앱 요청을 검토 중입니다. 현재 사용하시는 고객 정보 형식을 알려주시면 더 맞춤화된 솔루션을 제안드릴 수 있습니다.",
    decision: "보류",
    follow_up_action: "고객 정보 형식 확인",
    email_replied: false,
    created_at: "2025-01-13T15:00:00Z",
  },
  {
    feedback_id: "FB006",
    request_id: "REQ003",
    feedback_type: "안내",
    content: "일정공유 앱 요청 접수되었습니다. 기존 캘린더 앱과의 연동 여부를 확인 후 개발 방향을 결정하겠습니다.",
    decision: "",
    email_replied: true,
    created_at: "2025-01-12T17:00:00Z",
  },
]

// Helper functions
export function getStudentById(studentId: string): Student | undefined {
  return students.find((s) => s.student_id === studentId)
}

export function getRequestsByStudent(studentId: string): AppRequest[] {
  return appRequests
    .filter((r) => r.student_id === studentId)
    .sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())
}

export function getFeedbacksByRequest(requestId: string): Feedback[] {
  return feedbacks
    .filter((f) => f.request_id === requestId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export function getRequestById(requestId: string): AppRequest | undefined {
  return appRequests.find((r) => r.request_id === requestId)
}

export function getFeedbackById(feedbackId: string): Feedback | undefined {
  return feedbacks.find((f) => f.feedback_id === feedbackId)
}

export function getAllFeedbacksSorted(): Feedback[] {
  return [...feedbacks].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export function getRequestCountByStudent(studentId: string): number {
  return appRequests.filter((r) => r.student_id === studentId).length
}
