
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop - A utility component that resets the window scroll position
 * whenever the route path changes.
 * 
 * This ensures that navigating to a new page (like /manifesto) always starts
 * at the top, respecting the "sovereign view" doctrine.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate scroll reset
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
