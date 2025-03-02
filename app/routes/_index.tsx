import Dashboard from '~/components/Dashboard';
import { PageWrapper } from "~/components/global";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Button } from '~/components/ui';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import type { Route } from "./+types/_index";
import type { ProfileData } from '~/lib/types';

export interface LoaderErrorData {
    code: number;
    message: string;
    hint: string;
}

type LoaderResponse = ProfileData[] | LoaderErrorData;

export async function loader({ }: Route.LoaderArgs) {
    const response = await fetch("https://eros-co.app.n8n.cloud/webhook-test/17badf3a-b82f-459c-8951-85faf4210229");
    const data: LoaderResponse = await response.json();

    return { data };
}

export default function Page({ loaderData }: Route.ComponentProps) {
    const { data } = loaderData;

    console.log(data);

    if (!(data instanceof Array)) {
        const { message, code, hint } = data;

        return <PageError message={message} code={code} hint={hint} />;
    }


    return (
        <Dashboard profileData={data[0]} />
    );
}

function PageError({ message, code, hint }: LoaderErrorData) {
    return (
        <PageWrapper>
            <div className="flex min-h-[70vh] items-center justify-center p-4">
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
                        <Button variant="outline" className="w-full sm:w-auto">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>
                        <Button className="w-full sm:w-auto">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </PageWrapper>
    );
}