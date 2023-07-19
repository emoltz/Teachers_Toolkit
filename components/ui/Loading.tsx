import {Skeleton} from "@/components/ui/skeleton"


export default function Loading() {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full"/>
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]"/>
                <Skeleton className="h-4 w-[200px]"/>
            </div>
        </div>
    )
}

export function LoadingText(){
    return (
        <div className="flex flex-col space-y-4">
            <Skeleton className="h-12 w-full"/> {/* Title */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-full"/> {/* Paragraph line */}
                <Skeleton className="h-4 w-3/4"/> {/* Paragraph line */}
                <Skeleton className="h-4 w-full"/> {/* Paragraph line */}
                <Skeleton className="h-4 w-1/2"/> {/* Paragraph line */}
            </div>
        </div>
    )
}