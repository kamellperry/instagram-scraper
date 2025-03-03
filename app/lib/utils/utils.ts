import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { config as _config, DEFAULT_URL } from '~/lib/server/config';
import type { AppConfig } from '~/lib/types';

/**
 * Merge class names
 * @param inputs - The class names to merge
 * @returns The merged class names
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Get the config
 * @param config - The config to get
 * @returns The config
 */
export function getConfig(config: AppConfig = _config) {
    if (config.url === DEFAULT_URL) {
        throw new Error('[ERROR]: Config production URL is not set');
    }

    return config;
}

/**
 * Get the initials of a name
 * @param name - The name to get the initials of
 * @returns The initials of the name
 */
export function getInitials(name: string) {
    return name
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase();
};