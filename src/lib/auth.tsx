import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  activateAdmin: (password: string) => boolean;
  deactivateAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const ADMIN_PASSWORD = 'amor123';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('amorfolio_admin');
    if (saved === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const activateAdmin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('amorfolio_admin', 'true');
      return true;
    }
    return false;
  };

  const deactivateAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('amorfolio_admin');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, activateAdmin, deactivateAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
