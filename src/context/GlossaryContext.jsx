import { createContext, useCallback, useContext, useState } from 'react';

const GlossaryContext = createContext(null);

export function GlossaryProvider({ children, onNavigateToGlossary }) {
  const [termId, setTermId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openTerm = useCallback((id) => {
    setTermId(id);
    setIsOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const navigateToGlossary = useCallback(() => {
    setIsOpen(false);
    onNavigateToGlossary?.();
  }, [onNavigateToGlossary]);

  return (
    <GlossaryContext.Provider value={{ termId, isOpen, openTerm, closeDrawer, navigateToGlossary }}>
      {children}
    </GlossaryContext.Provider>
  );
}

export function useGlossary() {
  const ctx = useContext(GlossaryContext);
  if (!ctx) throw new Error('useGlossary must be used within a GlossaryProvider');
  return ctx;
}
