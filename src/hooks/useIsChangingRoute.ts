import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function useIsChangingRoute(target: string) {
  const [isChangingRoute, setIsChangingRoute] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Handle home page
      if (url === '/' && target === url) {
        setIsChangingRoute(true);
      } else if (url.startsWith(target)) {
        setIsChangingRoute(true);
      }
    };

    const handleRouteChangeComplete = (url: string) => {
      if (url === '/' && target === url) {
        setIsChangingRoute(false);
      } else if (url.startsWith(target)) {
        setIsChangingRoute(false);
      }
    };

    const handleRouteChangeError = () => {
      setIsChangingRoute(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router.events, target]);

  return { isChangingRoute };
}
