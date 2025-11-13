import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

export function useQueryParams() {
  const [location] = useLocation();
  const [params, setParams] = useState(() => new URLSearchParams(window.location.search));

  useEffect(() => {
    const updateParams = () => {
      setParams(new URLSearchParams(window.location.search));
    };

    updateParams();

    window.addEventListener('popstate', updateParams);

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      updateParams();
    };

    window.history.replaceState = function(...args) {
      originalReplaceState.apply(window.history, args);
      updateParams();
    };

    return () => {
      window.removeEventListener('popstate', updateParams);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [location]);

  return params;
}
