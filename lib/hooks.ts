import useSWR from 'swr'
import { fetchParticipants, fetchRequests } from './api'
import { Student, AppRequest } from './types'

// SWR configurations
const swrConfig = {
    revalidateOnFocus: false, // Don't revalidate on window focus for now
    dedupingInterval: 5000, // Dedup requests within 5 secs
}

export function useParticipants() {
    const { data, error, isLoading } = useSWR<Student[]>('participants', fetchParticipants, swrConfig)

    return {
        students: data || [],
        isLoading,
        isError: error,
    }
}

export function useRequests() {
    const { data, error, isLoading, mutate } = useSWR<AppRequest[]>('requests', fetchRequests, swrConfig)

    return {
        requests: data || [],
        isLoading,
        isError: error,
        mutate, // Expose mutate for manual refresh
    }
}
