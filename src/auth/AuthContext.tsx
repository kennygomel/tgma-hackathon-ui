import { AuthService, AuthUser } from '@/services/auth.service.ts';
import {
  initDataRaw as _initDataRaw, User,
  useSignal,
} from '@telegram-apps/sdk-react';
import { Icon24PersonRemove } from '@telegram-apps/telegram-ui/dist/icons/24/person_remove';
import { createContext, useContext, useEffect, useState } from "react";


const AuthCtx = createContext<{
  me: User | null;
  user: AuthUser | null;
  loading: boolean;
}>({ me: null, user: null, loading: true});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initDataRaw = useSignal(_initDataRaw);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [me, setMe] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const user = await AuthService.signIn(initDataRaw as string);
        const me = await AuthService.me();

        setUser(user ?? null);
        setMe(me ?? null);
      } finally { setLoading(false); }
    })();
  }, [initDataRaw]);

  if (!user || !me) {
    return (<div className="fixed inset-0 flex flex-col justify-center items-center gap-3">
      <Icon24PersonRemove className="text-red-500" style={{zoom: 2}} />
      <p>Ошибка авторизации</p>
    </div>);
  }

  return (
    <AuthCtx.Provider value={{ me, user, loading }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
