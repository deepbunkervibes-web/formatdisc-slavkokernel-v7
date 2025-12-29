import * as React from 'react';

export const Skeleton = ({ className }: {className?: string;}) =>
<div className={`animate-pulse bg-neutral-800/50 rounded-lg ${className}`} />;


export const ViewSkeleton = () =>
<div className="space-y-4 w-full h-full">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
        </div>
    </div>;


export const TerminalSkeleton = () =>
<div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
    </div>;