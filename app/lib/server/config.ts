import type { AppConfig } from '~/lib/types';

const name = 'Instagram Outreach';
export const DEFAULT_URL = "https://scraper.alchemylabs.design/";

const config: AppConfig = {
    name,
    url: import.meta.env.DEV ? "http://localhost:5173/" : DEFAULT_URL,
    ogImage: `${DEFAULT_URL}/og-image.png`,
    description: "Website Description Here",
    routes: [
        { title: "Home", href: "/" },
        { title: "About", href: '/about' },
        { title: "Contact", href: '/contact' },
    ],
    paths: {
        logo: 'logo.png'
    }
};

export { config }; 