import { useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface

export function useScroll<T extends HTMLElement>() {
  const scrollRef = useRef<T>(null);
  const handleScrollOnElement = (
    options: ScrollIntoViewOptions = {
      behavior: 'smooth',
      block: 'center',
    }
  ) => {
    scrollRef.current?.scrollIntoView(options);
  };
  const handleScrollToTopOfPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return { scrollRef, handleScrollOnElement, handleScrollToTopOfPage };
}

export default useScroll;
