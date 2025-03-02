export type { AppConfig } from './AppConfig';

export interface ProfileData {
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
    locationId: string;
    ownerUsername: string;
    ownerId: number;
    isSponsored: boolean;
    displayUrl: string;
}