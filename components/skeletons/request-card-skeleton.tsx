import { Skeleton } from "@/components/ui/skeleton"

export function RequestCardSkeleton() {
    return (
        <div className="rounded-2xl bg-card p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <div className="flex gap-3">
                {/* Category Icon Skeleton */}
                <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />

                <div className="min-w-0 flex-1 space-y-2">
                    {/* Title Skeleton */}
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-3/4 rounded-md" />
                        <Skeleton className="h-5 w-5 rounded-full" />
                    </div>

                    {/* Subtitle Skeleton */}
                    <Skeleton className="h-3 w-1/2 rounded-md" />

                    {/* Description Skeleton */}
                    <div className="space-y-1 pt-1">
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-5/6 rounded-md" />
                    </div>

                    {/* Footer Skeleton */}
                    <div className="mt-3 flex items-center justify-between pt-1">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-3 w-12 rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    )
}
