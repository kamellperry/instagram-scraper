import { useMemo } from 'react';
import { getConfig } from '~/lib/hooks/utils/get-config';

export function useConfig() {
    // Using useMemo to avoid unnecessary recalculations
    const config = useMemo(() => getConfig(), []);
    return config;
}
