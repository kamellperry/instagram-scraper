import { useCallback } from 'react';
import { PROD_URL, DEV_URL } from '~/lib/constants/URL';
import { PageError } from '~/components/global/page-error';
import { createCache } from '~/lib/server/api';
import { useRevalidator, type ShouldRevalidateFunctionArgs } from 'react-router';
import type { Route } from "./+types/_index";
import type { ProfileData, LoaderErrorData } from '~/lib/types';
// --
import { LeadDashboard } from '~/components/features/LeadDashboard/lead-dashboard';

type LoaderResponse = ProfileData[] | LoaderErrorData;

const cache = createCache<LoaderResponse>();

export async function loader({ }: Route.LoaderArgs) {
    // Check if we have valid cached data
    if (cache.isValid()) {
        if (!cache.data) {
            throw new Error("No data returned from server cache");
        }

        console.log("Using cached data");
        return { data: cache.data };
    }

    // Otherwise fetch fresh data
    try {
        console.log("Fetching fresh data");
        const response = await fetch(DEV_URL);
        const data: ProfileData[] = await response.json();

        if (!data || !Array.isArray(data)) {
            const noDataError = new Error("No data returned from server");
            throw !data ? noDataError : data;
        }

        // Cache the response
        cache.set(data);

        return { data };
    } catch (error) {
        const isError = error instanceof Error;
        const errorMessage = isError ? error.message : "Unknown error";

        // Check if the error is a N8N error or a generic error
        if ((error as LoaderErrorData).code === 404) return { data: error as LoaderErrorData };

        const errorData: LoaderErrorData = {
            code: 500,
            message: ["Failed to fetch: ", errorMessage].join(" "),
            hint: "The server might be down or the network connection might be unstable."
        };

        return { data: errorData };
    }
}

// Revalidation logic
export function shouldRevalidate({ formAction, formMethod, defaultShouldRevalidate }: ShouldRevalidateFunctionArgs) {
    // Don't revalidate on normal navigation - use the cache
    if (!formAction && !formMethod) {
        return false;
    }

    // Only revalidate if specifically requested through a form submission
    return defaultShouldRevalidate;
}

export default function Page({ loaderData }: Route.ComponentProps) {
    const { data } = loaderData;
    const revalidator = useRevalidator();
    const isData = data instanceof Array;

    const handleRefresh = useCallback(() => {
        // Invalidate cache and trigger revalidation
        cache.invalidate();
        revalidator.revalidate();
    }, [revalidator]);

    if (!isData) {
        const { message, code, hint } = data;

        return <PageError
            message={message}
            code={code}
            hint={hint}
            onRefresh={handleRefresh}
        />;
    }

    return (
        <LeadDashboard profiles={data} onRefresh={handleRefresh} />
    );
}

