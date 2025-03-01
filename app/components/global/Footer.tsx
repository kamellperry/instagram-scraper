import { cn } from '~/lib/utils';

export default function Footer({ className }: FooterProps) {
    return (
        <footer className={cn(className)}>
            <></>
        </footer>
    );
}

interface FooterProps {
    className?: string;
}