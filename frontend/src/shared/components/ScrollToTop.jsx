import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force immediate scroll to top on every route change
    window.scrollTo(0, 0);
    
    // Also handle possible internal scrollable elements in layouts
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.scrollTo(0, 0);
    }
    
    // Handle the document body for good measure
    document.body.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
