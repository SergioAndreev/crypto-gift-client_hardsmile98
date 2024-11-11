import { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

type LayoutProps = {
  children: ReactNode;
  bottomBar?: ReactNode;
};

function Layout({ children, bottomBar }: LayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();

  useEffect(() => {
    containerRef.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      className={`flex flex-col h-[100%] transition-height bg-white text-black dark:bg-bg-primary-dark dark:text-white`}
    >
      <div ref={containerRef} className='grow overflow-y-auto'>
        {children}
      </div>

      {bottomBar && (
        <div className='relative z-10 py-2 pb-safe-area bg-bg-tabbar-light dark:bg-bg-tabbar-dark border-t border-t-[0.5px] border-separator-light dark:border-separator-dark'>
          {bottomBar}
        </div>
      )}
    </div>
  );
}

export default Layout;
