import { AuthService, AuthUser } from '@/services/auth.service.ts';
import {
  initDataRaw as _initDataRaw,
  useSignal,
} from '@telegram-apps/sdk-react';
import { createContext, useContext, useEffect, useState } from "react";


const AuthCtx = createContext<{
  user: AuthUser | null;
  loading: boolean;
}>({user:null,loading:true});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initDataRaw = useSignal(_initDataRaw);

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const user = await AuthService.signIn(initDataRaw as string);

        setUser(user ?? null);
      } finally { setLoading(false); }
    })();
  }, [initDataRaw]);

  return (
    <AuthCtx.Provider value={{ user, loading }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
