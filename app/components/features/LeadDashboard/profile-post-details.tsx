import { formatNumber } from "~/lib/utils/utils";
import {
    Heart,
    MapPin,
    MessageCircle,
    Calendar,
    Clock,
    Tag,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import type { ProfileData } from "~/lib/types";

export function ProfilePostDetails({ profileData, timestamp }: { profileData: ProfileData; timestamp: string | undefined; }) {
    const formattedTime = timestamp ? formatDistanceToNow(new Date(timestamp), { addSuffix: true }) : "Unknown date";

    return (
        <>
            <UserDetailsCard profileData={profileData} timestamp={formattedTime} />
            <PostDetailsCard profileData={profileData} />
        </>
    );
}

function UserDetailsCard({ profileData, timestamp }: { profileData: ProfileData; timestamp: string; }) {
    return (

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
                        <span className="text-sm">{timestamp}</span>
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
    );
}

function PostDetailsCard({ profileData }: { profileData: ProfileData; }) {
    return (

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
    );
}