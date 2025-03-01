import { Section } from '~/components/ui';

export default function PageWrapper({ children }: { children: React.ReactNode; }) {
    return (
        <Section
            classNames={{
                section: "py-0 h-full grid place-content-center",
                div: "-mt-40",
            }}
        >
            {children}
        </Section>
    );
}