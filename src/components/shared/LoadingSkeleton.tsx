import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css';

export function LoadingSkeleton({ width, height, count, className }: { width?: number, height: number | string, count?: number, className?: string }) {
    return (
       <Skeleton width={width || '100%'} height={height} count={count || 1} className={className} />
    )
}