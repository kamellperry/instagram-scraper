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
} from "lucide-react";
import { Button } from "~/components/ui/button";
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

interface ProfileData {
    id: string;
    row_number: number;
    ownerFullName: string;
    locationName: string;
    postType: string;
    caption: string;
    url: string;
    commentsCount: number;
    likesCount: number;
    timestamp: string;
    ownerUsername: string;
    ownerId: number;
    displayUrl: string;
}

// Sample data array for demonstration
const sampleProfilesData: ProfileData[] = [
    {
        id: "2934856123478",
        row_number: 1,
        ownerFullName: "Sarah Johnson",
        locationName: "San Francisco, California",
        postType: "Image",
        caption: "Enjoying a beautiful day at Golden Gate Park! #weekend #sanfrancisco",
        url: "https://instagram.com/p/abc123",
        commentsCount: 42,
        likesCount: 1287,
        timestamp: "2023-09-15T14:23:45Z",
        ownerUsername: "sarahjohnson",
        ownerId: 8675309,
        displayUrl: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "2934856123479",
        row_number: 2,
        ownerFullName: "Mike Smith",
        locationName: "New York City",
        postType: "Image",
        caption: "City lights and late nights! 🌃 #nyc #nightlife",
        url: "https://instagram.com/p/def456",
        commentsCount: 89,
        likesCount: 2431,
        timestamp: "2023-09-16T02:15:00Z",
        ownerUsername: "mikesmith",
        ownerId: 8675310,
        displayUrl: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "2934856123480",
        row_number: 3,
        ownerFullName: "Emma Davis",
        locationName: "London, UK",
        postType: "Image",
        caption: "Afternoon tea at its finest ☕️ #london #teatime",
        url: "https://instagram.com/p/ghi789",
        commentsCount: 56,
        likesCount: 1892,
        timestamp: "2023-09-16T15:45:00Z",
        ownerUsername: "emmadavis",
        ownerId: 8675311,
        displayUrl: "/placeholder.svg?height=600&width=600",
    },
];

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
            .split(" ")
            .map((part) => part.charAt(0))
            .join("")
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
                                src={profileData.displayUrl}
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
                        <Button size="sm">Follow</Button>
                        <Button size="sm" variant="outline">
                            Message
                        </Button>
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
                            <img
                                src={"/svgs/placeholder.svg"}
                                alt="Post image"
                                className="object-cover"
                            />
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
                        <Button variant="ghost" size="sm" asChild>
                            <Link to={profileData.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Original
                            </Link>
                        </Button>
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

export default function ProfileDashboard({ profiles = sampleProfilesData }: { profiles?: ProfileData[]; }) {
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
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                        <div className="flex flex-1 items-center justify-between">
                            <h1 className="text-lg font-semibold">Profile Dashboard</h1>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={goToPreviousProfile}
                                    disabled={currentIndex === 0}
                                    className="h-8 w-8 cursor-pointer"
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
                                    className="h-8 w-8 cursor-pointer"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                    <span className="sr-only">Next profile</span>
                                </Button>
                            </div>
                        </div>
                        <SidebarTrigger className="hidden md:flex" />
                    </header>

                    {isMobileMenuOpen && (
                        <div className="fixed inset-0 z-50 bg-background md:hidden">
                            <div className="flex h-14 items-center border-b px-4">
                                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Close menu</span>
                                </Button>
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