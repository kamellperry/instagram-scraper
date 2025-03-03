import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui";

export interface DashboardPaginationProps {
    currentIndex: number;
    total: number;
    onNext: () => void;
    onPrevious: () => void;
    className?: string;
}

export function DashboardPagination({ currentIndex, total, onNext, onPrevious, className = "" }: DashboardPaginationProps) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Button variant="outline" size="icon" onClick={onPrevious} disabled={currentIndex === 0}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
            </Button>
            <span className="text-sm text-muted-foreground">
                {currentIndex + 1} of {total}
            </span>
            <Button
                variant="outline"
                size="icon"
                onClick={onNext}
                disabled={currentIndex === total - 1}
            >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
            </Button>
        </div>
    );
} 