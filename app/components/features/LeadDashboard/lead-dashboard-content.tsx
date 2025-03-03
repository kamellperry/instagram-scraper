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
            <div className="flex flex-1 flex-col p-4 pt-0">
                <AnimatePresence mode="wait" initial={false}>
                    <PageTransition
                        key={currentProfile.id}
                        direction={direction}
                    >
                        <ProfileHeader profileData={currentProfile} />
                        <div className="grid gap-6 md:grid-cols-3">
                            <ProfilePostContent profileData={currentProfile} />

                            <div className="grid gap-6">
                                <ProfilePostDetails
                                    profileData={currentProfile}
                                    timestamp={currentProfile.timestamp || undefined}
                                />
                            </div>
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
    key: React.Key;
}

function PageTransition({ children, direction, key }: PageTransitionProps) {
    return (
        <motion.div
            key={key}
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
            className="grid gap-6 w-full"
        >
            {children}
        </motion.div>
    );
}