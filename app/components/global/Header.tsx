import { cn } from '~/lib/utils';

export default function Header({ className }: HeaderProps) {
  return (
    <header className={cn('h-[var(--header-height)] z-40 relative', className)}>

      <nav >
        <></>
      </nav>
    </header>
  );
};

interface HeaderProps {
  className?: string;
}