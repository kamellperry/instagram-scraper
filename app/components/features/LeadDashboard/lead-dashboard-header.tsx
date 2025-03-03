import { RefreshCw } from "lucide-react";
import { useLocation } from "react-router";
import { BrandButton } from "~/components/ui";
import { Separator } from "~/components/ui/separator";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { DashboardPagination } from "~/components/shared";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import type { ProfileData } from "~/lib/types";

interface LeadDashboardHeaderProps {
    currentIndex: number;
    profiles: ProfileData[];
    onRefresh: () => void;
    onPrevious: () => void;
    onNext: () => void;
}

export function LeadDashboardHeader({ onRefresh, currentIndex, profiles, onPrevious, onNext }: LeadDashboardHeaderProps) {
    const { pathname } = useLocation();

    const getBreadcrumb = (path: string) => {
        const isLeadDashboard = path === "/";
        if (isLeadDashboard) return "Dashboard";

        const pathParts = path.split("/");
        const profileId = pathParts[pathParts.length - 1];

        return `Lead ${profileId}`;
    };

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">{getBreadcrumb(pathname)}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{getBreadcrumb(pathname) === "Dashboard" ? "Leads" : getBreadcrumb(pathname)}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="ml-auto flex items-center gap-4 px-4">
                {onRefresh && (
                    <BrandButton onClick={onRefresh} variant="black" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh Data
                    </BrandButton>
                )}
                <DashboardPagination
                    currentIndex={currentIndex}
                    total={profiles.length}
                    onNext={onNext}
                    onPrevious={onPrevious}
                />
            </div>
        </header>
    );
} 