import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import {
    ChevronLeft,
    ChevronRight,
    RefreshCw,
} from "lucide-react";
import { AppSidebar } from "../Sidebar/app-sidebar";
import { AppInsetSidebar } from "../Sidebar/app-inset-sidebar";
import { BrandButton, Button } from "~/components/ui";
import { Separator } from "~/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { LeadProfileContent } from "../LeadProfile/lead-profile-content";
import type { ProfileData } from "~/lib/types";

interface DashboardProps {
    profiles: ProfileData[];
    onRefresh: () => void;
}

export function LeadDashboard({ profiles, onRefresh }: DashboardProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const currentProfile = profiles[currentIndex];

    const goToNextProfile = useCallback(() => {
        if (currentIndex < profiles.length - 1 && !isAnimating) {
            setIsAnimating(true);
            setDirection(1);
            setCurrentIndex((prev) => prev + 1);
            // Reset animating state after animation completes
            setTimeout(() => setIsAnimating(false), 200);
        }
    }, [currentIndex, profiles.length, isAnimating]);

    const goToPreviousProfile = useCallback(() => {
        if (currentIndex > 0 && !isAnimating) {
            setIsAnimating(true);
            setDirection(-1);
            setCurrentIndex((prev) => prev - 1);
            // Reset animating state after animation completes
            setTimeout(() => setIsAnimating(false), 200);
        }
    }, [currentIndex, isAnimating]);

    // Add keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                goToNextProfile();
            } else if (e.key === "ArrowLeft") {
                goToPreviousProfile();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goToNextProfile, goToPreviousProfile]);

    return (
        <SidebarProvider>
            <AppSidebar />
            <AppInsetSidebar>
                <LeadDashboardContent currentProfile={currentProfile} direction={direction} currentIndex={currentIndex} profiles={profiles} onRefresh={onRefresh} goToPreviousProfile={goToPreviousProfile} goToNextProfile={goToNextProfile} />
            </AppInsetSidebar>
        </SidebarProvider>
    );
}

interface LeadDashboardContentProps {
    currentProfile: ProfileData;
    direction: number;
    currentIndex: number;
    profiles: ProfileData[];
    onRefresh: () => void;
    goToPreviousProfile: () => void;
    goToNextProfile: () => void;
}

interface LeadDashboardHeaderProps {
    currentIndex: number;
    profiles: ProfileData[];
    onRefresh: () => void;
    goToPreviousProfile: () => void;
    goToNextProfile: () => void;
}

function LeadDashboardContent({ currentProfile, direction, onRefresh, currentIndex, profiles, goToPreviousProfile, goToNextProfile }: LeadDashboardContentProps) {
    return (
        <>
            <LeadDashboardHeader onRefresh={onRefresh} currentIndex={currentIndex} profiles={profiles} goToPreviousProfile={goToPreviousProfile} goToNextProfile={goToNextProfile} />
            <div className="flex flex-1 flex-col p-4 pt-0">
                <AnimatePresence mode="wait" initial={false}>
                    <LeadProfileContent key={currentProfile.id} profileData={currentProfile} direction={direction} />
                </AnimatePresence>
            </div>
        </>
    );
}

function LeadDashboardHeader({ onRefresh, currentIndex, profiles, goToPreviousProfile, goToNextProfile }: LeadDashboardHeaderProps) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">Profiles</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Profile Dashboard</BreadcrumbPage>
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
                <DashboardPagination currentIndex={currentIndex} data={profiles} goToPreviousProfile={goToPreviousProfile} goToNextProfile={goToNextProfile} />
            </div>
        </header>
    );
}

interface DashboardPaginationProps<T> {
    currentIndex: number;
    data: T[];
    goToPreviousProfile: () => void;
    goToNextProfile: () => void;
}

function DashboardPagination<T>({ currentIndex, data, goToPreviousProfile, goToNextProfile }: DashboardPaginationProps<T>) {
    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={goToPreviousProfile} disabled={currentIndex === 0}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous profile</span>
            </Button>
            <span className="text-sm text-muted-foreground">
                {currentIndex + 1} of {data.length}
            </span>
            <Button
                variant="outline"
                size="icon"
                onClick={goToNextProfile}
                disabled={currentIndex === data.length - 1}
            >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next profile</span>
            </Button>
        </div>
    );
}