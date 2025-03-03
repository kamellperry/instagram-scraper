import { Link } from "react-router";
import { formatNumber } from "~/lib/utils/utils";
import {
    Heart,
    MessageCircle,
    ExternalLink,
} from "lucide-react";
import { BrandButton } from "~/components/ui";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import type { ProfileData } from "~/lib/types";
import { ProfileHeader } from "./profile-header";
/** @todo: remove this function once we have proper asset fetching */
import { getAssetURL } from "./lead-dashboard-content";

export function ProfilePostContent({ profileData }: { profileData: ProfileData; }) {
    return (
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Post Content</CardTitle>
                <CardDescription>Post ID: {profileData.id}</CardDescription>
                <ProfileHeader profileData={profileData} />
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="relative aspect-square overflow-hidden rounded-md sm:aspect-video">
                    {profileData.videoUrl && (
                        <video muted controls className="object-contain w-full h-full">
                            <source src={getAssetURL(profileData.videoUrl, { testing: true })} type="video/mp4" />
                        </video>
                    )}
                    {profileData.images && profileData.images.length > 0 && (
                        <img src={"/svgs/placeholder.svg"} alt="Post image" className="object-cover" />
                    )}
                </div>
                <div className="space-y-5">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Caption</h3>
                        <BrandButton variant="blue" size="sm" asChild>
                            <Link to={profileData.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Original
                            </Link>
                        </BrandButton>
                    </div>
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
        </Card>
    );
}