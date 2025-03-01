import { Header, Footer, Aside } from '~/components/global';

export default function PageLayout({ children }: Readonly<PageLayoutProps>) {
  return (
    <Aside.Provider>
      <Header />
      <main className="h-[calc(100dvh-var(--header-height))]">{children}</main>
      <Footer />
    </Aside.Provider>
  );
}

interface PageLayoutProps {
  children: React.ReactNode;
}
