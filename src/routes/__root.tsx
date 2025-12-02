import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useStore } from '../app/store';
import { useEffect } from 'react';

const RootComponent = () => {
  const { language } = useStore();

  // Set document direction based on language
  useEffect(() => {
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
