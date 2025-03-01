type ConfigURL = `https://${string}.${DomainSuffix}/` | `http://localhost:${string}`;
type ConfigOGImageURL = `https://${string}`;
type DomainSuffix = 'com' | 'org' | 'net' | 'dev' | 'app' | 'io' | 'ai' | 'co' | 'design';

export interface AppConfig {
    name: string;
    url: ConfigURL,
    ogImage: ConfigOGImageURL,
    description: string;
    routes: Route[];
    paths: Paths;
}

export interface Route {
    title: string;
    href: `/${string}`;
}

interface Paths {
    logo: string;
}