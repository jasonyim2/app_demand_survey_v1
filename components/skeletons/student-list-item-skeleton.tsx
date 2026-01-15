import { Skeleton } from "@/components/ui/skeleton"

export function StudentListItemSkeleton() {
    return (
        <div className="flex items-center gap-3 p-4">
            {/* Avatar */}
            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

            <div className="min-w-0 flex-1 space-y-1.5">
                {/* Name */}
                <Skeleton className="h-4 w-20 rounded-md" />
                {/* Detail */}
                <Skeleton className="h-3 w-32 rounded-md" />
            </div>

            {/* Chevron */}
            <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
        </div>
    )
}
