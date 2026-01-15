import { Skeleton } from "@/components/ui/skeleton"

export function ParticipantCardSkeleton() {
    return (
        <div className="rounded-2xl bg-card p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar Skeleton */}
                    <Skeleton className="h-12 w-12 rounded-full" />

                    <div className="space-y-1.5">
                        {/* Name & Cohort Skeleton */}
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-16 rounded-md" />
                            <Skeleton className="h-4 w-8 rounded-full" />
                        </div>
                        {/* Details Skeleton */}
                        <Skeleton className="h-3 w-32 rounded-md" />
                    </div>
                </div>
                {/* Chevron Skeleton */}
                <Skeleton className="h-5 w-5 rounded-full" />
            </div>

            {/* Stats Skeleton */}
            <div className="mt-4 flex items-center gap-4 border-t border-[#e5e5ea] pt-3">
                <div className="flex items-center gap-1.5">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-3 w-8 rounded-md" />
                </div>
                <div className="flex items-center gap-1.5">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-3 w-12 rounded-md" />
                </div>
            </div>
        </div>
    )
}
