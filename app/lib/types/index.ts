export * from './api';
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
    ownerUsername: string;
    ownerId: number;
    displayUrl: string;
    locationId: string;
    isSponsored: boolean;
    inputUrl: string;
    type: string;
    shortCode: string;
    hashtags: string[];
    firstComment: string;
    latestComments: string[];
    dimensionsHeight: number;
    dimensionsWidth: number;
    images: string[];
    videoUrl: string;
    childPosts: string[];
    productType: string;
    videoDuration: number;
    mentions: string[];
    coauthorProducers: string[];
}