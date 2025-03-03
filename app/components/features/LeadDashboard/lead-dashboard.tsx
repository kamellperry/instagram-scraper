import { useState, useEffect, useCallback } from "react";
import { AppSidebar } from "../Sidebar/app-sidebar";
import { AppInsetSidebar } from "../Sidebar/app-inset-sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";
import { LeadDashboardContent } from "./lead-dashboard-content";
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

    const goToNext = useCallback(() => {
        if (currentIndex < profiles.length - 1 && !isAnimating) {
            setIsAnimating(true);
            setDirection(1);
            setCurrentIndex((prev) => prev + 1);
            setTimeout(() => setIsAnimating(false), 200);
        }
    }, [currentIndex, profiles.length, isAnimating]);

    const goToPrevious = useCallback(() => {
        if (currentIndex > 0 && !isAnimating) {
            setIsAnimating(true);
            setDirection(-1);
            setCurrentIndex((prev) => prev - 1);
            setTimeout(() => setIsAnimating(false), 200);
        }
    }, [currentIndex, isAnimating]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                goToNext();
            } else if (e.key === "ArrowLeft") {
                goToPrevious();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goToNext, goToPrevious]);

    return (
        <SidebarProvider>
            <AppSidebar />
            <AppInsetSidebar>
                <LeadDashboardContent
                    currentProfile={currentProfile}
                    direction={direction}
                    currentIndex={currentIndex}
                    profiles={profiles}
                    onRefresh={onRefresh}
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                />
            </AppInsetSidebar>
        </SidebarProvider>
    );
}