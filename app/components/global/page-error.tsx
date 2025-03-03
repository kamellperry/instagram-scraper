import { PageWrapper } from "~/components/global";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, BrandButton } from '~/components/ui';
import { AlertCircle, RefreshCw } from 'lucide-react';
import type { LoaderErrorData } from '~/lib/types';

interface PageErrorProps extends LoaderErrorData {
    onRefresh: () => void;
}

export function PageError(props: PageErrorProps) {

    return (
        <PageWrapper>
            <PageErrorCard {...props} />
        </PageWrapper>
    );
}

function PageErrorCard({ message, code, hint, onRefresh }: PageErrorProps) {
    return (
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
    );
}