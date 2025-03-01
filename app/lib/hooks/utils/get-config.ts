import { config as _config, DEFAULT_URL } from '~/lib/utils/config';
import type { AppConfig } from '~/lib/types';

export function getConfig(config: AppConfig = _config) {
    if (config.url === DEFAULT_URL) {
        throw new Error('[ERROR]: Config production URL is not set');
    }

    return config;
} 