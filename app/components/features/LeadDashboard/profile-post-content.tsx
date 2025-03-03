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

export function ProfilePostContent({ profileData }: { profileData: ProfileData; }) {
    return (
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
                            <source src={undefined} type="video/mp4" />
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
    );
}