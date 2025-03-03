import { AnimatePresence, motion } from "motion/react";
import { LeadDashboardHeader } from "./lead-dashboard-header";
import { ProfileHeader } from "./profile-header";
import { ProfilePostContent } from "./profile-post-content";
import { ProfilePostDetails } from "./profile-post-details";
import type { ProfileData } from "~/lib/types";

interface LeadDashboardContentProps {
    currentProfile: ProfileData;
    direction: number;
    currentIndex: number;
    profiles: ProfileData[];
    onRefresh: () => void;
    onPrevious: () => void;
    onNext: () => void;
}

/** @todo: remove this function once we have proper asset fetching */
export function getAssetURL(url: string, options: { testing: boolean; }) {
    if (options.testing) {
        return undefined;
    }

    return `/api?url=${encodeURIComponent(url)}`;
}

export function LeadDashboardContent({
    currentProfile,
    direction,
    onRefresh,
    currentIndex,
    profiles,
    onPrevious,
    onNext
}: LeadDashboardContentProps) {
    return (
        <>
            <LeadDashboardHeader
                onRefresh={onRefresh}
                currentIndex={currentIndex}
                profiles={profiles}
                onPrevious={onPrevious}
                onNext={onNext}
            />
            <div className="flex flex-1 flex-col p-4">
                <AnimatePresence mode="wait" initial={false}>
                    <PageTransition
                        key={currentProfile.id}
                        direction={direction}
                        className="grid gap-6 w-full md:grid-cols-2"

                    >
                        <div>
                            <ProfilePostContent profileData={currentProfile} />
                        </div>
                        <div className="flex flex-col gap-6">
                            <ProfilePostDetails
                                profileData={currentProfile}
                                timestamp={currentProfile.timestamp || undefined}
                            />
                        </div>
                    </PageTransition>
                </AnimatePresence>
            </div>
        </>
    );
}

interface PageTransitionProps {
    children: React.ReactNode;
    direction: number;
    className?: string;
}

function PageTransition({ children, direction, className }: PageTransitionProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: direction >= 0 ? -100 : 100,
                scale: 1,
            }}
            animate={{
                opacity: 1,
                x: 0,
                scale: 1,
            }}
            exit={{
                opacity: 0,
                x: direction >= 0 ? 100 : -100,
                scale: 0.98,
            }}
            transition={{
                duration: 0.2,
                ease: "easeInOut",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}