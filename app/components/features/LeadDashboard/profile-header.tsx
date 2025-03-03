import { Link } from "react-router";
import { getInitials } from "~/lib/utils/utils";
import { MapPin } from "lucide-react";
import { BrandButton } from "~/components/ui";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { ProfileData } from "~/lib/types";

export function ProfileHeader({ profileData }: { profileData: ProfileData; }) {
    return (
        <Card>
            <CardHeader className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-col xl:flex-row items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage
                            crossOrigin="anonymous"
                            // src={`/api?url=${encodeURIComponent(profileData.displayUrl)}`}
                            src={undefined}
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
                <div className="mt-4 flex gap-2 xl:mt-0">
                    <BrandButton variant="black" size="sm" className="rounded-md w-full" asChild>
                        <Link
                            to={`https://www.instagram.com/${profileData.ownerUsername}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Follow
                        </Link>
                    </BrandButton>
                    <BrandButton variant="blue" size="sm" className="rounded-md w-full" asChild>
                        <Link to={`https://ig.me/m/${profileData.ownerUsername}`} target="_blank" rel="noopener noreferrer">
                            Message
                        </Link>
                    </BrandButton>
                </div>
            </CardHeader>
        </Card >
    );
}