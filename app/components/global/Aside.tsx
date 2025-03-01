import { createContext, useContext, useState } from 'react';

const AsideContext = createContext<AsideContextValue | null>(null);

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
function Aside({ children, heading, type }: AsideProps) {
  const { type: activeType, close } = useAside();
  const expanded = type === activeType;

  return (
    <div aria-modal className={`overlay ${expanded ? 'expanded' : ''}`} role="dialog">
      <button className="close-outside" onClick={close} />
      <aside>
        <header className="flex h-[var(--header-height)] items-center justify-between rounded-b-2xl border-b border-b-gray-300 px-5 py-0">
          <h3>{heading}</h3>
          <button className="close reset" onClick={close}>
            &times;
          </button>
        </header>
        <main>{children}</main>
      </aside>
    </div>
  );
}

Aside.Provider = function AsideProvider({ children }: AsideProviderProps) {
  const [type, setType] = useState<AsideType>('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}

export { Aside, useAside };

type AsideType = 'search' | 'mobile' | 'closed';

interface AsideContextValue {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
}

interface AsideProps {
  children?: React.ReactNode;
  type: AsideType;
  heading: React.ReactNode;
}

interface AsideProviderProps {
  children: React.ReactNode;
}