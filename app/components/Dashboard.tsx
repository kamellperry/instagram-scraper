import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "motion/react";
import {
    BarChart3,
    Heart,
    Home,
    FlaskConical,
    MapPin,
    MessageCircle,
    Settings,
    User,
    Users,
    Calendar,
    Clock,
    Tag,
    ExternalLink,
    Menu,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
} from "lucide-react";
import { BrandButton, Button } from "~/components/ui";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "~/components/ui/sidebar";
import type { ProfileData } from '~/lib/types';

interface ProfileContentProps {
    profileData: ProfileData;
    direction: number;
}

const ProfileContent = ({ profileData, direction }: ProfileContentProps) => {
    // Format the timestamp to a relative time (e.g., "2 days ago")
    const formattedTime = profileData.timestamp
        ? formatDistanceToNow(new Date(profileData.timestamp), { addSuffix: true })
        : "Unknown date";

    // Format large numbers with commas
    const formatNumber = (num: number) => {
        return num.toLocaleString();
    };

    // Get initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((part) => part.charAt(0))
            .splice(0, 2)
            .join('')
            .toUpperCase();
    };

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
            className="grid gap-6 w-full"
        >
            {/* Profile Header */}
            <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage
                                crossOrigin="anonymous"
                                src={`/proxy-image?url=${encodeURIComponent(profileData.displayUrl)}`}
                                alt={profileData.ownerFullName}
                            />
                            <AvatarFallback className="text-lg">{getInitials(profileData.ownerFullName)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-xl">{profileData.ownerFullName}</CardTitle>
                            <CardDescription className="text-base">@{profileData.ownerUsername}</CardDescription>
                            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{profileData.locationName || "No location available"}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 sm:mt-0">
                        <BrandButton variant="black" size="sm" className="rounded-md">
                            <Link to={`https://www.instagram.com/${profileData.ownerUsername}`} target="_blank" rel="noopener noreferrer">
                                Follow
                            </Link>
                        </BrandButton>
                        <BrandButton variant="blue" size="sm" className="rounded-md" asChild>
                            <Link to={`https://ig.me/m/${profileData.ownerUsername}`} target="_blank" rel="noopener noreferrer">
                                Message
                            </Link>
                        </BrandButton>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Post Content */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Post Content</CardTitle>
                        <CardDescription>Post ID: {profileData.id}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="relative aspect-square overflow-hidden rounded-md sm:aspect-video">
                            {profileData.videoUrl && (
                                <video muted controls className="object-contain w-full h-full">
                                    <source src={profileData.videoUrl} type="video/mp4" />
                                </video>
                            )}
                            {profileData.images && profileData.images.length > 0 && (
                                <img
                                    src={"/svgs/placeholder.svg"}
                                    alt="Post image"
                                    className="object-cover"
                                />
                            )}
                        </div>
                        <div>
                            <h3 className="mb-2 font-semibold">Caption</h3>
                            <p className="text-sm text-muted-foreground">{profileData.caption}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {profileData.caption
                                .split(" ")
                                .filter((word) => word.startsWith("#"))
                                .map((hashtag, index) => (
                                    <Badge key={index} variant="secondary">
                                        {hashtag}
                                    </Badge>
                                ))}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                        <BrandButton variant="blue" size="sm" asChild>
                            <Link to={profileData.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Original
                            </Link>
                        </BrandButton>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4 text-rose-500" />
                                <span className="text-sm font-medium">{formatNumber(profileData.likesCount)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4 text-blue-500" />
                                <span className="text-sm font-medium">{formatNumber(profileData.commentsCount)}</span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>

                {/* Post Details */}
                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-4">
                                    <Heart className="mb-2 h-5 w-5 text-rose-500" />
                                    <span className="text-xl font-bold">{formatNumber(profileData.likesCount)}</span>
                                    <span className="text-xs text-muted-foreground">Likes</span>
                                </div>
                                <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-4">
                                    <MessageCircle className="mb-2 h-5 w-5 text-blue-500" />
                                    <span className="text-xl font-bold">{formatNumber(profileData.commentsCount)}</span>
                                    <span className="text-xs text-muted-foreground">Comments</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">Posted</span>
                                    </div>
                                    <span className="text-sm">{formattedTime}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">Time</span>
                                    </div>
                                    <span className="text-sm">{new Date(profileData.timestamp).toLocaleTimeString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">Location</span>
                                    </div>
                                    <span className="text-sm">{profileData.locationName}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Tag className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">Type</span>
                                    </div>
                                    <Badge variant="outline">{profileData.postType}</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>User Info</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Username</span>
                                    <span className="text-sm font-medium">@{profileData.ownerUsername}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Full Name</span>
                                    <span className="text-sm font-medium">{profileData.ownerFullName}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">User ID</span>
                                    <span className="text-sm font-mono">{profileData.ownerId}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
};

interface DashboardProps {
    profiles: ProfileData[];
    onRefresh?: () => void;
}

export default function Dashboard({ profiles, onRefresh }: DashboardProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part.charAt(0))
            .join("")
            .toUpperCase();
    };

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
    }, [currentIndex, isAnimating, goToNextProfile, goToPreviousProfile]);

    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-muted/40">
                <Sidebar className="hidden md:flex">
                    <SidebarHeader className="flex h-14 items-center border-b px-4 flex-row justify-center">
                        <Link to="#" className="flex items-center gap-2 font-semibold">
                            <FlaskConical className="h-6 w-6" />
                            <span>Leads Dashboard</span>
                        </Link>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive>
                                    <Link to="#">
                                        <Home className="h-4 w-4" />
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="#">
                                        <User className="h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="#">
                                        <Users className="h-4 w-4" />
                                        <span>Followers</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="#">
                                        <BarChart3 className="h-4 w-4" />
                                        <span>Analytics</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="#">
                                        <Settings className="h-4 w-4" />
                                        <span>Settings</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter className="border-t p-4">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage
                                    src={"/images/logo.png"}
                                    alt={"Alchemy"}
                                />
                                <AvatarFallback>{getInitials("Alchemy")}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-0.5">
                                <p className="text-sm font-medium">Alchemy</p>
                                <p className="text-xs text-muted-foreground">@alchemylabs</p>
                            </div>
                        </div>
                    </SidebarFooter>
                </Sidebar>

                <div className="flex flex-1 flex-col">
                    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
                        <BrandButton
                            variant="white"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </BrandButton>
                        <div className="flex flex-1 items-center justify-between">
                            <h1 className="text-lg font-semibold">Profile Dashboard</h1>
                            <div className="flex items-center gap-10">
                                {onRefresh && (
                                    <BrandButton onClick={onRefresh} variant="black" size="sm">
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Refresh Data
                                    </BrandButton>
                                )}
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={goToPreviousProfile}
                                        disabled={currentIndex === 0}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        <span className="sr-only">Previous profile</span>
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        {currentIndex + 1} of {profiles.length}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={goToNextProfile}
                                        disabled={currentIndex === profiles.length - 1}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                        <span className="sr-only">Next profile</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <SidebarTrigger className="hidden md:flex" />
                    </header>

                    {isMobileMenuOpen && (
                        <div className="fixed inset-0 z-50 bg-background md:hidden">
                            <div className="flex h-14 items-center border-b px-4">
                                <BrandButton variant="white" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Close menu</span>
                                </BrandButton>
                                <div className="ml-4">
                                    <h2 className="text-lg font-semibold">Menu</h2>
                                </div>
                            </div>
                            <nav className="grid gap-2 p-4">
                                <Link
                                    to="#"
                                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Home className="h-4 w-4" />
                                    <span>Dashboard</span>
                                </Link>
                                <Link
                                    to="#"
                                    className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <User className="h-4 w-4" />
                                    <span>Profile</span>
                                </Link>
                                <Link
                                    to="#"
                                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Users className="h-4 w-4" />
                                    <span>Followers</span>
                                </Link>
                                <Link
                                    to="#"
                                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <BarChart3 className="h-4 w-4" />
                                    <span>Analytics</span>
                                </Link>
                                <Link
                                    to="#"
                                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Settings className="h-4 w-4" />
                                    <span>Settings</span>
                                </Link>
                            </nav>
                        </div>
                    )}

                    <main className="flex-1 overflow-auto p-4 sm:p-6">
                        <AnimatePresence mode="wait" initial={false}>
                            <ProfileContent key={currentProfile.id} profileData={currentProfile} direction={direction} />
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}