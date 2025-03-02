import Dashboard from '~/components/Dashboard';
import { useCallback } from 'react';
import { PageWrapper } from "~/components/global";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Button, BrandButton } from '~/components/ui';
import { AlertCircle, RefreshCw } from 'lucide-react';
import type { Route } from "./+types/_index";
import type { ProfileData } from '~/lib/types';
import { useNavigate, useRevalidator, type ShouldRevalidateFunctionArgs } from 'react-router';

export interface LoaderErrorData {
    code: number;
    message: string;
    hint: string;
}

type LoaderResponse = ProfileData[] | LoaderErrorData;

// Create a simple cache mechanism
let cache = {
    data: null as LoaderResponse | null,
    timestamp: 0,
    maxAge: 1000 * 60 * 30, // 30 minutes cache lifetime

    isValid() {
        return this.data && (Date.now() - this.timestamp < this.maxAge);
    },

    set(data: LoaderResponse) {
        this.data = data;
        this.timestamp = Date.now();
    },

    invalidate() {
        this.data = null;
        this.timestamp = 0;
    }
};

export async function loader({ request }: Route.LoaderArgs) {
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
        const response = await fetch("https://eros-co.app.n8n.cloud/webhook-test/17badf3a-b82f-459c-8951-85faf4210229");
        const data: ProfileData[] = await response.json();

        if (!data || !Array.isArray(data)) {
            const noDataError = new Error("No data returned from server");
            const wrongTypeError = new Error("Data returned from server is not an array");
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
    const navigate = useNavigate();
    const revalidator = useRevalidator();

    const handleGoBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleRefresh = useCallback(() => {
        // Invalidate cache and trigger revalidation
        cache.invalidate();
        revalidator.revalidate();
    }, [revalidator]);

    if (!(data instanceof Array)) {
        const { message, code, hint } = data;

        return <PageError
            message={message}
            code={code}
            hint={hint}
            onGoBack={handleGoBack}
            onRefresh={handleRefresh}
        />;
    }


    return (
        <Dashboard profiles={data} onRefresh={handleRefresh} />
    );
}

function PageError({
    message,
    code,
    hint,
    onGoBack,
    onRefresh
}: LoaderErrorData & {
    onGoBack: () => void,
    onRefresh: () => void;
}) {
    return (
        <PageWrapper>
            <Card className="mx-auto max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                            <AlertCircle className="h-6 w-6 text-destructive" />
                        </div>
                        <CardTitle className="text-2xl">Error {code}</CardTitle>
                    </div>
                    <CardDescription className="text-base font-medium text-foreground">{message}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{hint}</p>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
                    <BrandButton variant='black' className="w-full" onClick={onRefresh}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Try Again
                    </BrandButton>
                </CardFooter>
            </Card>
        </PageWrapper>
    );
}