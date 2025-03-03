import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";
import { motion } from "motion/react";
import { formatNumber, getInitials } from "~/lib/utils/utils";
import {
    Heart,
    MapPin,
    MessageCircle,
    Calendar,
    Clock,
    Tag,
    ExternalLink,
} from "lucide-react";
import { BrandButton } from "~/components/ui";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import type { ProfileData } from "~/lib/types";


interface ProfileContentProps {
    profileData: ProfileData;
    direction: number;
}

export function LeadProfileContent({ profileData, direction }: ProfileContentProps) {
    // Format the timestamp to a relative time (e.g., "2 days ago")
    const formattedTime = profileData.timestamp
        ? formatDistanceToNow(new Date(profileData.timestamp), { addSuffix: true })
        : "Unknown date";

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
                                // src={`/api?url=${encodeURIComponent(profileData.displayUrl)}`}
                                src={null}
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
                            <Link
                                to={`https://www.instagram.com/${profileData.ownerUsername}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
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
                                    {/* <source src={profileData.videoUrl} type="video/mp4" /> */}
                                    <source src={null} type="video/mp4" />
                                </video>
                            )}
                            {profileData.images && profileData.images.length > 0 && (
                                <img src={"/svgs/placeholder.svg"} alt="Post image" className="object-cover" />
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